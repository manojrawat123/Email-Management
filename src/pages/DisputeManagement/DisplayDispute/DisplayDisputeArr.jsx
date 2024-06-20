import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const display_dispute_arr = [
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
        'id': 'dispute_type',
        'name': 'dispute_type',
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
        'placeholder': 'Dispute Type',
        'label': 'Dispute Type',
        'icon': <Factory className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'invoice_number',
        'name': 'invoice',
        // 'required': true,
        'display': true,
        'placeholder': 'Invoice Number',
        'label': 'Invoice Number',
        'icon': <Phone className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'dispute_number',
        'name': 'dispute_number',
        // 'required': true,
        'display': true,
        'placeholder': 'Dispute Number',
        'label': 'Dispute Number',
        'icon': <Phone className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'dispute_amount',
        'name': 'dispute_amount',
        'required': true,
        'display': true,
        'label': 'Dispute Amount',
        'placeholder': 'Dispute Amount',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'textarea',
        'id': 'desc',
        'name': 'desc',
        'required': true,
        'display': true,
        'label': 'Description ',
        'placeholder': 'Dispute Description ',
        'icon': <Email className={iconCss} />
    },
    {
        label: "Action",
        placeholder: "Action",
        required: false,
        display : true,
    }
]

export default display_dispute_arr;