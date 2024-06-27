import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const invoice_display_arr = [
    {
        'type': 'dynamicoption',
        'id': 'customer_id',
        'name': 'customer_name',
        'required': false,
        'display' : true,
        'placeholder': 'Select Customer',
        'label': 'Customer',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'option',
        'id': 'invoice_type',
        'name': 'invoice_type',
        'required': true,
        'display': true,
        'option' : [
            {
                value : "IN",
                label : "In"
            },
            {
                value : "OUT",
                label : "Out"
            }
        ],
        'placeholder': 'Invoice Type',
        'label': 'Invoice Type',
        'icon': <Factory className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'invoice_number',
        'name': 'invoice_number',
        'required': true,
        'display': true,
        'placeholder': 'Invoice Number',
        'label': 'Invoice Number',
        'icon': <Phone className={iconCss} />
    },
    {
        'type' : 'date',
        'id' : 'invoice_from_date',
        'name' : 'invoice_from_date',
        'required' : true,
        'display' : true,
        'label' : 'Invoice From Date',
        'placeholder' : 'Invoice From Date',
        'icon' : <Email className={iconCss} />
    },
    {
        'type': 'date',
        'id': 'invoice_to_date',
        'name': 'invoice_to_date',
        'required': true,
        'display': true,
        'label': 'Invoice To Date',
        'placeholder': 'Invoice To Date',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'invoice_amount',
        'name': 'invoice_amount',
        'required': true,
        'display': true,
        'label': 'Invoice Amount',
        'placeholder': 'Invoice Amount',
        'icon': <Email className={iconCss} />
    },
    {
        label: "Action",
        placeholder: "Action",
        required: false,
        display : true,
    }
]

export default invoice_display_arr;