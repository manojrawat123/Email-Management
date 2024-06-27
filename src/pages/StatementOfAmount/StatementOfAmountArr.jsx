import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const statement_of_amount_arr = [
    {
        'type': 'text',
        'id': 'customer_id',
        'name': 'customer_name',
        'required': false,
        'display' : true,
        'placeholder': 'Select Customer',
        'label': 'Customer',
        'icon': <PersonIcon className={iconCss} />
    },
    {
        'type': 'date',
        'id': 'invoice_amount_out',
        'name': 'invoice_amount_out',
        'display': true,
        'placeholder': 'Customer Invoice',
        'label': 'Customer Invoice', 
        'icon': <Phone className={iconCss} />
    },
    {
        'type': 'option',
        'id': 'invoice_amount_in',
        'name': 'invoice_amount_in',
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
        'placeholder': 'Vendor Invoice',
        'label': 'Vendor Invoice',
        'icon': <Factory className={iconCss} />
    },
    
    {
        'type' : 'number',
        'id' : 'dispute_amount_in',
        'name' : 'dispute_amount_in',
        'display' : true,
        'label' : 'Customer Dispute',
        'placeholder' : 'Customer Dispute',
        'icon' : <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'dispute_amount_out',
        'name': 'dispute_amount_out',
        'required': true,
        'display': true,
        'label': 'Vendor Dispute',
        'placeholder': 'Vendor Dispute',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'payment',
        'name': 'payment_in',
        'required': true,
        'display': true,
        'label': 'Customer Payment',
        'placeholder': 'Customer Payment',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'payment',
        'name': 'payment_out',
        'required': true,
        'display': true,
        'label': 'Vendor Payment ',
        'placeholder': 'Vendor Payment',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'bank_charges',
        'name': 'bank_charges_in',
        'required': true,
        'display': true,
        'label': 'Customer Bank Charges ',
        'placeholder': 'Customer Bank Charges',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'bank_charges_out',
        'name': 'bank_charges_out',
        'required': true,
        'display': true,
        'label': 'Vendor Bank Charge',
        'placeholder': 'Customer Bank Charge',
        'icon': <Email className={iconCss} />
    },
    {
        'type': 'number',
        'id': 'total_sum',
        'name': 'total_sum',
        'required': true,
        'display': true,
        'label': 'Final Balance',
        'placeholder': 'Final Balance',
        'icon': <Email className={iconCss} />
    },
]


export default statement_of_amount_arr;