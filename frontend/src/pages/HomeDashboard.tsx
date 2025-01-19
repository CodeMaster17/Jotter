import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { errorMessage } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { getLinkIcon } from "@/lib/get-icon";
import { ILinkItem } from "@/types";
import { Pencil, Plus, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";
import { z } from "zod";

const urlSchema = z.string().url();


const HomeDashboard = () => {
    const [links, setLinks] = useState<ILinkItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [saveButtonState, setSaveButtonState] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [activeEditInput, setActiveEditInput] = useState<string | null>(null);
    const [updateButtonState, setUpdateButtonState] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    console.log(loading);
    useEffect(() => {
        async function fetchLinks() {
            setLoading(true);
            try {

                const links = await fetch(`${config.BACKEND_URL}/links/details`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${window.localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await links.json();
                if (data.user.links.length > 0) {
                    setLinks(data.user.links || []);
                    toast({
                        title: 'Success',
                        description: `Successfully fetched links`,
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: 'No Links',
                        description: `No links found`,
                    });
                }
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: 'Error',
                    description: `Failed to fetch links: ${error}`,
                });
            } finally {
                setLoading(false);
            }
        }

        fetchLinks();
    }, []);

    const { toast } = useToast();
    // validating URL
    const validateUrl = (url: string): boolean => {
        try {
            urlSchema.parse(url);
            setError(null);
            return true;
        } catch (error) {
            setError(`Invalid URL. ${error}`);
            return false;
        } finally {
            setError(null);
        }
    };

    const handleAddLink = async (toBeSavedLink: { url: string; label: string }) => {
        if (!validateUrl(toBeSavedLink.url)) {
            setError('Invalid URL. Please check and try again.'); // Added error message for validation
            return;
        }
        setError(null);
        setEditMode(true);
        const newLink = {
            _id: Date.now().toString(),
            type: '',
            url: '',
        };
        setLinks((prev) => [...prev, newLink]);
        setActiveEditInput(newLink._id);
        setUpdateButtonState(false);
    };

    // update edit mode for that particular link only
    const handleUpdateLinkControl = async (id: string) => {
        if (editMode && activeEditInput === id) {
            // Cancel edit mode if already editing the same link
            setEditMode(false);
            setActiveEditInput(null);
            setUpdateButtonState(false);
        } else {
            // Enable edit mode for the selected link
            setActiveEditInput(id);
            setEditMode(true);
            setUpdateButtonState(true);
        }
    };

    const handleUpdateLink = async (id: string, field: 'type' | 'url', value: string) => {
        const updatedLinks = links.map((link) => {
            if (link._id === id) {
                return {
                    ...link,
                    [field]: value,
                };
            }
            return link;
        });
        setLinks(updatedLinks);
    };

    // handle update button
    const handleUpdateButtonHandler = async (id: string) => {
        if (id === activeEditInput) {
            // setUpdateButtonState(true);
            setEditMode(false);
            setActiveEditInput('');
            toast({
                title: 'Link Updated',
                description: 'Link updated successfully',
            });
        }
    };


    const handleRemoveLink = async (id: string) => {

        const filteredLink = links.filter((link) => link._id !== id);
        try {
            const res = await fetch(`${config.BACKEND_URL}/links/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            if (data.success) {
                toast({
                    description: errorMessage.LINK_DELETED_SUCCESS,
                });
                setLinks(filteredLink);
            }
        } catch (error) {
            setLinks(links);
            toast({
                variant: "destructive",
                title: 'Error',
                description: `Error while deleting link: ${error}`,
            });
        }
    };



    const handleSave = async (id: string) => {

        setSaveButtonState(true);
        // FIXME: Fix the time complexity thing here
        const toBeSavedLink = links.find((link) => link._id === id);

        if (!toBeSavedLink) { return; }

        if (!validateUrl(toBeSavedLink.url)) { return; }
        try {

            const response = await fetch(`${config.BACKEND_URL}/links/add-links`, {
                method: 'POST',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toBeSavedLink)
            });
            const data = await response.json();
            if (data.success) {
                const updatedLinks = links.map((link) =>
                    link._id === id ? { ...link, _id: data.links._id } : link
                );
                setLinks(updatedLinks);
                toast({
                    title: 'Link Saved',
                    description: 'Link saved successfully',
                });
            }
            setEditMode(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: 'Link Not Saved',
                description: `There was error while saving the link: ${error}`,
            });
        } finally {
            setSaveButtonState(false);
        }
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-3xl">
                <div className="space-y-4">
                    {links.length > 0 && links.map((link) => (
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
                                value={link.type.length === 0 ? "" : link.type[0].toUpperCase() + link.type.slice(1)}
                                onChange={(e) => handleUpdateLink(link._id, 'type', e.target.value)}
                                className="flex-1 min-w-[100px] max-w-[150px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                disabled={activeEditInput !== link._id || !editMode}
                                type="url"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => handleUpdateLink(link._id, 'url', e.target.value)}
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* delete button */}
                            <Button
                                onClick={() => handleRemoveLink(link._id)}
                                className="p-2 bg-transparent text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>

                            {/* save buttonn */}
                            {activeEditInput === link._id && !updateButtonState &&
                                <Button
                                    disabled={
                                        link.url === '' || link.type === '' || saveButtonState || !editMode
                                    }
                                    onClick={() => handleSave(link._id)}
                                    className="flex items-center  gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                                >
                                    <Save className="w-5 h-5" />
                                    Save
                                </Button>
                            }
                            {/* update button */}
                            {activeEditInput === link._id &&
                                <Button
                                    disabled={
                                        link.url === '' || link.type === '' || activeEditInput !== link._id
                                    }
                                    onClick={() => handleUpdateButtonHandler(link._id)}
                                    className="flex items-center  gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                                >
                                    <Save className="w-5 h-5" />
                                    Update
                                </Button>}
                            {/* edit button */}
                            <Button
                                disabled={
                                    link.url === '' || link.type === '' || saveButtonState
                                }
                                onClick={() => handleUpdateLinkControl(link._id)}
                                className="flex items-center  gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                            >
                                <Pencil className="w-5 h-5" />
                                {editMode && activeEditInput === link._id ? 'Cancel' : 'Edit'}

                            </Button>

                        </div>
                    ))}
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => handleAddLink({ url: 'https://example.com', label: 'Example' })}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add Link
                    </button>

                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;

