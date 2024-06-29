import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { InsertComment, Mail } from '@mui/icons-material';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const displayCustomerHeading = [

    {
        label: "Customer Name",
        placeholder: "Customer Name",
        name: "customer_name",
        display : true,
        required: true,
        // value: "Default",
        icon: <SellIcon className={iconCss} />
    },
    {
        label: "Added By",
        placeholder: "Added By",
        required: true,
        display : true,
        // value: "Default",
        name: "added_by",
        icon: <ListIcon className={iconCss} />

    },
    {
        label: "Company Phone",
        placeholder: "Company Phone",
        type : "number",
        required: true,
        display : true,
        // value: "Default",
        name: "company_phone",
        'minLength' : 7,
        'maxLength' : 20,
        icon: <VpnKeyIcon className={iconCss} />

    },
    {
        label: "Rates Email",
        placeholder: "Rates Email",
        type : "email",
        required: true,
        display : true,
        // value: "Default",
        name: "rates_email",
        icon: <Mail className={iconCss} />
    },
    {
        label: "Billing Email",
        type : "email",
        placeholder: "Billing Email",
        required: true,
        display : false,
        // value: "Default",
        name: "billing_email",
        icon: <Mail className={iconCss} />
    },
    {
        label: "Legal Email",
        type : "email",
        placeholder: "Legal Email",
        required: true,
        display : false,
        // value: "Default",
        name: "legal_email",
        icon: <Mail className={iconCss} />
    },
    {
        label: "Manager Name",
        placeholder: "Manager Name",
        required: true,
        display : false,
        // value: "Default",
        name: "manager_name",
        icon: <RadioButtonUncheckedIcon className={iconCss} />
    },
    {
        label: "Manager Email",
        type : "email",
        placeholder: "Manager Email",
        required: true,
        display : false,
        // value: "Default",
        name: "manager_email",
        icon: <Mail className={iconCss} />
    },
    {
        label: "Manager Phone",
        type : "number",
        placeholder: "Manager Phone",
        required: true,
        'minLength' : 7,
        'maxLength' : 15,
        display : false,
        // value: "Default",
        name: "manager_phone",
        icon: <RadioButtonUncheckedIcon className={iconCss} />
    },
    {
        label: "Action",
        placeholder: "Action",
        // value: "Default",
        required: false,
        display : true,
    }

];

export default displayCustomerHeading;