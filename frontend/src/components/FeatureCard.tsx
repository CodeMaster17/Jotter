import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    const IconComponent = Icon;

    return (
        <div className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-background to-background/80 p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}