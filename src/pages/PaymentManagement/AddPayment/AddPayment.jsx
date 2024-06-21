import React, { useContext, useEffect } from 'react'
// import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomForms from '../../../CommonComponent/CutomForms/CustomForms';
import addPaymentArr from './AddPaymentArr';
import { DataContext } from '../../../context';

const AddPayment = () => {

    const { getCustomerFunction, activeCustomerObject } = useContext(DataContext);

    useEffect(() => {
        getCustomerFunction();
    }, [])

    if (!activeCustomerObject) {
        return <Loading />
    }

    const updatedInvoiceArr = addPaymentArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            element["option"] = activeCustomerObject?.map((customer, index) => {
                return {
                    label: customer.customer_name,
                    value: customer.id
                }
            })
        }
        return element;
    });

    return (
        <CustomForms fieldsArr={updatedInvoiceArr} route_name={"payment"} title={"Add Payment"} />
    );
}

export default AddPayment

