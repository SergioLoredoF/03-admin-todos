'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    path: string;
    icon: React.ReactNode;
    title: string;
}

export default function SidebarItem({ icon, path, title }: Props) {

    const pathName = usePathname();

    return (
        <li>
            <Link 
                href={ path }
                className={ path === pathName 
                    ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                }
            >
                { icon }
                <span className="-mr-1 font-medium">{ title }</span>
            </Link>
        </li>
    );
}