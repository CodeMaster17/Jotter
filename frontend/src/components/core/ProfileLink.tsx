import { useState, useEffect } from 'react';
import { Copy, Github, Linkedin, Globe, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { storage } from '@/lib/storage';

interface ProfileData {
    linkedin: string;
    github: string;
    portfolio: string;
    resume: string;
}

export function ProfileLinks() {
    const [profileData, setProfileData] = useState<ProfileData>({
        linkedin: '',
        github: '',
        portfolio: '',
        resume: ''
    });
    const { toast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            const data = await storage.get('profileData');
            if (data) {
                setProfileData(data);
            }
        };
        loadData();
    }, []);

    const copyToClipboard = async (text: string, label: string) => {
        await navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: `${label} link has been copied to clipboard`,
            duration: 2000,
        });
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Linkedin className="h-5 w-5 text-[#0077B5]" />
                                <span className="font-medium">LinkedIn</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(profileData.linkedin, 'LinkedIn')}
                                disabled={!profileData.linkedin}
                            >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Github className="h-5 w-5" />
                                <span className="font-medium">GitHub</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(profileData.github, 'GitHub')}
                                disabled={!profileData.github}
                            >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-500" />
                                <span className="font-medium">Portfolio</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(profileData.portfolio, 'Portfolio')}
                                disabled={!profileData.portfolio}
                            >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-green-500" />
                                <span className="font-medium">Resume</span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(profileData.resume, 'Resume')}
                                disabled={!profileData.resume}
                            >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}