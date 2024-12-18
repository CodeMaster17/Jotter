import { CommonQuestions } from '@/components/core/CommonQuestions';
import { ProfileLinks } from '@/components/core/ProfileLink';
import { SettingsPanel } from '@/components/core/SettingsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';
const Extension = () => {
    const [activeTab, setActiveTab] = useState('links');
    // const { toast } = useToast();
    return (
        <div className="w-[400px] min-h-[500px] p-4 bg-background text-foreground">
            <header className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold">Job Application Helper</h1>
                </div>
            </header>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="links">Links</TabsTrigger>
                    <TabsTrigger value="answers">Answers</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="links">
                    <ProfileLinks />
                </TabsContent>

                <TabsContent value="answers">
                    <CommonQuestions />
                </TabsContent>

                <TabsContent value="settings">
                    <SettingsPanel />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Extension