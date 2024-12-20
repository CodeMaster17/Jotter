import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AuthFormProps {
    type: 'login' | 'signup';
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    className?: string;
}

export function AuthForm({ type, className, onSubmit, ...props }: AuthFormProps) {
    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                            required
                        />
                    </div>
                    <Button className="w-full" type="submit">
                        {type === 'login' ? 'Sign In' : 'Create Account'}
                    </Button>
                </div>
            </form>
        </div>
    );
}