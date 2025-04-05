import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const tabs = [
    { name: "Sarathi", content: <div>Sarathi Content</div> },
    { name: "Tab 2", content: <div>Tab 2 Content</div> },
    { name: "Tab 3", content: <div>Tab 3 Content</div> },
    { name: "Tab 4", content: <div>Tab 4 Content</div> },
    { name: "Tab 5", content: <div>Tab 5 Content</div> },
];

export function HomeScreenTabs() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    useEffect(() => {
        if (router.isReady) {
            const { tab } = router.query;
            setActiveTab(tab as string || tabs[0].name);
        }
    }, [router.isReady, router.query]);

    return (
        <React.Fragment>
            <div className="flex flex-col w-max justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                    <ul className="flex flex-wrap text-lg font-medium text-center text-black justify-center">
                        {tabs.map((tab) => (
                            <li key={tab.name} className="me-2">
                                <Link href={`/?tab=${tab.name}`} passHref>
                                    <a
                                        className={`inline-block px-4 py-3 rounded-lg ${
                                            activeTab === tab.name ? "border-b-2 border-yellow-500" : ""
                                        }`}
                                    >
                                        {tab.name}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>{tabs.find((tab) => tab.name === activeTab)?.content}</div>
            </div>
        </React.Fragment>
    );
}