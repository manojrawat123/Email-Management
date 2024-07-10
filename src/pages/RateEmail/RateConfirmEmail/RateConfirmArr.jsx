const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

import { Person } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import SellIcon from '@mui/icons-material/Sell';

const rateEmailConfirmArr = [
    {
        "type" : "text",
        "required" : true,
        "id" : "subject",
        "name" : "subject",
        "placeholder" : "Subject", 
        "icon" : <SellIcon className={iconCss}/>
    },
    
    {
        "type" : "option",
        "required" : true,
        "name" : "rate_name",
        "id" : "rate_name",
        "placeholder" : "Rate Sheet Name",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "text",
        "required" : true,
        "name" : "signatures",
        "id" : "signatures",
        "placeholder" : "Signature",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "select",
        "required" : true,
        "name" : "country",
        "id" : "country",
        "placeholder" : "Selected Country",
        // "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "option",
        "required" : true,
        "placeholder" : "To",
        "id" : "customer_name",
        "name" : "customer_name",
        "readOnly" : true,
        "icon" : <Person className={iconCss} />
    },
    {
        "type" : "text",
        "required" : true,
        "name" : "template_body_before",
        "id" : "template_body_before",
        "placeholder" : "Inital Message",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "text",
        "required" : true,
        "name" : "template_body_after",
        "id" : "template_body_after",
        "placeholder" : "End Message",
        "icon" : <ListIcon className={iconCss}/>
    },
]

export default rateEmailConfirmArr;