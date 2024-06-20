import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { InsertComment } from '@mui/icons-material';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const topTableHeading = [
    {
        label: "Destination",
        placeholder: "Destination",
        name: "country_name",
        display : true,
        // required: true,
        // value: "Default",
        icon: <SellIcon className={iconCss} />
    },
    {
        label: "Codes",
        placeholder: "Codes",
        // required: true,
        display : true,
        // value: "Default",
        name: "country_code",
        icon: <ListIcon className={iconCss} />

    },
    {
        label: "Rate",
        placeholder: "Rate",
        required: true,
        display : true,
        // value: "Default",
        name: "rate",
        icon: <VpnKeyIcon className={iconCss} />

    },
    {
        label: "Status",
        placeholder: "Status",
        required: true,
        display : true,
        // value: "Default",
        name: "rate_status",
        icon: <RadioButtonUncheckedIcon className={iconCss} />
    },
    {
        label: "Effective Date",
        placeholder: "Effective Date",
        required: true,
        display : true,
        // value: "Default",
        name: "effective_date",
        icon: <InsertDriveFileIcon className={iconCss} />

    },
    {
        label: "Increment",
        placeholder: "Increment",
        // value: "Default",
        display : true,
        required: false,
        name: "billing_increment_1"
    },
    {
        label: "Billing Increment 1",
        placeholder: "Billing Increment 1",
        // value: "Default",
        display : false,
        required: true,
        name: "billing_increment_1",
        icon: <InsertComment className={iconCss} />
    },
    {
        label: "Billing Increment n",
        placeholder: "Billing Increment n",
        // value: "Default",
        required: true,
        display : false,
        name: "billing_increment_n",
        icon: <InsertComment className={iconCss} />

    },
    {
        label: "Action",
        placeholder: "Action",
        // value: "Default",
        required: false,
        display : true,
    }
];

export default topTableHeading;