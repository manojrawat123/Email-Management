const navBarArr = [
    {
        id: "2",
        label: "Customer Management",
        options: [
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
        ]
    },
    {
        id: "4",
        label: "User Management",
        link: "#",
        options: [
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
        options: [
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
        options: [
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
        options: [
            {
                id: "7a",
                label: "Send Email",
                link: '/emailsender'
            },
            {
                id: "7b",
                label: "Schedule Email"
            },
        ]
    },
];

export default navBarArr;