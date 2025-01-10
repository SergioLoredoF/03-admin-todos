import { Metadata } from "next";
import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata: Metadata = {
    title: 'Cookies',
    description: 'Sirve para tests de cookies'
}

export default async function CookiesPage() {

    const cookiesStore = await cookies();
    const cookieTab = cookiesStore.get('selectedTab')?.value ?? '1';


    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
                <span className="text-3xl">Tabs</span>
                <TabBar currentTab={ +cookieTab } />
            </div>


        </div>
    );
}