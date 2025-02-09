
import React from "react";

import { Tooltip } from "@mantine/core";
import {
    IconBuildingBank,
    IconCashBanknoteOff,
    IconContract,
    IconDashboard,
    IconLocationDollar,
    IconReceiptDollar,
    IconReportMoney,
} from "@tabler/icons-react";
import NavLink from "../commons/NavLink";

const userRoutes = [
    {
        link: "/dashboard",
        label: "Home",
        icon: IconDashboard
    },
    {
        link: "/dashboard/accounts",
        label: "Accounts",
        icon: IconBuildingBank,
    },
    {
        link: "/dashboard/cash-inflow",
        label: "Cash Inflow",
        icon: IconLocationDollar,
    },
    {
        link: "/dashboard/cash-outflow",
        label: "Cash Outflow",
        icon: IconReportMoney,
    },
    {
        link: "/dashboard/budgets",
        label: "Budgets",
        icon: IconCashBanknoteOff
    },
    {
        link: "/dashboard/reports",
        label: "Reports",
        icon: IconReportMoney
    },
    {
        link: "/dashboard/borrow-lend",
        label: "Borrow / Lend",
        icon: IconContract
    },
    {
        link: "/dashboard/bills",
        label: "Bills",
        icon: IconReceiptDollar
    }
]

type Props = {
    isSidebarOpen: boolean;
};

const UserSidebar: React.FC<Props> = ({ isSidebarOpen }) => {
    if (!isSidebarOpen) {
        return (
            <div className="flex flex-col px-1 py-2">
                {userRoutes.map((route) => (
                    <Tooltip
                        key={route.link}
                        label={route.label}
                        position="right"
                        transitionProps={{ duration: 0 }}
                    >
                        <NavLink
                            href={route.link}
                            leftSection={<route.icon />}
                            className="hover:!bg-primary-blue-light !rounded-sm mt-1"
                        />
                    </Tooltip>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col px-1 py-2">
            {userRoutes.map((route) => (
                <NavLink
                    href={route.link}
                    key={route.link}
                    label={route.label}
                    leftSection={<route.icon />}
                    className="hover:!bg-primary-blue-light !rounded-sm mt-1"
                />
            ))}
        </div>
    );
};

export default UserSidebar;
