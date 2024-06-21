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
                id: "2d",
                label: "Search Dispute",
                link: "/search-dispute"
            },
            {
                id: "2e",
                label: "Add Dispute",
                link: "/add-dispute"
            },
            {
                id: "2e",
                label: "Add Payment",
                link: "/add-payment"
            },
            {
                id: "2e",
                label: "Search Payment",
                link: "/search-payment"
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
        ]
    },
    {
        id: "5",
        label: "Top Route Management",
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
                label: "Replace Routes",
                link: '/route-update-delete'
            },
        ]
    },
    {
        id: "6",
        label: "Rate Management",
        option: [
            {
                id: "6a",
                label: "Add Rate",
                link: '/addrate'
            },
            {
                id: "6b",
                label: "Update Rate",
                link: '/updaterate'
            },
            {
                id: "6c",
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
];

export default navBarArr;