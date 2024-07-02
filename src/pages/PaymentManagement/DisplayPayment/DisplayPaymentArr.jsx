import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
// import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonIcon from '@mui/icons-material/Person';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const display_payment_arr = [
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
        'id': 'payment_type',
        'name': 'payment_type',
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
        'placeholder': 'Payment Type',
        'label': 'Payment Type',
        'icon': <Factory className={iconCss} />
    },
    {
        'type': 'date',
        'id': 'payment_date',
        'name': 'payment_date',
        'required': true,
        'display': true,
        'placeholder': 'Payment Date',
        'label': 'Payment Date',
        'icon': <Phone className={iconCss} />
    },
    {
        'type' : 'number',
        'id' : 'payment_amount',
        'name' : 'payment_amount',
        'required' : true,
        'display' : true,
        'label' : 'Payment Amount',
        'placeholder' : 'Payment Amount',
        'icon' : <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'bank_charges',
        'name': 'bank_charges',
        'required': true,
        'display': true,
        'label': 'Bank Charges',
        'placeholder': 'Bank Charges',
        'icon': <Email className={iconCss} />
    },
    // {
    //     'type': 'number',
    //     'id': 'other_charges',
    //     'name': 'other_charges',
    //     'required': true,
    //     'display': true,
    //     'label': 'Enter Invoice Amount',
    //     'placeholder': 'Enter Invoice Amount',
    //     'icon': <Email className={iconCss} />
    // },
    {
        label: "Action",
        placeholder: "Action",
        required: false,
        display : true,
    }
]

export default display_payment_arr;