import { useState } from "react";

const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const tabs = [
        { id: "tab1", label: "Links", content: "This is the content of Tab 1." },
        { id: "tab2", label: "Questions", content: "This is the content of Tab 2." },
        { id: "tab3", label: "Tab 3", content: "This is the content of Tab 3." },
    ];

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Tab Headers */}
            <div className="flex border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-2 px-4 ${activeTab === tab.id
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 border">
                {tabs.map(
                    (tab) =>
                        activeTab === tab.id && (
                            <div key={tab.id} className="text-gray-700">
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Tabs;
