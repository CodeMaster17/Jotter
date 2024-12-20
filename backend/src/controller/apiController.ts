import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { NextFunction, Request, Response } from 'express'
import responseMessage from '../constant/responseMessage'
import { EUserRole } from '../constant/userConstant'
import databaseService from '../service/databaseService'
import { validateJoiSchema, ValidateLoginBody, ValidateRegisterBody } from '../service/validationService'
import { ILoginUserRequestBody, IRegisterUserRequestBody, IUser } from '../types/userTypes'
import httpError from '../util/httpError'
import httpResponse from '../util/httpResponse'
import quicker from '../util/quicker'

dayjs.extend(utc)

interface IRegisterRequest extends Request {
    body: IRegisterUserRequestBody
}

interface ILoginRequest extends Request {
    body: ILoginUserRequestBody
}

export default {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as IRegisterRequest

            // Body Validation
            const { error, value } = validateJoiSchema<IRegisterUserRequestBody>(ValidateRegisterBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { name, emailAddress, password, phoneNumber, consent } = value

            // Parse phone number
            const { countryCode, isoCode, internationalNumber } = quicker.parsePhoneNumber(`+` + phoneNumber)
            if (!countryCode || !isoCode || !internationalNumber) {
                return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
            }

            // Timezone validation
            const timezone = quicker.countryTimezone(isoCode)
            if (!timezone || timezone.length === 0) {
                return httpError(next, new Error(responseMessage.INVALID_PHONE_NUMBER), req, 422)
            }

            // Check if user exists
            const user = await databaseService.findUserByEmailAddress(emailAddress)
            if (user) {
                return httpError(next, new Error(responseMessage.ALREADY_EXIST('user', emailAddress)), req, 403)
            }

            // Encrypt password
            const encryptedPassword = await quicker.hashPassword(password)

            // Prepare user object
            const payload: IUser = {
                name,
                emailAddress,
                phoneNumber: {
                    countryCode,
                    isoCode,
                    internationalNumber
                },
                accountConfirmation: {
                    status: false,
                    token: quicker.generateRandomId(),
                    code: quicker.generateOtp(6),
                    timestamp: null
                },
                passwordReset: {
                    token: null,
                    expiry: null,
                    lastResetAt: null
                },
                lastLoginAt: null,
                role: EUserRole.USER,
                timezone: timezone[0].name,
                password: encryptedPassword,
                consent
            }

            // Register user
            const newUser = await databaseService.registerUser(payload)

            // Send response
            httpResponse(req, res, 201, responseMessage.SUCCESS, { _id: newUser._id })
        } catch (err) {
            httpError(next, err, req, 500)
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req as ILoginRequest

            // Validate and parse body
            const { error, value } = validateJoiSchema<ILoginUserRequestBody>(ValidateLoginBody, body)
            if (error) {
                return httpError(next, error, req, 422)
            }

            const { emailAddress, password } = value

            // Find user
            const user = await databaseService.findUserByEmailAddress(emailAddress, `+password`)
            if (!user) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('user')), req, 404)
            }

            // Validate password
            const isValidPassword = await quicker.comparePassword(password, user.password)
            if (!isValidPassword) {
                return httpError(next, new Error(responseMessage.INVALID_EMAIL_OR_PASSWORD), req, 400)
            }

            // Update last login timestamp
            user.lastLoginAt = dayjs().utc().toDate()
            await user.save()

            // Send response
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (err) {
            httpError(next, err, req, 500)
        }
    }
}

