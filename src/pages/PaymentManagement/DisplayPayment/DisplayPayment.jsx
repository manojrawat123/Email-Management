import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import display_payment_arr from './DisplayPaymentArr';


const DisplayPayment = () => {

    const location = useLocation();
    const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());

    const {
        getAllPaymentsFunc,
        paymentObj
    } = useContext(DataContext);

    useEffect(() => {
        getAllPaymentsFunc(queryParams);
    }, []);

    if (!paymentObj) {
        return <Loading />
    }

    return (
        <div>
            <CustomTabel
                getFunc={getAllPaymentsFunc}
                tabelObj={paymentObj}
                topTableHeading={display_payment_arr}
                key={1}
                EditModal={CustomEditModal}
                url_route={"payment"}
                title={"Payment Detail"}
                query={queryParams}
            />
        </div>
    )

}

export default DisplayPayment
