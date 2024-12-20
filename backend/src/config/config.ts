import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // Frontend
    FRONTEND_URL: process.env.FRONTEND_URL,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,

    // Access Token
    ACCESS_TOKEN: {
        SECRET: process.env.ACCESS_TOKEN_SECRET,
        EXPIRY: 3600
    },

    // Refresh Token
    REFRESH_TOKEN: {
        SECRET: process.env.REFRESH_TOKEN_SECRET,
        EXPIRY: 3600 * 24 * 365
    },

    // Google OAuth
    GENERATED_APP_PASSWORD: process.env.GENERATED_APP_PASSWORD,
    MY_GMAIL: process.env.MY_GMAIL
}

