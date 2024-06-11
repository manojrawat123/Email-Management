const navBarArr = [
    {
        id : "1",
        label : "Home",
        link : "/"
    },
    {
        id : "2",
        label : "Customer",
        options : [
            {
                id : "2a",
                label : "Add Customer",
                link : "/addcustomer"
            },
            {
                id : "2b",
                label : "Show Customer",
                link : "/showcustomer"
            },
            {
                id : "3b",
                label : "Add User",
                link : "/register"
            },
            {
                id : "3b",
                label : "Show User",
                link : "/manage-user"
            },
        ]
    },
    {
        id : "3",
        label : "Email",
        options : [
            {
                id : "3a",
                label : "Send Email",
                link : '/emailsender'
            },
            {
                id : "3b",
                label : "Schedule Email"
            },
            {
                id : "4c",
                label : "Add Routes",
                link : '/addtoproute'
            },
            {
                id : "4d",
                label : "Search Routes",
                link : '/search-route'
            },
            {
                id : "4d",
                label : "Search Rate",
                link : '/search-rate'
            },
            {
                id : "4d",
                label : "Update Routes",
                link : '/route-update-delete'
            },
        ]
    },
    {
        id : "4",
        label : "Rate",
        options : [
            {
                id : "4a",
                label : "Add Rate",
                link : '/addrate'
            },
            {
                id : "4b",
                label : "Update Rate",
                link : '/updaterate'
            },
            
        ]
    },
];

export default navBarArr;