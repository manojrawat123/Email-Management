import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Folder, Phone, PhoneAndroid } from '@mui/icons-material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const vendor_rate_arr = [
    {
        'type': 'option',
        'id': 'customer_id',
        'name': 'customer_id',
        'required': true,
        'placeholder': 'Please Select Customer',
        'icon' : <PersonIcon className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'vendor_rate_name',
        'name': 'vendor_rate_name',
        'required': true,
        'placeholder': 'Vendor Rate name',
        'icon' : <SellIcon className={iconCss}/>
    },
    {
        'type': 'text',
        'id': 'vendor_prefix',
        'name': 'vendor_prefix',
        'required': true,
        'placeholder': 'Vendor prefix',
        'icon' : <VpnKeyIcon className={iconCss}/>
    },
    {
        'type': 'option',
        'id': 'vendor_rate_profile',
        'name': 'vendor_rate_profile',
        'required': true,
        'placeholder': 'Vendor Rate Profile',
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

export default vendor_rate_arr;