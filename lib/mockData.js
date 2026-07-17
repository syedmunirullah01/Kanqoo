// app/lib/mockData.js
export const mockAdvertisers = [
    {
        merchant: {
            id: "123",
            name: "Adidas",
            logoUrl: "/logos/adidas.png",
            url: "https://adidas.com",
            description: "Adidas is a multinational corporation that designs and manufactures shoes, clothing and accessories. It is the largest sportswear manufacturer in Europe and the second largest in the world.",
            commission: "Up to 10%",
            returnDays: "30",
            categories: ["Sports & Fitness", "Fashion"],
            shipsTo: ["US", "CA", "UK", "DE", "FR"],
            termsUrl: "https://adidas.com/affiliate-terms",
            partnershipType: "auto-approve"
        },
        partnershipStatus: "not_joined"
    },
    {
        merchant: {
            id: "456",
            name: "Nike",
            logoUrl: "/logos/nike.png",
            url: "https://nike.com",
            description: "Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.",
            commission: "8% of Sale",
            returnDays: "14",
            categories: ["Sports", "Fashion"],
            shipsTo: ["US", "DE", "FR", "AU"],
            termsUrl: "https://nike.com/affiliate-terms",
            partnershipType: "manual"
        },
        partnershipStatus: "approved"
    },
    {
        merchant: {
            id: "789",
            name: "Apple",
            logoUrl: "/logos/apple.png",
            url: "https://apple.com",
            description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.",
            commission: "3% Flat Rate",
            returnDays: "7",
            categories: ["Electronics", "Technology"],
            shipsTo: ["US", "CA", "UK", "DE", "FR", "JP", "AU"],
            termsUrl: "https://apple.com/affiliate-terms",
            partnershipType: "manual"
        },
        partnershipStatus: "pending"
    },
    {
        merchant: {
            id: "101",
            name: "Amazon",
            logoUrl: "/logos/amazon.png",
            url: "https://amazon.com",
            description: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
            commission: "1-10% Variable",
            returnDays: "24",
            categories: ["Electronics", "Home Decor", "Books"],
            shipsTo: ["US", "CA", "UK", "DE", "FR", "JP", "BR"],
            termsUrl: "https://amazon.com/affiliate-terms",
            partnershipType: "auto-approve"
        },
        partnershipStatus: "not_joined"
    },
    {
        merchant: {
            id: "112",
            name: "Sephora",
            logoUrl: "/logos/sephora.png",
            url: "https://sephora.com",
            description: "Sephora is a French multinational retailer of personal care and beauty products.",
            commission: "5-8% Commission",
            returnDays: "30",
            categories: ["Beauty", "Fashion"],
            shipsTo: ["US", "CA", "FR"],
            termsUrl: "https://sephora.com/affiliate-terms",
            partnershipType: "manual"
        },
        partnershipStatus: "not_joined"
    },
    {
        merchant: {
            id: "131",
            name: "Wayfair",
            logoUrl: "/logos/wayfair.png",
            url: "https://wayfair.com",
            description: "Wayfair Inc. is an American e-commerce company that sells furniture and home-goods.",
            commission: "Up to 15%",
            returnDays: "30",
            categories: ["Home Decor", "Furniture"],
            shipsTo: ["US", "CA", "UK", "DE"],
            termsUrl: "https://wayfair.com/affiliate-terms",
            partnershipType: "auto-approve"
        },
        partnershipStatus: "approved"
    }
];