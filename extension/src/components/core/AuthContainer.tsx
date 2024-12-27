import { LoginForm } from "./LoginPage";


interface AuthContainerProps {
    onLogin: (token: string) => void;
}

export function AuthContainer({ onLogin }: AuthContainerProps) {
    return (
        <div className="max-w-sm mx-auto mt-8">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
            <LoginForm onSuccess={onLogin} />
        </div>
    );
}