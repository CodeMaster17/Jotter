
import { Copy, FileText, Github, LinkIcon, LinkedinIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { storage } from '../../lib/storage';
import { LOCAL_STORAGE_PROFESSIONAL_LINKS } from '../../constants';
const getLinkIcon = (type) => {
    switch (type.toLowerCase()) {
        case 'github':
            return <Github className="w-5 h-5" />;
        case 'linkedin':
            return <LinkedinIcon className="w-5 h-5" />;
        case 'resume':
            return <FileText className="w-5 h-5" />;
        default:
            return <LinkIcon className="w-5 h-5" />;
    }
};
export function ProfileLinks() {
    const [links, setLinks] = useState([]);
    // const { toast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            const data = await storage.get(LOCAL_STORAGE_PROFESSIONAL_LINKS);
            console.log(data);
            if (data) {
                setLinks(JSON.parse(data));
            }
        };
        loadData();
    }, []);

    const copyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text);
        // toast({
        //     title: 'Copied!',
        //     description: `${label} link has been copied to clipboard`,
        //     duration: 2000,
        // });
    };

    return (
        <div className="space-y-4">
            <div className='w-full'>
                <div className="p-4 space-y-4">
                    <div className="grid gap-4">
                        hello
                        {links.map((link) => (
                            <div key={link.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="text-gray-600">
                                        {getLinkIcon(link.type)}
                                    </div>
                                    <span className="font-medium">{link.type}</span>
                                </div>
                                <button
                                    size="sm"
                                    onClick={() => copyToClipboard(link.url, link.type)}
                                    disabled={!link.url}
                                >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
