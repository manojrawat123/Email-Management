const navBarArr = [
    {
        id: "2",
        label: "Customer Management",
        option: [
            {
                id: "2a",
                label: "Add Customer",
                link: "/addcustomer"
            },
            {
                id: "2b",
                label: "Show Customer",
                link: "/showcustomer"
            },
            {
                id: "2c",
                label: "Add Invoice",
                link: "/add-invoice"
            },
            {
                id: "2d",
                label: "Search Invoice",
                link: "/search-invoice"
            },
            {
                id: "2e",
                label: "Search Dispute",
                link: "/search-dispute"
            },
            {
                id: "2f",
                label: "Add Dispute",
                link: "/add-dispute"
            },
            {
                id: "2g",
                label: "Add Payment",
                link: "/add-payment"
            },
            {
                id: "2h",
                label: "Search Payment",
                link: "/search-payment"
            },
            {
                id: "2i",
                label: "Statement Of amount",
                link: "/statement-of-amount"
            },
            {
                id: "2j",
                label: "Add Customer Ip",
                link: "/add-customer-ip"
            },
            {
                id: "2k",
                label: "Search Ip",
                link: "/search-ip"
            },
        ]
    },
    {
        id: "4",
        label: "User Management",
        link: "#",
        option: [
            {
                id: "4a",
                label: "Add User",
                link: "/register"
            },
            {
                id: "4b",
                label: "Show User",
                link: "/manage-user"
            },
            {
                id: "4b",
                label: "Transfer Customer",
                link: "/transfer-customer"
            },
        ]
    },
    {
        id: "5",
        label: "Top Route & Rate Management",
        link: "#",
        option: [
            {
                id: "5a",
                label: "Add Routes",
                link: '/addtoproute'
            },
            {
                id: "5b",
                label: "Search Routes",
                link: '/search-route'
            },
            {
                id: "5c",
                label: "Update Routes",
                link: '/route-update-delete'
            },
            {
                id: "5d",
                label: "Add Rate",
                link: '/addrate'
            },
            {
                id: "5e",
                label: "Update Rate",
                link: '/updaterate'
            },
            {
                id: "5f",
                label: "Search Rate",
                link: '/search-rate'
            },
        ]
    },
    
    {
        id: "7",
        label: "Event",
        option: [
            {
                id : "7a",
                label : "Send Top Route",
                link : '/emailsender'
            },
            {
                id : "7b",
                label : "Schedule Top Route",
                link : "/email-schedule"
            },
            {
                id : "7b",
                label : "Send Rate",
                link : "/send-rate-email"
            },
            // {
            //     id: "7b",
            //     label: "Schedule Rate"
            // },
        ]
    },
    {
        id: "8",
        label: "Vendor Rate Management",
        option: [
            {
                id: "8a",
                label: "Upload Vendor Rate",
                link: '/upload-vendor-rate'
            },
            {
                id: "8c",
                label: "Search Vendor Rate",
                link: '/search-vendor-rate'
            },
            {
                id: "8d",
                label: "Add Vendor Rate",
                link: '/add-vendor-rate'
            },
            {
                id: "8e",
                label: "Search Vendor Rate Country",
                link: '/search-vendor-rate-country'
            },
            {
                id: "8f",
                label: "Search Vendor Target Sheet",
                link: '/search-vendor-target-sheet'
            },
            {
                id: "8g",
                label: "Search Vendor Target Sheet Code",
                link: '/search-vendor-target-sheet-by-country_code'
            },
        ]
    }
];

export default navBarArr;