import React, { useContext, useEffect, useState } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayVendorByCountryCode from './DisplayVendorByCountryCode';
import Select from "react-select";

const DisplayVendorByCountryCode = () => {

    const { getVendorRateByCountryCodeSearchFunction,
        vendorRate } = useContext(DataContext);
    const location = useLocation();
    const t_query = Object.fromEntries(new URLSearchParams(location.search).entries());
    const [query, setQuery] = useState(t_query);
    const navigate = useNavigate();

    useEffect(() => {
        getVendorRateByCountryCodeSearchFunction(query);
    }, []);

    if (!vendorRate) {
        return <Loading />
    }

    // http://localhost:5173/display-vendor-rate-by-country/?country_codes=AFGHANISTAN+MOBILE+AT
    // http://localhost:5173/display-vendor-rate-by-country/?country_codes=AFGHANISTAN%20MOBILE%20AT
    return (
        <div>
            <div className='w-full md:w-[50%] mx-auto'>

            <Select 
            options={vendorRate.country_list.map((el)=>{
                return {
                    value : el,
                    label : el
                }
            })}
            isSearchable={true}
            isClearable={true}
            onChange={(selectedOptions) => {
               const url = new URLSearchParams(
                    {"country_codes" : selectedOptions.value}
                )
                getVendorRateByCountryCodeSearchFunction(url);
                setQuery(url);
                navigate(`/display-vendor-rate-by-country/?${url}`);
            }}
            placeholder={"Search By Country"}
            required />
            </div>
            <CustomTabel
                getFunc={getVendorRateByCountryCodeSearchFunction}
                tabelObj={vendorRate.data}
                topTableHeading={displayVendorByCountryCode}
                key={1}
                EditModal={CustomEditModal}
                title={"Vendor Rate Search Result"}
                url_route={"vendorratesearch"}
                query={query}
            />
        </div>
    )
}

export default DisplayVendorByCountryCode
