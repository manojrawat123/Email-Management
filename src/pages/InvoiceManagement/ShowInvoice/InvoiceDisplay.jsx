import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import invoice_display_arr from './InvoiceDisplayArr';


const InvoiceDisplay = () => {

    const location = useLocation();
    const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());

    const {
        getAllInvoiceFunc,
      invoiceObj
    } = useContext(DataContext);    

    useEffect(() => {
        getAllInvoiceFunc(queryParams);
    }, []);

    if (!invoiceObj){
        return <Loading />
    }

    return (
        <div>
            <CustomTabel
                getFunc={getAllInvoiceFunc} 
                tabelObj={invoiceObj} 
                topTableHeading={invoice_display_arr}
                key={1}
                EditModal={CustomEditModal}
                url_route={"getinvoices"}
                title={"Invoice Detail"}
                query={queryParams}
        />
        </div>
    )

}

export default InvoiceDisplay
