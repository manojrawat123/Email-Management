import React, { useContext, useEffect } from 'react';
import { DateRange, Person } from '@mui/icons-material';

import { DataContext } from '../../../context';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchIpAddress = () => {
    
    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

    const search_payment_arr = [
        {
            type: "text",
            name: "ip_address",
            placeholder: "Enter Ip Address",
            label: "Enter Ip Address",
            icon: <Person className={iconCss} />
        },
    ]

    return (
        <SearchPage title={"Search Ip"} search_page_arr={search_payment_arr} route_page={"display-ip"} />
    );
}

export default SearchIpAddress




