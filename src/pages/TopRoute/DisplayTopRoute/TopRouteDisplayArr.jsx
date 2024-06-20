import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const topRouteTabelArr = [
    {
        placeholder: "Route",
        label: "Route",
        name: "top_route_name",
        required: false,
        icon: <SellIcon className={iconCss} />
    },
    {
        placeholder: "Destination",
        label: "Destination",
        name: "destination",
        // required: true,
        display : true,
        icon: <SellIcon className={iconCss} />
    },
    {
        placeholder: "Profile",
        label: "Profile",
        name: "profile",
        required: true,
        icon: <SellIcon className={iconCss} />
    },
    {
        placeholder: "Rate",
        label: "Rate",
        name: "rate",
        required: true,
        icon: <ListIcon className={iconCss} />
    },
    {
        placeholder : "ASR", 
        label : "ASR", 
        name : "asr",
         required : true,
         icon : <VpnKeyIcon className={iconCss} />
    },
    {
        placeholder : "ACD", 
        label : "ACD", 
        name : "acd",
         required : true,
        icon : <InsertDriveFileIcon className={iconCss} />
    },
    {
        placeholder : "Increment", 
        label : "Increment", 
        name : "increment", 
        required : true,
        icon : <RadioButtonUncheckedIcon className={iconCss} />
    },
    {
        label: "Action",
        placeholder: "Action",
        // value: "Default",
        required: false,
        display : true,
    }
]

export default topRouteTabelArr;