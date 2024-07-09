import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../context'
import { DateRange, Person } from '@mui/icons-material';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchInvoice = () => {

    const { customerObject, getCustomerFunction } = useContext(DataContext);

    useEffect(() => {
        getCustomerFunction();
    }, [])

    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    if (!customerObject) {
        return <Loading />
    }

    const search_invoice_arr = [
        {
            type: "option",
            name: "customer_id",
            placeholder: "Please Select Customer",
            label: "Please Select Customer",
            option: customerObject?.map((element, index) => {
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
            name: "invoice_from_date",
            placeholder: "Please Select From Date",
            label: "Please Select Customer",
            icon: <DateRange className={iconCss} />
        },
        {
            type: "date",
            name: "invoice_to_date",
            placeholder: "Please Select From Date",
            label: "Please Select Customer",
            icon: <DateRange className={iconCss} />
        }
    ]

    return (
        <SearchPage title={"Search Invoice"} search_page_arr={search_invoice_arr} route_page={"display-invoice"} />
    )
}

export default SearchInvoice
