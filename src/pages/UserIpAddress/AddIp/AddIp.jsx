import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomForms from '../../../CommonComponent/CutomForms/CustomForms';
import { Factory } from '@mui/icons-material';

const AddUserIpAddress = () => {

    const { getCustomerFunction, customerObject } = useContext(DataContext);

    useEffect(() => {
        getCustomerFunction();
    }, []);

    if (!customerObject) {
        return <Loading />
    }

    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

    const addUserIp = [
        {
            'type': 'option',
            'id': 'customer_id',
            'name': 'customer_id',
            'required': true,
            'placeholder': 'Customer Id',
            'option' : customerObject.map((element, index)=>{
                return {
                    label : element.customer_name,
                    value : element.id
                }
            }),
            'icon': <Factory className={iconCss} />
        },
        {
            'type': 'text',
            'id': 'ip_address',
            'name': 'ip_address',
            'required': true,
            'placeholder': 'Ip Address',
            'icon': <Factory className={iconCss} />
        },
    ]
    return (
        <div>
            <CustomForms fieldsArr={addUserIp} route_name={"userip"} title={"Add User Ip Address"} key={"munna-coder"}/>
        </div>
    )
}

export default AddUserIpAddress
