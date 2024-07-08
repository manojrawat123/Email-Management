import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomForms from '../../../CommonComponent/CutomForms/CustomForms';
import addDisputeArr from './AddDisputeArr';

const AddDispute = () => {

    const { getDisputePageFunc,
        disputePageObj } = useContext(DataContext);

    useEffect(() => {
        getDisputePageFunc();
    }, []);

    if (!disputePageObj) {
        return <Loading />
    }

    const updateDusputeArr = addDisputeArr.map((element, index) => {
        if (element.type == "dynamicoption") {
            if (element.name == "customer_id") {
                element["option"] = disputePageObj?.customer?.map((customer, index) => {
                    return {
                        label: customer.customer_name,
                        value: customer.id
                    }
                });
            }
            if (element.name == "invoice_number") {
                element["option"] = disputePageObj?.invoice?.map((el_invoice) => {
                    return {
                        label: `${el_invoice.invoice_number} - amount (${el_invoice.invoice_amount})`,
                        value: el_invoice.id,
                        customer_id: el_invoice.customer_id,
                        invoice_type: el_invoice.invoice_type,
                        invoice_amount: el_invoice.invoice_amount
                    }
                });
            }
        }
        return element;
    })

    return (
        <CustomForms fieldsArr={updateDusputeArr} route_name={"dispute"} title={"Add Dispute"} pageFunc={getDisputePageFunc} />
    )
}

export default AddDispute
