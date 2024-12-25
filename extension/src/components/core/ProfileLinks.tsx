import { Copy, FileText, Github, LinkIcon, LinkedinIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const getLinkIcon = (type: string) => {
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
    const [links, setLinks] = useState<{ id: string; type: string; url: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch Links function
    const fetchLinks = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/links/details', {
                method: 'GET',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data);

            if (response.ok && data.user.links.length > 0) {
                setLinks(data.user.links);
            } else {
                setLinks([]);
            }
        } catch (error) {
            setError((error as any).message);
        } finally {
            setLoading(false);
        }
    };

    // Copy to clipboard function
    const copyToClipboard = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert(`${label} link has been copied to clipboard`);
        } catch (error: any) {
            alert(`Failed to copy to clipboard ${(error as any).message}`);
        }
    };

    // Fetch links on component mount
    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div className="space-y-4">
            <div className="w-full">
                <div className="p-4 space-y-4">
                    <div className="grid gap-4">
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{`Error: ${error}`}</p>}

                        {links.length === 0 && !loading && !error && <p>No links available</p>}

                        {links.map((link) => (
                            <div key={link.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="text-gray-600">
                                        {getLinkIcon(link.type)}
                                    </div>
                                    <span className="font-medium">{link.type}</span>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => copyToClipboard(link.url, link.type)}
                                    disabled={!link.url}
                                    className="p-2 bg-transparent text-blue-500 hover:bg-blue-50 rounded-full"
                                >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy
                                </Button>
                            </div>
                        ))}

                        <button
                            onClick={fetchLinks}
                            className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Refresh Links
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
