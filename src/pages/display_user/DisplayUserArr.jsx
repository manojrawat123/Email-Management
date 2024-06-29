import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import FirstNameIcon from "@mui/icons-material/Person";
import LastNameIcon from "@mui/icons-material/Person";

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const display_user_arr = [
    {
        label: "Name",
        placeholder: "Name",
        name: "user_name",
        display : true,
        required: true,
        // value: "Default",
        icon: <PersonIcon className={iconCss} />
    },
    {
        label: "Company Name",
        placeholder: "Company Name",
        name: "company_name",
        display : true,
        required: true,
        // value: "Default",
        icon: <PersonIcon className={iconCss} />
    },
    {
        label: "Company Phone",
        placeholder: "Enter Company Phone Number",
        required: true,
        display : true,
        // value: "Default",
        name: "company_phone",
        icon: <FirstNameIcon className={iconCss} />
    },
    {
        label: "Company Email",
        placeholder: "Enter Company Email",
        type : "text",
        required: true,
        display : true,
        // value: "Default",
        name: "email",
        icon: <LastNameIcon className={iconCss} />
    },
    {
        label: "Email",
        type : "email",
        placeholder: "Email",
        required: true,
        display : true,
        // value: "Default",
        name: "email",
        icon: <EmailIcon className={iconCss} />
    },
    {
        label: "Password",
        type : "password",
        placeholder: "Password",
        required: true,
        display : false,
        // value: "Default",
        name: "password",
        icon: <EmailIcon className={iconCss} />
    },
    // {
    //     label: "Confirm Password",
    //     type : "password",
    //     placeholder: "Confirm Password",
    //     required: true,
    //     display : false,
    //     // value: "Default",
    //     name: "password2",
    //     icon: <EmailIcon className={iconCss} />
    // },
    {
        label: "Action",
        placeholder: "Action",
        // value: "Default",
        required: false,
        display : true,
    }

];

export default display_user_arr;