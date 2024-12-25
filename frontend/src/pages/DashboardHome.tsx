import { ILinkItem } from "@/types";
import { useEffect, useState } from "react";

import { FileText, Github, Linkedin, Link as LinkIcon, Plus, Save, Trash2 } from 'lucide-react';
import { z } from "zod";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DEFAULT_LINKS: ILinkItem[] = [
    { _id: '1', type: 'Github', url: '' },
    { _id: '2', type: 'LinkedIn', url: '' },
    { _id: '3', type: 'Resume', url: '' },
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

const urlSchema = z.string().url();


const DashboardHome = () => {
    const [links, setLinks] = useState<ILinkItem[]>([]);
    const [error, setError] = useState<string | null>(null);



    // validating URL
    const validateUrl = (url: string) => {
        try {
            urlSchema.parse(url);
            setError(null);
            return true;
        } catch (error) {
            console.log(error);
            setError("Invalid URL. Please enter a valid URL");
            return false;
        }
    };

    const handleAddLink = async () => {
        const newLink = {
            _id: Date.now().toString(),
            type: 'custom',
            url: '',
        };
        if (links.length > 0) {
            if (!validateUrl(newLink.url)) { return; }
            setLinks([...links, newLink]);
            try {
                await fetch(`${BACKEND_URL}/links/add-links`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newLink)
                });
            } catch (error) {
                console.log(error);
                setError("Failed to add link.");
            }
        } else {
            setLinks([...links, newLink]);
        }
    };


    const handleUpdateLink = async (id: string, field: 'type' | 'url', value: string) => {
        if (field === "url" && !validateUrl(value)) { return; }
        const updatedLinks = links.map((link) =>
            link._id === id ? { ...link, [field]: value } : link
        );
        setLinks(updatedLinks);
        try {
            await fetch(`http://localhost:8080/links/update/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [field]: value }),
            });
        } catch (error) {
            console.error("Failed to update link:", error);
        }
    };


    const handleRemoveLink = async (id: string) => {
        const filteredLinks = links.filter((link) => link._id !== id);
        setLinks(filteredLinks);

        try {
            await fetch(`http://localhost:8080/links/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
        } catch (error) {
            console.error("Failed to delete link:", error);
        }
    };



    const handleSave = async () => {
        await fetch('http://localhost:8080/links/add-links', {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(links)
        });
    };

    useEffect(() => {
        async function fetchLinks() {
            const links = await fetch(`http://localhost:8080/links/details`, {
                method: 'GET',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await links.json();
            setLinks(data.user.links || DEFAULT_LINKS);
            console.log(links);
        }

        fetchLinks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl">
                <div className="space-y-4">
                    {links.map((link) => (
                        <div
                            key={link._id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transition-all hover:shadow-md"
                        >
                            <div className="text-gray-600">
                                {getLinkIcon(link.type)}
                            </div>
                            <input
                                type="text"
                                placeholder="Type"
                                value={link.type}
                                onChange={(e) => handleUpdateLink(link._id, 'type', e.target.value)}
                                className="flex-1 min-w-[100px] max-w-[150px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="url"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleUpdateLink(link._id, 'url', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => handleRemoveLink(link._id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>

                            
                        </div>
                    ))}
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
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
    );
};

export default DashboardHome;

