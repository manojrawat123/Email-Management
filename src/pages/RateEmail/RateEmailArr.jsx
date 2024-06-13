// {
//     'type': 'number',
//     'id': 'CompanyPhone',
//     'name': 'company_phone',
//     'required': true,
//     'placeholder': 'Enter Company Phone',
//     'icon' : <Phone className={iconCss}/>
// },

import { Label, NatureOutlined, Person, VpnKey } from "@mui/icons-material";
import { List } from "@mui/material";

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const rate_email_arr = [
    {
        name: "template_id",
        type: "dynamic_option",
        id: "template_id",
        required: true,
        option : [],
        placeholder: 'Select Template',
        icon: <VpnKey className={iconCss} />
    },
    {
        name: "customer_id",
        type: "dynamic_option",
        id: "customer_id",
        required: true,
        option : [],
        placeholder: 'Select Customer',
        icon: <Person className={iconCss} />
    },
    {
        name: "rate_id",
        type: "dynamic_option",
        option : [],
        id: "rate_id",
        required: true,
        placeholder: "Select Rate",
        icon: <Label className={iconCss} />
    },
    {
        name: "country",
        type: "dynamic_select",
        option : [],
        id: "country",
        // required: true,
        placeholder: "Select Country",
        // icon: <NatureOutlined className={iconCss} />
    },
];

export default rate_email_arr;