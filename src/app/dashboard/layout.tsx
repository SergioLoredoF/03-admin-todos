import { TopMenu, SideBar } from '@/components';
import { 
    IoCalendarOutline, 
    IoCheckboxOutline, 
    IoCodeWorkingOutline, 
    IoListOutline, 
    IoPersonCircleOutline, 
    IoStorefrontOutline 
} from 'react-icons/io5';

const routes = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <IoCalendarOutline size={30} />
    },
    {
        title: 'Todos',
        path: '/dashboard/rest-todos',
        icon: <IoCheckboxOutline size={30} />
    },
    {
        title: 'Server actions',
        path: '/dashboard/server-actions',
        icon: <IoListOutline size={30} />
    },
    {
        title: 'Cookies',
        path: '/dashboard/cookies',
        icon: <IoCodeWorkingOutline />
    },
    {
        title: 'Productos',
        path: '/dashboard/products',
        icon: <IoStorefrontOutline />
    },
    {
        title: 'Perfil',
        path: '/dashboard/profile',
        icon: <IoPersonCircleOutline/>    
    }
]

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SideBar routes={ routes } />
            <div className="ml-auto mb-6 lg:w-[83%] xl:w-[83%] 2xl:w-[83%] min-h-screen">
                <TopMenu routes={ routes } />
                <div className="px-6 pt-6 bg-white">
                    {children}
                </div>
            </div>
        </>
    );
}