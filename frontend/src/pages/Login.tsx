import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { MousePointerClick } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(6).max(50)
});
export function LoginPage() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const { toast } = useToast();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        if (!email || !password) {
            toast({
                title: 'Error',
                description: 'Please fill in all fields',
            });
        }

        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                toast({
                    title: 'Login Successful',
                    description: 'Redirecting to home page',
                });
                window.localStorage.setItem('token', jwtToken);
                window.localStorage.setItem('loggedInUser', name);
                window.location.href = '/dashboard/home';
            } else if (error) {
                const details = error?.details[0].message;
                toast({
                    title: 'Error',
                    description: details,
                });
            } else if (!success) {
                toast({
                    title: 'Error',
                    description: message,
                });
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background flex items-center justify-center">
            <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 blur-3xl -z-10" />
                <div className="relative bg-white px-8 py-12 rounded-lg shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <MousePointerClick className="h-12 w-12 text-primary mb-4" />
                        <h1 className="text-2xl font-bold">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to your TwoClicks account
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="*********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Login</Button>
                        </form>
                    </Form>
                    <p className="text-sm text-center mt-6 text-muted-foreground">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}