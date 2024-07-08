import React, { useContext, useEffect } from 'react'
import { DateRange, Person } from '@mui/icons-material';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import { DataContext } from '../../../context'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchVendorRateByCountryCode = () => {

    const {
        searchPageOptionGetFunc,
        searchPageData
    } = useContext(DataContext);

    useEffect(() => {
        searchPageOptionGetFunc("all_country");
    }, []);


    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    if (!searchPageData) {
        console.log(searchPageData);
        return <Loading />
    }


    const search_invoice_arr = [
        {
            type: "option",
            name: "country_codes",
            placeholder: "Please Select Country",
            label: "Select Country",
            icon: <DateRange className={iconCss} />,
            option : searchPageData?.country?.map((element, index) => {
                return {
                    label:` ${element}`,
                    value: element
                };
            })
        }
    ];

    return (
        <SearchPage title={"Search Vendor Rate"} search_page_arr={search_invoice_arr} route_page={"display-vendor-rate-country"} />
    )
}

export default SearchVendorRateByCountryCode;