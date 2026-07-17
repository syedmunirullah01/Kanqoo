// app/components/dashboard/publisher/reporting/TransactionLogTable.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { ArrowUpDown, Calendar, Hash } from 'lucide-react';

const TransactionLogTable = ({ data }) => {
    const [sortField, setSortField] = useState('timestamp');
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

    const getStatusBadge = (status) => {
        const statusConfig = {
            'Approved': { color: 'bg-green-50 text-green-700 border-green-200', label: 'Approved' },
            'Pending': { color: 'bg-amber-50 text-amber-700 border-amber-200', label: 'Pending' },
            'Cancelled': { color: 'bg-red-50 text-red-700 border-red-200', label: 'Cancelled' }
        };

        const config = statusConfig[status] || statusConfig.Pending;

        return (
            <Badge variant="outline" className={config.color}>
                {config.label}
            </Badge>
        );
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="rounded-md border border-slate-200">
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableHeader field="timestamp">
                            <Calendar className="w-3 h-3 mr-1" />
                            Date/Time
                        </SortableHeader>
                        <TableHead>Advertiser</TableHead>
                        <SortableHeader field="orderId">
                            <Hash className="w-3 h-3 mr-1" />
                            Order ID
                        </SortableHeader>
                        <SortableHeader field="saleAmount">Sale Amount</SortableHeader>
                        <SortableHeader field="commissionAmount">Commission</SortableHeader>
                        <TableHead>Status</TableHead>
                        <TableHead>Custom ID</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-sm text-slate-600">
                                {formatDate(item.timestamp)}
                            </TableCell>
                            <TableCell className="font-medium">{item.advertiserName}</TableCell>
                            <TableCell>
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                    {item.orderId}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-semibold">${item.saleAmount.toFixed(2)}</TableCell>
                            <TableCell className="font-semibold text-green-600">
                                ${item.commissionAmount.toFixed(2)}
                            </TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className="bg-slate-50 text-slate-600">
                                    {item.subid}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TransactionLogTable;