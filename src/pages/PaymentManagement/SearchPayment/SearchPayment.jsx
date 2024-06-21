import React, { useContext, useEffect } from 'react';
import { DateRange, Person } from '@mui/icons-material';

import { DataContext } from '../../../context';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchPayment = () => {
    const { activeCustomerObject, getCustomerFunction } = useContext(DataContext);

    useEffect(() => {
        getCustomerFunction();
    }, []);

    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    if (!activeCustomerObject) {
        return <Loading />
    }

    const search_payment_arr = [
        {
            type: "option",
            name: "customer_id",
            placeholder: "Please Select Customer",
            label: "Please Select Customer",
            option: activeCustomerObject?.map((element, index) => {
                if (element.active === true) {
                    return {
                        label: element.customer_name,
                        value: element.id
                    };
                }
                return null; // Explicitly return null for non-active elements
            })
            .filter(element => element !== null),
            icon: <Person className={iconCss} />
        },
        {
            type: "date",
            name: "payment_from_date",
            placeholder: "Please Select From Date",
            label: "Please Select Customer",
            icon: <DateRange className={iconCss} />
        },
        {
            type: "date",
            name: "payment_to_date",
            placeholder: "Please Select From Date",
            label: "Please Select Customer",
            icon: <DateRange className={iconCss} />
        }
    ]

    return (
        <SearchPage title={"Search Payment"} search_page_arr={search_payment_arr} route_page={"display-payment"}/>
    )
}

export default SearchPayment




