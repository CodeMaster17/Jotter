import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { storage } from '@/lib/storage';

interface Answer {
    question: string;
    answer: string;
}

export function CommonQuestions() {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            const data = await storage.get('answers');
            if (data) {
                setAnswers(data);
            }
        };
        loadData();
    }, []);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Answer has been copied to clipboard",
            duration: 2000,
        });
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Common Interview Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {answers.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="relative">
                                        <p className="text-sm text-muted-foreground mb-2">{item.answer}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="absolute top-0 right-0"
                                            onClick={() => copyToClipboard(item.answer)}
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}