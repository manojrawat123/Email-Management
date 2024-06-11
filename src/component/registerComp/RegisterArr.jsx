import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import FirstNameIcon from "@mui/icons-material/Person";
import LastNameIcon from "@mui/icons-material/Person";

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700`;

const inputRegisterArr = [
  {
    type: "text",
    id: "username",
    name: "username",
    required: true,
    placeholder: "Enter your Username",
    icon: <PersonIcon className={iconCss} />
  },
  {
    type: "password",
    id: "password",
    name: "password",
    required: true,
    placeholder: "Enter Your Password",
    icon: <LockIcon className={iconCss} />
  },
  {
    type: "email",
    id: "email",
    name: "email",
    required: true,
    placeholder: "Enter your Email",
    icon: <EmailIcon className={iconCss} />
  },
  {
    type: "text",
    id: "first_name",
    name: "first_name",
    label: "First Name",
    required: true, 
    placeholder: "Enter your First Name",
    icon: <FirstNameIcon className={iconCss} />
  },
  {
    type: "text",
    id: "last_name",
    name: "last_name",
    required: true, 
    label: "Last Name",
    placeholder: "Enter your Last Name",
    icon: <LastNameIcon className={iconCss} />
  }
];

export default inputRegisterArr;