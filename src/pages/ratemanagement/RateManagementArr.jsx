import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Folder, Phone, PhoneAndroid } from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const rateArr = [
    {
        'type': 'option',
        'id': 'customer_id',
        'name': 'customer_id',
        'required': true,
        'placeholder': 'Please Select Customer',
        'icon' : <PersonIcon className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'rate_status',
        'name': 'rate_status',
        'option' : [
            {
                id : "1",
                label : "Active",
                value : "active"
            },
            {
                id : "2",
                label : "Inactive",
                value : "inactive"
            }
        ],
        'required': true,
        'placeholder': 'Select Customer Rate Status',
        'icon' : <RadioButtonUncheckedIcon className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'rate_name',
        'name': 'rate_name',
        'required': true,
        'placeholder': 'Enter rate name',
        'icon' : <SellIcon className={iconCss}/>

    },
    {
        'type': 'text',
        'id': 'customer_prefix',
        'name': 'customer_prefix',
        'required': true,
        'placeholder': 'Enter customer prefix',
        'icon' : <VpnKeyIcon className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'rate_profile',
        'name': 'rate_profile',
        'required': true,
        'placeholder': 'Select Rate Profile',
        'icon' : <ListIcon className={iconCss}/>
    },
    {
        'type': 'choice',
        'id': 'excel_sheet',
        'name': 'excel_sheet',
        'required': false,
        'placeholder': 'Select Data',
        'icon' : <InsertDriveFileIcon className={iconCss}/>
    },
];

export default rateArr;