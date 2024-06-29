import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const customerFieldsArr = [
    {
        'type': 'text',
        'id': 'CustomerName',
        'name': 'customer_name',
        'required': true,
        'placeholder': 'Customer Name',
        'icon' : <PersonIcon className={iconCss}/>
    },
    // {
    //     'type': 'text',
    //     'id': 'CompanyName',
    //     'name': 'company_name',
    //     'required': true,
    //     'placeholder': 'Company Name',
    //     'icon' : <Factory className={iconCss}/>
    // },
    {
        'type': 'dynamicoption',
        'id': 'Country Code',
        'name': 'country_code',
        'required': true,
        'placeholder': 'Country Code',
        'icon' : <ContactMailIcon className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'CompanyPhone',
        'name': 'company_phone',
        'required': true,
        'placeholder': 'Company Phone',
        'icon' : <Phone className={iconCss}/>
    },
    {
        'type': 'email',
        'id': 'RatesEmail',
        'name': 'rates_email',
        'required': true,
        'placeholder': 'Rates Email',
        'icon' : <Email className={iconCss}/>        
    },
    {
        'type': 'email',
        'id': 'BillingEmail',
        'name': 'billing_email',
        'required': true,
        'placeholder': 'Billing Email',
        'icon' : <Email className={iconCss}/>
    },
    {
        'type': 'email',
        'id': 'LegalEmail',
        'name': 'legal_email',
        'required': true,
        'placeholder': 'Legal Email',
        'icon' : <Email className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'ManagerName',
        'name': 'manager_name',
        'required': true,
        'placeholder': 'Manager Name',
        'icon' : <SupervisorAccountIcon className={iconCss}/>
    },
    {
        'type': 'email',
        'id': 'ManagerEmail',
        'name': 'manager_email',
        'required': true,
        'placeholder': 'Manager Email',
        'icon' : <ContactMailIcon className={iconCss}/>
    },
    {
        'type': 'dynamicoption',
        'id': 'Manager Country Code',
        'name': 'manager_phone_country_code',
        'required': true,
        'placeholder': 'Manager Country Code',
        'icon' : <ContactMailIcon className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'ManagerPhone',
        'name': 'manager_phone',
        'minLength' : 7,
        'maxLength' : 20,
        'required': true,
        'placeholder': 'Manager Phone',
        'icon' :  <Phone className={iconCss}/>
    },
]

export default customerFieldsArr;