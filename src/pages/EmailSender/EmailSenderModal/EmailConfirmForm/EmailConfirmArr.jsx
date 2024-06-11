const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';

const emailConfirmArr = [
    {
        "type" : "text",
        "required" : true,
        "id" : "subject",
        "name" : "subject",
        "placeholder" : "Subject", 
        "icon" : <SellIcon className={iconCss}/>
    },
    {
        "type" : "text",
        "required" : true,
        "name" : "body",
        "id" : "body",
        "placeholder" : "Body",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "select",
        "required" : true,
        "placeholder" : "To",
        "id" : "to",
        "name" : "to",
    }
]

export default emailConfirmArr;