"use client";

import React from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

interface BasicReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
}

const BasicTable = <T extends object>({
    data,
    columns,
    isLoading = false,
}: BasicReactTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Skeleton Loader for the Table Header
    const renderSkeletonHeader = () => (
        <tr>
            {columns.map((_, index) => (
                <th
                    key={index}
                    className="px-5 py-4 text-sm font-medium text-gray-900 bg-slate-200 animate-pulse"
                >
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                </th>
            ))}
        </tr>
    );

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-center">
                <thead className="border-b bg-slate-400">
                    {isLoading ? (
                        renderSkeletonHeader()
                    ) : (
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="px-5 py-4 text-sm font-medium text-gray-900"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))
                    )}
                </thead>
                <tbody>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            // Show 5 skeleton rows while loading
                            <tr className="bg-slate-100 animate-pulse" key={index}>
                                {columns.map((_, index) => (
                                    <td
                                        key={index}
                                        className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                                    >
                                        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                                    </td>
                                ))}
                            </tr>
                        ))
                        : table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-b bg-white">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default BasicTable;
