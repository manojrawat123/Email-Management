import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import FirstNameIcon from "@mui/icons-material/Person";
import LastNameIcon from "@mui/icons-material/Person";

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

const display_user_arr = [
    {
        label: "User Name",
        placeholder: "User Name",
        name: "username",
        display : true,
        required: true,
        // value: "Default",
        icon: <PersonIcon className={iconCss} />
    },
    {
        label: "First Name",
        placeholder: "First Name",
        required: true,
        display : true,
        // value: "Default",
        name: "first_name",
        icon: <FirstNameIcon className={iconCss} />
    },
    {
        label: "Last Name",
        placeholder: "Last Name",
        type : "text",
        required: true,
        display : true,
        // value: "Default",
        name: "last_name",
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
    {
        label: "Action",
        placeholder: "Action",
        // value: "Default",
        required: false,
        display : true,
    }

];

export default display_user_arr;