import { Briefcase } from 'lucide-react';
import { useState } from 'react';
import Tabs from '../components/core/Tabs';
const Extension = () => {
    const [activeTab, setActiveTab] = useState('links');
    // const { toast } = useToast();
    return (
        <div className="w-[300px] min-h-[400px] p-4 bg-white text-foreground">
            <header className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold">Job Application Helper</h1>
                </div>
            </header>
            <Tabs />
        </div>
    )
}

export default Extension