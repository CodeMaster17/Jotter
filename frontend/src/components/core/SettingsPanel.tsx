import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { storage } from '@/lib/storage';

interface ProfileData {
    linkedin: string;
    github: string;
    portfolio: string;
    resume: string;
}

interface Answer {
    question: string;
    answer: string;
}

export function SettingsPanel() {
    const [profileData, setProfileData] = useState<ProfileData>({
        linkedin: '',
        github: '',
        portfolio: '',
        resume: ''
    });
    const [answers, setAnswers] = useState<Answer[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            const [profileResult, answersResult] = await Promise.all([
                storage.get('profileData'),
                storage.get('answers')
            ]);

            if (profileResult) {
                setProfileData(profileResult);
            }
            if (answersResult) {
                setAnswers(answersResult);
            }
        };
        loadData();
    }, []);

    const handleProfileSave = async () => {
        await storage.set('profileData', profileData);
        toast({
            title: "Success",
            description: "Profile links have been saved",
            duration: 2000,
        });
    };

    const handleAnswerChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = { ...newAnswers[index], [field]: value };
        setAnswers(newAnswers);
    };

    const addNewAnswer = () => {
        setAnswers([...answers, { question: '', answer: '' }]);
    };

    const removeAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const saveAnswers = async () => {
        await storage.set('answers', answers);
        toast({
            title: "Success",
            description: "Answers have been saved",
            duration: 2000,
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                            id="linkedin"
                            value={profileData.linkedin}
                            onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub URL</Label>
                        <Input
                            id="github"
                            value={profileData.github}
                            onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input
                            id="portfolio"
                            value={profileData.portfolio}
                            onChange={(e) => setProfileData({ ...profileData, portfolio: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="resume">Resume URL</Label>
                        <Input
                            id="resume"
                            value={profileData.resume}
                            onChange={(e) => setProfileData({ ...profileData, resume: e.target.value })}
                        />
                    </div>
                    <Button onClick={handleProfileSave} className="w-full">Save Profile Links</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Common Answers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {answers.map((answer, index) => (
                        <div key={index} className="space-y-2 pb-4 border-b">
                            <div className="flex justify-between items-center">
                                <Label>Question {index + 1}</Label>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeAnswer(index)}
                                >
                                    Remove
                                </Button>
                            </div>
                            <Input
                                value={answer.question}
                                onChange={(e) => handleAnswerChange(index, 'question', e.target.value)}
                                placeholder="Enter question"
                            />
                            <Textarea
                                value={answer.answer}
                                onChange={(e) => handleAnswerChange(index, 'answer', e.target.value)}
                                placeholder="Enter answer"
                            />
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <Button onClick={addNewAnswer} variant="outline" className="w-full">
                            Add New Answer
                        </Button>
                        <Button onClick={saveAnswers} className="w-full">
                            Save All Answers
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}