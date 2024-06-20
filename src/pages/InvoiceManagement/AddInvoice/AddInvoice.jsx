import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomForms from '../../../CommonComponent/CutomForms/CustomForms';
import addInvoiceArr from './AddInvoiceArr';

const AddInvoice = () => {

    const { getCustomerFunction, customerObject } = useContext(DataContext);

    useEffect(()=>{
        getCustomerFunction();
    },[])

    if (!customerObject){
        return <Loading />
    }

    const updatedInvoiceArr = addInvoiceArr.map((element, index)=>{
        if (element.type == "dynamicoption"){
            element["option"] = customerObject?.map((customer, index)=>{
                return {
                    label : customer.customer_name,
                    value : customer.id
                }
            }) 
        }
        return element;
    })

  return (
    <CustomForms fieldsArr={updatedInvoiceArr} route_name={"invoices"} title={"Add Invoice"} />
  )
}

export default AddInvoice
