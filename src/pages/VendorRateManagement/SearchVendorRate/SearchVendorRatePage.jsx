import React, { useContext, useEffect } from 'react'
import { DateRange, Person } from '@mui/icons-material';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import { DataContext } from '../../../context'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchVendorRate = () => {

    const {
        searchPageOptionGetFunc,
        searchPageData
    } = useContext(DataContext);

    useEffect(() => {
        searchPageOptionGetFunc("vendor_rate_page")
    }, []);


    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    if (!searchPageData) {
        console.log(searchPageData);
        return <Loading />
    }


    const search_invoice_arr = [
        {
            type: "option",
            name: "customer_id",
            placeholder: "Please Select Customer",
            label: "Please Select Customer",
            option: searchPageData?.customer?.map((element, index) => {
                return {
                    label: element.customer_name,
                    value: element.id
                };
            }),
            icon: <Person className={iconCss} />
        },
        {
            type: "option",
            name: "customer_rate_id",
            placeholder: "Please Select Vendor Rate",
            label: "Please Select Vendor Rate",
            option: searchPageData?.customer_rate?.map((element, index) => {
                return {
                    label:` ${element.vendor_rate_name}`,
                    value: element.id,
                    customer_id: element.customer_id
                };
            }),
            icon: <DateRange className={iconCss} />
        },
        {
            type: "option",
            name: "country_code",
            placeholder: "Please Select Country",
            label: "Please Select Country",
            icon: <DateRange className={iconCss} />
        }
    ];

    return (
        <SearchPage title={"Search Vendor Rate"} search_page_arr={search_invoice_arr} route_page={"display-vendor-rate"} />
    )
}

export default SearchVendorRate