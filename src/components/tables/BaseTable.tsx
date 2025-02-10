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
}

const BasicTable = <T extends object>({
    data,
    columns,
}: BasicReactTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-center">
                <thead className="border-b bg-slate-400">
                    {table.getHeaderGroups().map((headerGroup) => (
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
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b bg-white">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
