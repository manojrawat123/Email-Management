import React from 'react'
import inputRegisterArr from './RegisterArr'
import CustomForms from '../../CommonComponent/CutomForms/CustomForms'

const Register = () => {

  return (
    <CustomForms fieldsArr={inputRegisterArr} route_name={"register"} title={"Add Company"}/>
  )
}

export default Register
