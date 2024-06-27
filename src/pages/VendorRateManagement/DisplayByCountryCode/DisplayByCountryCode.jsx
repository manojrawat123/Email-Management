import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayVendorByCountryCode from './DisplayVendorByCountryCode';


const DisplayVendorByCountryCode = () => {

    const { getVendorRateByCountryCodeSearchFunction,
        vendorRate } = useContext(DataContext);
    const location = useLocation();
    const query = Object.fromEntries(new URLSearchParams(location.search).entries());
    
    useEffect(() => {
        getVendorRateByCountryCodeSearchFunction(query);
    }, []);

    if (!vendorRate){
        return <Loading />
    }


    return (
        <div>
            <CustomTabel 
                getFunc={getVendorRateByCountryCodeSearchFunction} 
                tabelObj={vendorRate} 
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
