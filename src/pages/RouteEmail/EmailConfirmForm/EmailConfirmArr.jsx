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
        "name" : "signatures",
        "id" : "signatures",
        "placeholder" : "Signature",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "textarea",
        "required" : true,
        "name" : "template_body_before",
        "id" : "template_body_before",
        "placeholder" : "Message Before Top Routes",
        "icon" : <ListIcon className={iconCss}/>
    },
    {
        "type" : "textarea",
        "required" : true,
        "name" : "template_body_after",
        "id" : "template_body_after",
        "placeholder" : "Message After Top Routes",
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