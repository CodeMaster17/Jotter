import { FileText, Github, Linkedin, Link as LinkIcon, Plus, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LinkItem {
    id: string;
    type: string;
    url: string;
}

const DEFAULT_LINKS: LinkItem[] = [
    { id: '1', type: 'github', url: '' },
    { id: '2', type: 'linkedin', url: '' },
    { id: '3', type: 'resume', url: '' },
];

const getLinkIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'github':
            return <Github className="w-5 h-5" />;
        case 'linkedin':
            return <Linkedin className="w-5 h-5" />;
        case 'resume':
            return <FileText className="w-5 h-5" />;
        default:
            return <LinkIcon className="w-5 h-5" />;
    }
};

export default function LinkForm() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const savedLinks = localStorage.getItem('professionalLinks');
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        } else {
            setLinks(DEFAULT_LINKS);
        }
    }, []);

    const handleAddLink = () => {
        const newLink = {
            id: Date.now().toString(),
            type: 'custom',
            url: '',
        };
        setLinks([...links, newLink]);
        setSaved(false);
    };

    const handleRemoveLink = (id: string) => {
        setLinks(links.filter((link) => link.id !== id));
        setSaved(false);
    };

    const handleUpdateLink = (id: string, field: 'type' | 'url', value: string) => {
        setLinks(
            links.map((link) =>
                link.id === id ? { ...link, [field]: value } : link
            )
        );
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem('professionalLinks', JSON.stringify(links));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Professional Links</h1>
                <div className="space-y-4">
                    {links.map((link) => (
                        <div
                            key={link.id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transition-all hover:shadow-md"
                        >
                            <div className="text-gray-600">
                                {getLinkIcon(link.type)}
                            </div>
                            <input
                                type="text"
                                placeholder="Type"
                                value={link.type}
                                onChange={(e) => handleUpdateLink(link.id, 'type', e.target.value)}
                                className="flex-1 min-w-[100px] max-w-[150px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="url"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => handleRemoveLink(link.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        onClick={handleAddLink}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Link
                    </button>

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                    >
                        <Save className="w-5 h-5" />
                        Save Links
                    </button>
                </div>

                {saved && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                        Links saved successfully!
                    </div>
                )}
            </div>
        </div>
    );
}