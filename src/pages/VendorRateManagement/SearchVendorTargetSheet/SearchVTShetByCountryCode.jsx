import React, { useContext, useEffect } from 'react'
import { Code, DateRange, Person } from '@mui/icons-material';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import { DataContext } from '../../../context'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchVendorTargetSheetByCountryCode = () => {

    // const {
    //     searchPageOptionGetFunc,
    //     searchPageData
    // } = useContext(DataContext);

    // useEffect(() => {
    //     searchPageOptionGetFunc("country_code");
    // }, []);


    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    
    // if (!searchPageData) {
    //     return <Loading />
    // }

    // console.log(searchPageData);


    const search_invoice_arr = [
        {
            type: "text",
            name: "country_code",
            placeholder: "Please Select Country Code",
            label: "Select Country",
            icon: <Code className={iconCss} />,
            // option: searchPageData.country_code?.map((el)=>{
            //     return {
            //         value : el,
            //         label : el
            //     }
            // })
        }
    ];

    return (
        <SearchPage title={"Search Vendor Target Rate Sheet By Country Code"} search_page_arr={search_invoice_arr} route_page={"display-vendor-target-sheet"} country_code_pg={true} />
    )
}

export default SearchVendorTargetSheetByCountryCode;
