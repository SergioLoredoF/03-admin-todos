'use client';
import { usePathname } from "next/navigation";

interface Props {
    routes: {
        title: string;
        path: string;
        icon: React.ReactNode;
    }[]
}

export default function TitleTopMenu( pRoutes: Props ) {

    const pathNav = usePathname();

    const title = pRoutes.routes.find( route => route.path === pathNav )?.title ?? '';

    return(
        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">{ title }</h5>
    );
} 