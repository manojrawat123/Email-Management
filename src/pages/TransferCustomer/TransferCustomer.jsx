import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import DynamicForm from '../../CommonComponent/DynamicForm/DynamicForm';
import CustomForms from '../../CommonComponent/CutomForms/CustomForms';
import { Email } from '@mui/icons-material';

const TransferCustomer = () => {

    const { transferCustomerPageFunc, transferCustomerPageObj } = useContext(DataContext);

    useEffect(() => {
        transferCustomerPageFunc();
    }, [])

    if (!transferCustomerPageObj) {
        return <Loading />
    }

    console.log(transferCustomerPageObj);

    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

    const transfeRCustomerArray = [
        {
            'type': 'option',
            'id': 'from_transfer_user',
            'name': 'from_transfer_user',
            'required': true,
            'option': transferCustomerPageObj?.users?.map((element, index) => {
                return {
                    value: element?.id,
                    label: `${element?.user_name}`
                }
            }),
            'placeholder': 'User',
            'icon': <Email className={iconCss} />
        },
        {
            'type': 'option',
            'id': 'transfer_customer',
            'name': 'transfer_customer',
            // 'required': true,
            'option': transferCustomerPageObj?.customer?.map((element, index) => {
                return {
                    value: element?.id,
                    label: `${element?.customer_name} - ${element?.user_id?.user_name}`,
                    userId: element?.user_id?.id
                }
            }),
            'placeholder': 'Please Select Customer',
            'icon': <Email className={iconCss} />
        },
        {
            'type': 'option',
            'id': 'transfer_user',
            'name': 'transfer_user',
            'required': true,
            'option': transferCustomerPageObj?.users?.map((element, index) => {
                return {
                    value: element?.id,
                    label: `${element?.user_name}`
                }
            }),
            'placeholder': 'Please Select Customer',
            'icon': <Email className={iconCss} />
        },
    ]

    return (
        <div>
            <CustomForms fieldsArr={transfeRCustomerArray} pageFunc={transferCustomerPageFunc} route_name={'transfercustomer'} title={"Transfer Customers"} />
        </div>
    )
}

export default TransferCustomer
