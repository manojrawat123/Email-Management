import React from 'react';
import LockIcon from "@mui/icons-material/Lock";
import CustomForms from '../../CommonComponent/CutomForms/CustomForms';
import CustomFormsPut from '../../CommonComponent/CustomFormPut/CustomFormPut';

const ChangePassword = () => {

    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700`;
    
    const changePasswordArr = [
        {
            'type': 'password',
            'id': 'password',
            'name': 'password',
            'required': true,
            'placeholder': 'New Password',
            'icon' : <LockIcon className={iconCss} />
        },
        {
            'type': 'password',
            'id': 'New Password',
            'name': 'password2',
            'required': true,
            'placeholder': 'New Password',
            'icon' : <LockIcon className={iconCss} />
        },
    ]
  return (
    <div>
      <CustomFormsPut fieldsArr={changePasswordArr} route_name={"myuser"} title={"Change Password"}/>
    </div>
  )
}

export default ChangePassword
