import SideBar from '@/components/SideBar';
import TopMenu from '@/components/TopMenu';
import { IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoStorefrontOutline } from 'react-icons/io5';

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