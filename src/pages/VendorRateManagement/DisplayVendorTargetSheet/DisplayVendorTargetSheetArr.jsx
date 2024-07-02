import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const displayVendorTargetSheetArr = [
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
        label: "Suggested Sell",
        placeholder: "Suggested Sell",
        // required: true,
        display : true,
        // value: "Default",
        name: "suggested_sell",
        icon: <ListIcon className={iconCss} />
    },
    {
        label: "Suggested Buy",
        placeholder: "Suggested Buy",
        // required: true,
        display : true,
        // value: "Default",
        name: "suggested_buy",
        icon: <ListIcon className={iconCss} />
    },
];

export default displayVendorTargetSheetArr;