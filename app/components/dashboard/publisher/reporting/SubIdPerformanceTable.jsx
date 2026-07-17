// app/components/dashboard/publisher/reporting/SubIdPerformanceTable.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { ArrowUpDown, Hash } from 'lucide-react';

const SubIdPerformanceTable = ({ data }) => {
    const [sortField, setSortField] = useState('commission');
    const [sortDirection, setSortDirection] = useState('desc');

    const sortedData = [...data].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const SortableHeader = ({ field, children }) => (
        <TableHead
            className="cursor-pointer hover:bg-slate-50"
            onClick={() => handleSort(field)}
        >
            <div className="flex items-center gap-1">
                {children}
                <ArrowUpDown className="w-3 h-3" />
            </div>
        </TableHead>
    );

    return (
        <div className="rounded-md border border-slate-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            Custom ID
                        </TableHead>
                        <SortableHeader field="clicks">Clicks</SortableHeader>
                        <SortableHeader field="orders">Orders</SortableHeader>
                        <SortableHeader field="sales">Sales</SortableHeader>
                        <SortableHeader field="commission">Commission</SortableHeader>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                                    {item.subid}
                                </Badge>
                            </TableCell>
                            <TableCell>{item.clicks.toLocaleString()}</TableCell>
                            <TableCell>{item.orders}</TableCell>
                            <TableCell className="font-semibold">${item.sales.toFixed(2)}</TableCell>
                            <TableCell className="font-semibold text-green-600">${item.commission.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default SubIdPerformanceTable;