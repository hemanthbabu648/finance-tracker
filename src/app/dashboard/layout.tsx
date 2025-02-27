'use client'

import MobileMenu from "@/components/MobileMenu";
import UserInfoMenu from "@/components/UserInfoMenu";
import UserSidebar from "@/components/users/UserSidebar";
import { useAppSelector } from "@/redux/hooks";
import { fetchUserAccounts } from "@/redux/slices/AccountSlice";
import { fetchUserDetails } from "@/redux/slices/UserSlice";
import { AppDispatch } from "@/redux/store";
import { UnstyledButton } from "@mantine/core";
import { IconBrandRevolut, IconLayoutSidebarFilled, IconLayoutSidebarRightFilled } from "@tabler/icons-react";
import React from "react";
import { useDispatch } from "react-redux";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useDispatch<AppDispatch>();
    const { userDetails } = useAppSelector(state => state.auth)
    const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);

    const fetchUser = React.useCallback(async () => {
        await dispatch(fetchUserDetails());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        fetchUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    React.useEffect(() => {
        const fetchAccounts = async () => {
            if (userDetails) {
                await dispatch(fetchUserAccounts(userDetails.id))
            }
        }
        fetchAccounts()
    }, [dispatch, userDetails])

    return (
        <div className="h-screen flex flex-col-reverse justify-between sm:flex-row sm:justify-normal">
            {/* Navigation Bar for Large Screens */}
            <div className="hidden md:block">
                <nav className={`${isSidebarOpen ? "w-60" : "w-16"} flex flex-col justify-between bg-primary-dark text-white`}>
                    {/* Brand Logo And Name */}
                    <div className={`flex ${isSidebarOpen ? "justify-between" : "justify-center"} items-center p-1 border-b border-gray-600`}>
                        {isSidebarOpen && <div className="flex items-center gap-2">
                            <IconBrandRevolut size={40} />
                            <div>
                                <p className="text-sm whitespace-nowrap">Finomic</p>
                                <p className="text-xs whitespace-nowrap">Finance Made Simple</p>
                            </div>
                        </div>}
                        <UnstyledButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            {isSidebarOpen ? <IconLayoutSidebarRightFilled size={28} /> : <IconLayoutSidebarFilled size={28} />}
                        </UnstyledButton>
                    </div>
                    {/* Navigation Links */}
                    <div className="h-[calc(100vh-113px)]">
                        <UserSidebar isSidebarOpen={isSidebarOpen} />
                    </div>
                    <div className="bg-blue-400">
                        <UserInfoMenu openSidebar={isSidebarOpen} />
                    </div>
                </nav>
            </div>
            {/* Navigation Bar for Mobile Screens */}
            <div className="fixed bottom-0 left-0 right-0 bg-primary-dark text-white md:hidden h-16 flex">
                <MobileMenu />
            </div>
            <main className="w-full sm:max-w-7xl lg:max-w-full mx-auto p-6 pb-20 sm:pb-6 flex-grow bg-gray-100 overflow-y-scroll scrollbar-hide">
                {children}
            </main>
        </div>
    );
}