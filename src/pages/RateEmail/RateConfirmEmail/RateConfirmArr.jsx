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
        "type" : "text",
        "required" : true,
        "name" : "template_body_before",
        "id" : "template_body_before",
        "placeholder" : "Template Before Message",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "text",
        "required" : true,
        "name" : "template_body_after",
        "id" : "template_body_after",
        "placeholder" : "Template After Message",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "option",
        "required" : true,
        "name" : "rate_id",
        "id" : "rate_id",
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
        "id" : "customer_id",
        "name" : "customer_id",
        "readOnly" : true,
        "icon" : <Person className={iconCss} />
    }
]

export default rateEmailConfirmArr;