import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import FirstNameIcon from "@mui/icons-material/Person";
import LastNameIcon from "@mui/icons-material/Person";

const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700`;

const inputRegisterArr = [
  {
    type: "text",
    id: "user_name",
    name: "user_name",
    required: true,
    placeholder: "Enter your Username",
    icon: <PersonIcon className={iconCss} />
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
    type: "number",
    id: "company_phone",
    name: "company_phone",
    label: "Company Phone",
    required: true, 
    placeholder: "Enter your Company Phone",
    icon: <FirstNameIcon className={iconCss} />
  },
  {
    type: "text",
    id: "company_address",
    name: "company_address",
    required: true, 
    label: "Company Address",
    placeholder: "Enter your Company Address",
    icon: <LastNameIcon className={iconCss} />
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
    type: "password",
    id: "password2",
    name: "password2",
    required: true,
    placeholder: "Confirm Your Password",
    icon: <LockIcon className={iconCss} />
  },
];

export default inputRegisterArr;