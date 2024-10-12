"use client";

import { useState } from "react";

import AppTabs from "@/components/ui/AppTabs";
import { DonkiManagement } from "@/components/dashboard/DonkiManagement";
import { StatusManagement } from "@/components/dashboard/StatusManagement";

const DashboardPage = () => {
    const tabs = [
        {
            label: "theDonki Management",
            value: "theDonki_Management",
        },
        {
            label: "Status Management",
            value: "Status_Management",
        },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <div className="h-[calc(100dvh-110px)] space-y-8 md:space-y-12 overflow-hidden">
            <div className="flex justify-center bg-secondary pt-4">
                <AppTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {activeTab === "theDonki_Management" && <DonkiManagement />}

            {activeTab === "Status_Management" && <StatusManagement />}
        </div>
    );
};

export default DashboardPage;
