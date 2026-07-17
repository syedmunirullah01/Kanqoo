// app/lib/mockReportingData.js
export const mockTransactions = [
    {
        id: "txn_1",
        timestamp: "2024-01-29T10:30:00Z",
        advertiserName: "Nike",
        orderId: "ORD-987",
        saleAmount: 150.00,
        commissionAmount: 12.00,
        status: "Approved",
        subid: "youtube_video_1"
    },
    {
        id: "txn_2",
        timestamp: "2024-01-29T11:15:00Z",
        advertiserName: "Adidas",
        orderId: "ORD-988",
        saleAmount: 80.00,
        commissionAmount: 8.00,
        status: "Pending",
        subid: "blog_sidebar"
    },
    {
        id: "txn_3",
        timestamp: "2024-01-28T14:00:00Z",
        advertiserName: "Nike",
        orderId: "ORD-950",
        saleAmount: 200.00,
        commissionAmount: 16.00,
        status: "Cancelled",
        subid: "youtube_video_1"
    },
    {
        id: "txn_4",
        timestamp: "2024-01-27T09:45:00Z",
        advertiserName: "Apple",
        orderId: "ORD-945",
        saleAmount: 999.00,
        commissionAmount: 29.97,
        status: "Approved",
        subid: "email_newsletter"
    },
    {
        id: "txn_5",
        timestamp: "2024-01-26T16:20:00Z",
        advertiserName: "Amazon",
        orderId: "ORD-932",
        saleAmount: 45.50,
        commissionAmount: 2.28,
        status: "Approved",
        subid: "instagram_story"
    }
];

export const mockAdvertiserPerformance = [
    {
        advertiserName: "Nike",
        clicks: 15000,
        orders: 75,
        cr: "0.5%",
        sales: 7500.00,
        commission: 600.00,
        epc: 0.04
    },
    {
        advertiserName: "Adidas",
        clicks: 10000,
        orders: 50,
        cr: "0.5%",
        sales: 5000.00,
        commission: 400.00,
        epc: 0.04
    },
    {
        advertiserName: "Apple",
        clicks: 8000,
        orders: 40,
        cr: "0.5%",
        sales: 39960.00,
        commission: 1198.80,
        epc: 0.15
    },
    {
        advertiserName: "Amazon",
        clicks: 20000,
        orders: 100,
        cr: "0.5%",
        sales: 4550.00,
        commission: 227.50,
        epc: 0.011
    }
];

export const mockSubIdPerformance = [
    {
        subid: "youtube_video_1",
        clicks: 12000,
        orders: 60,
        sales: 6000.00,
        commission: 480.00
    },
    {
        subid: "blog_sidebar",
        clicks: 8000,
        orders: 40,
        sales: 3200.00,
        commission: 256.00
    },
    {
        subid: "email_newsletter",
        clicks: 5000,
        orders: 25,
        sales: 24975.00,
        commission: 749.25
    },
    {
        subid: "instagram_story",
        clicks: 15000,
        orders: 75,
        sales: 3412.50,
        commission: 170.63
    }
];

export const mockChartData = [
    { date: "2024-01-01", commission: 120, clicks: 1500, sales: 1200, orders: 12 },
    { date: "2024-01-02", commission: 180, clicks: 2200, sales: 1800, orders: 18 },
    { date: "2024-01-03", commission: 150, clicks: 1900, sales: 1500, orders: 15 },
    { date: "2024-01-04", commission: 220, clicks: 2800, sales: 2200, orders: 22 },
    { date: "2024-01-05", commission: 190, clicks: 2400, sales: 1900, orders: 19 },
    { date: "2024-01-06", commission: 250, clicks: 3200, sales: 2500, orders: 25 },
    { date: "2024-01-07", commission: 210, clicks: 2700, sales: 2100, orders: 21 },
    { date: "2024-01-08", commission: 280, clicks: 3500, sales: 2800, orders: 28 },
    { date: "2024-01-09", commission: 240, clicks: 3100, sales: 2400, orders: 24 },
    { date: "2024-01-10", commission: 300, clicks: 3800, sales: 3000, orders: 30 }
];