import { LOCAL_STORAGE_PROFESSIONAL_LINKS } from "@/constants"
import { storage } from "@/lib/storage"
import { ILinkItem } from "@/types"
import { useEffect, useState } from "react"

import { Github, Linkedin, FileText, Plus, Trash2, Save, Link as LinkIcon } from 'lucide-react';

const DEFAULT_LINKS: ILinkItem[] = [
    { id: '1', type: 'Github', url: '' },
    { id: '2', type: 'LinkedIn', url: '' },
    { id: '3', type: 'Resume', url: '' },
];
// FIXME: USed at 2 places, in this file and ProfileLink.tsx
const getLinkIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "github":
            return <Github className="w-5 h-5" />;
        case "linkedin":
            return <Linkedin className="w-5 h-5" />;
        case "resume":
            return <FileText className="w-5 h-5" />;
        default:
            return <LinkIcon className="w-5 h-5" />;
    }
};
const DashboardHome = () => {
    const [links, setLinks] = useState<ILinkItem[]>([])

    const handleUpdateLink = async (id: string, field: 'type' | 'url', value: string) => {
        setLinks(
            links.map((link) =>
                link.id === id ? { ...link, [field]: value } : link
            )
        );
        await storage.set(LOCAL_STORAGE_PROFESSIONAL_LINKS, links);
    }

    const handleRemoveLink = async (id: string) => {
        setLinks(links.filter((link) => link.id !== id));
        await storage.set(LOCAL_STORAGE_PROFESSIONAL_LINKS, links);
    }

    const handleAddLink = async () => {
        const newLink = {
            id: Date.now().toString(),
            type: 'custom',
            url: '',
        };
        setLinks([...links, newLink]);
        await storage.set(LOCAL_STORAGE_PROFESSIONAL_LINKS, links);
    }

    const handleSave = () => {
        storage.set(LOCAL_STORAGE_PROFESSIONAL_LINKS, links);

    };
    useEffect(() => {
        storage.get(LOCAL_STORAGE_PROFESSIONAL_LINKS).then((savedLinks) => {
            if (savedLinks) {
                setLinks(JSON.parse(savedLinks))
            }
            else {
                setLinks(DEFAULT_LINKS);
            }
        })
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
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
            </div>
        </div>
    )
}

export default DashboardHome

