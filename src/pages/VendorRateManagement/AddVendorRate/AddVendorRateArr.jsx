import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const addVendorRateArr = [
    {
        'type': 'dynamicoption',
        'id': 'CustomerName',
        'name': 'customer_id',
        'required': true,
        'placeholder': 'Customer Name',
        'icon' : <PersonIcon className={iconCss}/>
    },
    {
        'type': 'dynamicoption',
        'id': 'vendor_rate_id',
        'name': 'vendor_rate_id',
        'required': true,
        'placeholder': 'Vendor Rate',
        'icon' : <Factory className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'Country Code',
        'name': 'country_code',
        'required': true,
        'placeholder': 'Country Code',
        'icon' : <ContactMailIcon className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'country_name',
        'name': 'country_name',
        'required': true,
        'placeholder': 'Country Name',
        'icon' : <Phone className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'rate',
        'name': 'rate',
        'required': true,
        'placeholder': 'Rate',
        'icon' : <Email className={iconCss}/>        
    },
    {
        'type': 'number',
        'id': 'billing_increment_1',
        'name': 'billing_increment_1',
        'required': true,
        'placeholder': 'Billing Increment 1',
        'icon' : <Email className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'billing_increment_n',
        'name': 'billing_increment_n',
        'required': true,
        'placeholder': 'Billing Increment N',
        'icon' : <Email className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'rate_status',
        'name': 'rate_status',
        'required': true,
        'placeholder': 'Rate Status',
        'icon' : <SupervisorAccountIcon className={iconCss}/>
    },
    {
        'type': 'date',
        'id': 'effective_date',
        'name': 'effective_date',
        'required': true,
        'placeholder': 'Effective Date',
        'icon' : <ContactMailIcon className={iconCss}/>
    }
]

export default addVendorRateArr;