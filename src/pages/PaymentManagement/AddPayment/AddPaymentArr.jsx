import { Email } from "@mui/icons-material";
import { Money } from "@mui/icons-material";
import { DateRange } from "@mui/icons-material";
import { AccountBalance } from "@mui/icons-material";
import { Description } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import { Payment } from "@mui/icons-material";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const addPaymentArr = [
    {
        'type': 'dynamicoption',
        'id': 'customer_id',
        'name': 'customer_id',
        'required': true,
        'placeholder': 'Enter Customer ID',
        'icon' : <AccountCircle className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'payment_type',
        'name': 'payment_type',
        'required': true,
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
        'placeholder': 'Select Payment Type',
        'icon' : <Payment className={iconCss}/>
    },
    {
        'type': 'date',
        'id': 'payment_date',
        'name': 'payment_date',
        'required': true,
        'placeholder': 'Enter Payment Date',
        'icon' : <DateRange className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'payment_amount',
        'name': 'payment_amount',
        'required': true,
        'placeholder': 'Enter Payment Amount',
        'icon' : <Money className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'bank_charges',
        'name': 'bank_charges',
        'required': true,
        'placeholder': 'Enter Bank Charges',
        'icon' : <AccountBalance className={iconCss}/>
    },
    {
        'type': 'number',
        'id': 'other_charges',
        'name': 'other_charges',
        'required': true,
        'placeholder': 'Enter Other Charges',
        'icon' : <AccountBalance className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'payment_mode',
        'name': 'payment_mode',
        'required': true,
        'option' : [
            {
                value : "CASH",
                label : "Cash"
            },
            {
                value : "CARD",
                label : "Card"
            },
            {
                value : "ONLINE",
                label : "Online"
            }
        ],
        'placeholder': 'Select Payment Mode',
        'icon' : <Payment className={iconCss}/>
    },
    {
        'type': 'textarea',
        'id': 'description',
        'name': 'description',
        'required': true,
        'placeholder': 'Enter Description',
        'icon' : <Description className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'status',
        'name': 'status',
        'required': true,
        'option' : [
            {
                value : "PENDING",
                label : "Pending"
            },
            {
                value : "COMPLETED",
                label : "Completed"
            },
            {
                value : "FAILED",
                label : "Failed"
            }
        ],
        'placeholder': 'Select Status',
        'icon' : <SupervisorAccountIcon className={iconCss}/>
    }
]

export default addPaymentArr;
