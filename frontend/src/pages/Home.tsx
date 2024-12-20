import { FeatureCard } from "@/components/FeatureCard"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Sparkles } from 'lucide-react';
const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-background w-full border-2">
            <div className="container min-w-full mx-auto px-4">
                <Navbar />

                {/* Hero Section */}
                <div className="py-24 text-center">
                    <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Simplify Your Workflow in
                        <br />
                        Just Two Clicks
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Experience the power of efficiency with TwoClicks. Transform complex tasks into simple,
                        two-click solutions that save you time and boost productivity.
                    </p>
                    <div className="flex justify-center gap-4 mb-16">
                        <Button size="lg">Try Now</Button>
                        <Button size="lg" variant="outline">Learn More</Button>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 blur-3xl -z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                            alt="Modern dashboard interface"
                            className="rounded-xl shadow-2xl mx-auto"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-24" id="features">
                    <h2 className="text-3xl font-bold text-center mb-16">
                        Why Choose TwoClicks?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Zap}
                            title="Lightning Fast"
                            description="Complete tasks in record time with our optimized workflow system"
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Secure & Reliable"
                            description="Your data is protected with enterprise-grade security measures"
                        />
                        <FeatureCard
                            icon={Sparkles}
                            title="Smart Automation"
                            description="Intelligent automation that learns and adapts to your needs"
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t py-12 text-center text-muted-foreground">
                    © 2024 TwoClicks. All rights reserved.
                </footer>
            </div>
        </div>
    )
}

export default Home