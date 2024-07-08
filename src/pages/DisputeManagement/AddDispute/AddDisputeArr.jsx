import { Email } from "@mui/icons-material";
import { Factory } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const addDisputeArr = [
    {
        'type': 'dynamicoption',
        'id': 'customer_id',
        'name': 'customer_id',
        'required': true,
        'placeholder': 'Customer Name',
        'icon' : <PersonIcon className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'dispute_type',
        'name': 'dispute_type',
        'required': true,
        'option' : [
            {
                value : "IN",
                label : "Customer"
            },
            {
                value : "OUT",
                label : "Vendor"
            }
        ],
        'placeholder': 'Dispute Type',
        'icon' : <Factory className={iconCss}/>
    },
    {
        'type': 'dynamicoption',
        'id': 'invoice_number',
        'name': 'invoice_number',
        'required': true,
        'placeholder': 'Invoice Number',
        'icon' : <PersonIcon className={iconCss}/>
    },
   
    {
        'type': 'text',
        'id': 'dispute_number',
        'name': 'dispute_number',
        'required': true,
        'placeholder': 'Dispute Number',
        'icon' : <Phone className={iconCss}/>
    },
    // {
    //     'type': 'date',
    //     'id': 'invoice_from_date',
    //     'name': 'invoice_from_date',
    //     'required': true,
    //     'placeholder': 'Invoice From Date',
    //     'icon' : <Email className={iconCss}/>        
    // },
    // {
    //     'type': 'date',
    //     'id': 'invoice_to_date',
    //     'name': 'invoice_to_date',
    //     'required': true,
    //     'placeholder': 'Invoice To Date',
    //     'icon' : <Email className={iconCss}/>
    // },
    {
        'type': 'number',
        'id': 'dispute_amount',
        'name': 'dispute_amount',
        'required': true,
        'placeholder': 'Dispute Amount',
        'icon' : <SupervisorAccountIcon className={iconCss}/>
    },
    {
        'type': 'textarea',
        'id': 'desc',
        'name': 'desc',
        'required': true,
        'placeholder': 'Description',
        'icon' : <Email className={iconCss}/>
    },

]

export default addDisputeArr;