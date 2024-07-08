import React, { useContext, useEffect } from 'react'
import { DateRange, Person } from '@mui/icons-material';
import SearchPage from '../../../CommonComponent/SearchPage/SearchPage';
import { DataContext } from '../../../context'
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const SearchRatePage = () => {
    const {
        searchPageOptionGetFunc,
        searchPageData
    } = useContext(DataContext);

    useEffect(() => {
        searchPageOptionGetFunc("rate_page")
    }, []);


    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;
    
    if (!searchPageData) {
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
            placeholder: "Please Select Customer Rate",
            label: "Please Select Customer",
            option: searchPageData?.customer_rate?.map((element, index) => {
                return {
                    label : element.rate_name,
                    value : element.id,
                    customer_id : element.customer_id
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
        <SearchPage title={"Search Rate"} search_page_arr={search_invoice_arr} route_page={"display-rate"} />
    )
}

export default SearchRatePage










// import React, { useContext, useEffect, useState } from 'react';
// import Select from "react-select";
// import { DataContext } from '../../../context';
// import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
// import { useNavigate } from 'react-router-dom';

// const SearchRatePage = () => {

//     const navigate = useNavigate();
//     const [searchValue1, setSearchValue1] = useState();
//     const page_title = "Search Rate Page";

//     useEffect(() => {
//         searchPageOptionGetFunc("rate_page")
//     }, []);

//     if (!searchPageData) {
//         return <Loading />
//     }
//     return (
//         <div className="h-[70vh] flex items-center justify-center bg-gray-100">
//             <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
//                 <h1 className="text-3xl font-bold mb-6 text-center">{page_title}</h1>
//                 <Select
//                     type="text"
//                     placeholder={'Search Rate By Country'}
//                     isSearchable
//                     options={searchPageData.options}
//                     value={searchValue1}
//                     onChange={(e) => {
//                         console.log(e.value)
//                         setSearchValue1(e.value);
//                         navigate(`/rate?search=${e.value}`);
//                     }}
//                     styles={{
//                         control: (provided, state) => ({
//                             ...provided,
//                             height: 50, // Customize the height
//                             minHeight: 50, // Ensure the control has a minimum height
//                         }),
//                         input: (provided, state) => ({
//                             ...provided,
//                             height: 'auto', // Adjust the input field height as needed
//                         }),
//                         placeholder: (provided, state) => ({
//                             ...provided,
//                             fontSize: '16px', // Customize the font size of the placeholder
//                         }),
//                     }}
//                 //   className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//             </div>
//         </div>
//     );
// };

// export default SearchRatePage;
