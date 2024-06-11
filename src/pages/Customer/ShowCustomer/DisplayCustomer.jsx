import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';

import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayCustomerHeading from './DisplayCustomerArr';


const DisplayCustomer = () => {

    const {customerObject, getCustomerFunction} = useContext(DataContext);    
    useEffect(() => {
        getCustomerFunction();
    }, []);

    if (!customerObject){
        return <Loading />
    }

    return (
        <div>
            <CustomTabel 
                getFunc={getCustomerFunction} 
                tabelObj={customerObject} 
                topTableHeading={displayCustomerHeading}
                key={1}
                EditModal={CustomEditModal}
                url_route={"customer"} 
                title={"Customer Detail"}
                // query={{ "country_name" : query }}
        />
        </div>
    )
}

export default DisplayCustomer;
