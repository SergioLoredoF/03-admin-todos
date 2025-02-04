import Image from "next/image";
import { auth } from '@/auth';
import { CiLogout } from "react-icons/ci";
import SidebarItem from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";

interface Props {
    routes: {
        title: string;
        path: string;
        icon: React.ReactNode;
    }[]
}

export const SideBar = async({ routes }: Props) => {

    const session = await auth();

    const avatarUrl = ( session?.user?.image )
        ? session.user.image
        : '/logo.png';

    const userName = ( session?.user?.name )
        ? session.user.name
        : 'No name';

    const userRoles = ( session?.user?.roles )
        ? session.user.roles
        : ['No roles'];

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-3 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[17%] xl:w-[17%] 2xl:w-[17%]">
            <div>
           
                <div className="mt-8 text-center">
                    <Image
                        src={ avatarUrl }
                        width={100}
                        height={100}
                        alt='Imagen usuario'
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />

                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ userName }</h5>
                    <span className="hidden text-gray-400 lg:block">{ userRoles.join(' ') }</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        routes.map(route => <SidebarItem key={route.path} {...route} />)
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogoutButton />
            </div>
        </aside>
    );
}