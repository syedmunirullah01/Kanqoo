// app/components/dashboard/publisher/reporting/AdvertiserPerformanceTable.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { ArrowUpDown, TrendingUp } from 'lucide-react';

const AdvertiserPerformanceTable = ({ data }) => {
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
                        <TableHead>Advertiser</TableHead>
                        <SortableHeader field="clicks">Clicks</SortableHeader>
                        <SortableHeader field="orders">Orders</SortableHeader>
                        <SortableHeader field="cr">Conversion Rate</SortableHeader>
                        <SortableHeader field="sales">Sales</SortableHeader>
                        <SortableHeader field="commission">Commission</SortableHeader>
                        <SortableHeader field="epc">EPC</SortableHeader>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.advertiserName}</TableCell>
                            <TableCell>{item.clicks.toLocaleString()}</TableCell>
                            <TableCell>{item.orders}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {item.cr}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-semibold">${item.sales.toFixed(2)}</TableCell>
                            <TableCell className="font-semibold text-green-600">${item.commission.toFixed(2)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <span className="font-semibold">${item.epc.toFixed(3)}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdvertiserPerformanceTable;