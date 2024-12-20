import { Button } from '@/components/ui/button';
import { MousePointerClick } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
                <MousePointerClick className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">TwoClicks</span>
            </div>
            <div className="space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
                <Button size="lg">Get Started</Button>
            </div>
        </nav>
    );
}