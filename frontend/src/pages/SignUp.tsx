import React from 'react';
import { MousePointerClick } from 'lucide-react';
import { AuthForm } from '@/components/AuthForm';


export function SignupPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle signup logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex items-center justify-center">
            <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 blur-3xl -z-10" />
                <div className="relative bg-white px-8 py-12 rounded-lg shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <MousePointerClick className="h-12 w-12 text-primary mb-4" />
                        <h1 className="text-2xl font-bold">Create an account</h1>
                        <p className="text-sm text-muted-foreground">
                            Get started with TwoClicks
                        </p>
                    </div>
                    {/* <AuthForm type="signup" onSubmit={handleSubmit} /> */}
                    
                    <p className="text-sm text-center mt-6 text-muted-foreground">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}