import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayVendorRateArr from './DisplayVendorRateArr';


const DisplayVendorRate = () => {

    const { getVendorRateSearchFunction, filterRate } = useContext(DataContext);
    const location = useLocation();
    const query = Object.fromEntries(new URLSearchParams(location.search).entries());
    
    useEffect(() => {
        getVendorRateSearchFunction(query);
    }, []);

    if (!filterRate){
        return <Loading />
    }

    console.log(filterRate);

    return (
        <div>
            <CustomTabel 
                getFunc={getVendorRateSearchFunction} 
                tabelObj={filterRate} 
                topTableHeading={displayVendorRateArr}
                key={1}
                EditModal={CustomEditModal}
                title={"Vendor Rate Search Result"}
                url_route={"vendorratesearch"} 
                query={query}
        />
        </div>
    )
}

export default DisplayVendorRate
