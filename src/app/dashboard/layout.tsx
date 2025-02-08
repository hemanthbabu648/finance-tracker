'use client'

import React from "react";
import { Button, UnstyledButton } from "@mantine/core";
import { IconBrandRevolut, IconCurrencyRupee, IconDashboard, IconLayoutSidebarFilled, IconLayoutSidebarRightFilled, IconListCheck, IconSchool } from "@tabler/icons-react";
import NavLink from "@/components/commons/NavLink";
import { logout } from "@/serverActions/auth";

const studentRoutes = [
    { link: "/dashboard/student", label: "Home", icon: <IconDashboard /> },
    {
        link: "/dashboard/student/marks",
        label: "Marks",
        icon: <IconSchool />,
    },
    {
        link: "/dashboard/student/attendance",
        label: "Attendance",
        icon: <IconListCheck />,
    },
    {
        link: "/dashboard/student/fees",
        label: "Fees",
        icon: <IconCurrencyRupee />,
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);

    return (
        <div className="h-screen flex flex-col-reverse justify-between sm:flex-row sm:justify-normal">
            <nav className={`w-full h-12 ${isSidebarOpen ? "sm:w-60" : "sm:w-16"} sm:h-screen bg-primary-dark text-white`}>
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
                <ul className="flex flex-col p-2 list-none">
                    {studentRoutes.map((route) => (
                        <NavLink
                            href={route.link}
                            key={route.link}
                            label={route.label}
                            leftSection={route.icon}
                            className="hover:!bg-yellow-500 !rounded-sm mt-1"
                        />
                    ))}
                </ul>
                <Button
                    variant='filled'
                    onClick={() => logout()}

                >
                    Logout
                </Button>
            </nav>
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}