import React, { useContext, useState } from 'react';
import { CircularProgress } from '@mui/material';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import inputLoginArr from './loginInpArr';
import { ToastContainer, toast } from 'react-toastify';
// import SignUpMd from '../../Navbar/SignUpOpMd/SignUpMd';
// import ForgotPasswordForm from '../ForgotPassword/ForgotPassword';
// import ForgotPasswordModel from '../ForgotPassword/ForgotPasswordModel';
import ForgotPasswordModel from '../ForgotPassword/ForgotPasswordModel';
import { API_BASE_URL, API_ROUTE_URL } from '../../../config';
import { DataContext } from '../../../context';


const LoginPage = () => {

  const [loginButton, setLoginButton] = useState(false);
  const navigate = useNavigate();
  const { isValidSessionFunc } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const loginFunc = (e) => {
    e.preventDefault();
    setLoginButton(true);
    axios.post(`${API_BASE_URL}/login/`, {
      email: e.target.email.value,
      password: e.target.password.value,
      // url: API_ROUTE_URL,
    }).then((value) => {
      Cookies.set("token", value.data.access);
      const co = Cookies.get("token");
      console.log(co);
      isValidSessionFunc(true, value.data.access);
    }).catch((err) => {
      console.log(err);
      if (err?.response) {
        if (err?.response?.status == 400) {
          if (err?.response?.data?.error) {
            toast.error(err?.response?.data?.error, { position: "top-center" });
          }
          else {
            toast.error("Invalid Info", { position: "top-center" });
          }
        }
        else if (err.response.status == 401) {
          toast.error("Incorrect Password", { position: "top-center" });
        }
        else {
          toast.error("Invalid Info!");
        }
      }
      else {
        toast.error("Internal Server Error", { position: "top-center" });
      }
    }).finally(() => {
      setLoginButton(false);
    })
  }


  return (
    <>
      {forgotPassword ? <ForgotPasswordModel forgotPassword={forgotPassword} setForgotPassword={setForgotPassword} /> : null}
      <ToastContainer />
      <section className="gradient-form h-[100vh] bg-neutral-200  dark:bg-neutral-700">
        <div className=" h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 md:w-[55%] mx-auto">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800 py-20 md:py-0">
                {/* Left column container */}
                <div className="px-4 md:px-0">
                  <div className="md:mx-6 md:p-12">
                    <form onSubmit={loginFunc}>
                      {/* Username input */}
                      {inputLoginArr.map((element, index) => {
                        return (
                          <div className="relative my-4" data-te-input-wrapper-init key={index}>
                            <input
                              type={element.type}
                              id={element.id}
                              name={element.name}
                              required
                              className=" border border-gray-300 outline-none peer  block min-h-[auto] w-full pl-8 bg-transparent py-[0.32rem] leading-[1.6] transition-all duration-200 ease-linear focus:border-orange-600  focus:border rounded"
                              placeholder={element.placeholder}
                            />
                            {element.icon}
                          </div>
                        )
                      })}
                      <div className="pb-1 pt-1 text-center">
                        <button
                          className={`mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background: "black",
                          }}
                        >
                          {loginButton ? <CircularProgress size={19} color='inherit' /> : "Login"}
                        </button>
                      </div>
                      <div className=" pb-1 pt-1 text-center">
                        <button
                          // className={`mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                          className='text-blue-500 underline'
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            // background: "black",
                          }}
                          onClick={() => {
                            setForgotPassword(true);
                          }}
                        >
                          {"Forgot Password? "}
                        </button>
                      </div>
                      {/* End of Loading Button */}
                    </form>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginPage


// ${
//   selectedCategory === 0
//     ? " bg-blue-500  shadow-sm border border-white p-1 font-semibold"
//     : " bg-gray-800  border border-gray-700"
// }