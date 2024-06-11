import PersonIcon from "@mui/icons-material/Person";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SellIcon from '@mui/icons-material/Sell';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const updateRateArr = [
    {
        "type" : "dynamicoption",
        "placeholder" : "Select Customer",
        "id" : "customer", 
        "name" : "customer",
        'icon' :  <PersonIcon className={iconCss}/>
    },
    {
        "type" : "dynamicoption",
        "placeholder" : "Select Customer Rate",
        "id" : "rate", 
        "name" : "rate",
        "icon" :  <SellIcon className={iconCss}/>
    },
    {
        'type': 'file',
        'id': 'excel_sheet',
        'name': 'excel_sheet',
        'required': false,
        'placeholder': 'Select Data',
        "icon" : <InsertDriveFileIcon className={iconCss}/>
    },
]

export default updateRateArr;