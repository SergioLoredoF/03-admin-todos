import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import SidebarItem from "./SidebarItem";

interface Props {
    routes: {
        title: string;
        path: string;
        icon: React.ReactNode;
    }[]
}

export default function SideBar({ routes }: Props) {
    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-3 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[17%] xl:w-[17%] 2xl:w-[17%]">
            <div>
           
                <div className="mt-8 text-center">
                    <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        alt='Imagen usuario'
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />

                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Sergio Loredo</h5>
                    <span className="hidden text-gray-400 lg:block">Dios</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        routes.map(route => <SidebarItem key={route.path} {...route} />)
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <CiLogout />
                    <span className="group-hover:text-gray-700">Salir</span>
                </button>
            </div>
        </aside>
    );
}