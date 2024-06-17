import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowDropDownCircleOutlined, ChatOutlined, CloseOutlined, Cookie, Lens, Notifications, Search } from "@mui/icons-material";
import Cookies from "js-cookie";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useEffect } from "react";
import navBarArr from "./NavArr";
import NavBarIc from "../../images/icons/NavBarIc";
import UpArrowIcon from "../../images/icons/UpArrow";
import { DataContext } from "../../context";

const NavMenu = () => {
    const [mobMenuVis, setMobileVis] = useState(false);
    const { logoutFunc } = useContext(DataContext);
    const [navbarId, setNavbarId] = useState(0);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mobMenuVis) {
            document.body.style.overflow = 'auto';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
    }, [mobMenuVis]);

    return (
        <>
            <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-green-700">
                <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
                    <div className="block lg:hidden">
                        <button
                            id="nav"
                            className="flex items-center px-3 py-2 rounded text-gray-800  hover:text-gray-700 "
                        >
                            {mobMenuVis ? (
                                null
                            ) : (
                                <button onClick={() => {
                                    setMobileVis(true);
                                }}>
                                    <NavBarIc />
                                </button>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center flex-shrink-0 text-gray-800 md:mr-16 mx-auto md:mx-0">
                        <span className="font-semibold text-xl tracking-tight">
                        </span>
                    </div>
                    {/* <div className="md:hidden flex space-x-2 ">
                        {Cookies.get('token') ?
                            <>
                                <button className="text-gray-700 w-full md:w-auto px-4 py-2 font-bold"
                                    onClick={() => {
                                        navigate("/notifications");
                                    }}>
                                    <Notifications />
                                </button>
                                <button className="text-gray-700 w-full md:w-auto px-4 py-2 font-bold"
                                    onClick={() => {
                                        navigate("/chat")
                                    }}>
                                    <ChatOutlined />
                                </button>
                            </>
                            : <button
                                onClick={() => {
                                    setOpen(true);
                                    setMobileVis(false);
                                }}
                                className={`block  lg:inline-block rounded border  border-green-600  mr-2 
                }  bg-green-600 text-white lg:mt-0 w-full md:w-auto px-4 py-2 `}
                            >
                                {"Join"}
                            </button>}
                    </div> */}
                </div>
                <div className={`menu w-full lg:block lg:items-center lg:w-auto lg:px-3 px-[15%] md:static absolute top-0 bg-white   md:py-0 py-10 
  ${mobMenuVis ? "z-50 h-[100%] flex-grow transition-all duration-1000 ease-in-out -left-[10%]" : "transition-all duration-300 ease-in-out -left-full"
                    }`}>
                    <div className="absolute top-4 left-[90%] md:hidden">
                        <button>
                            <CloseOutlined
                                onClick={() => {
                                    setMobileVis(false);
                                }}
                            />
                        </button>
                    </div>
                    <div className="text-md font-bold text-gray-500 md:flex md:text-center">
                        {navBarArr?.map((element, index) => {
                            return (
                                <>
                                    <div

                                        onClick={() => {
                                            // if (window.innerWidth >= 768) {
                                            //     return;
                                            // }
                                            if (navbarId == 0) {
                                                setNavbarId(element.id);
                                            }
                                            else if (navbarId == element.id) {
                                                setNavbarId(0);
                                            }
                                            else {
                                                setNavbarId(element.id);
                                            }
                                        }}
                                        onMouseEnter={() => {

                                            if (window.innerWidth < 768) {
                                                return;
                                            }
                                            setNavbarId(element.id);
                                        }}
                                        onMouseLeave={() => {
                                            if (window.innerWidth < 768) {
                                                return
                                            }
                                            setTimeout(() => {
                                                setNavbarId(0);
                                            }, 1500);
                                        }}
                                        key={index}
                                        className={`cursor-pointer block mt-4 lg:inline-block lg:mt-0  px-4 py-2 rounded hover:text-green-600 mr-2  ${element.link == "signup" ? "lg:ml-auto" : "lg:ml-2"
                                            } ${element.link == location.pathname
                                                ? " underline text-green-600"
                                                : " "
                                            }`}
                                    >
                                        {element.option ?
                                            <>
                                                <div className="hidden md:block">{element.label}</div>
                                                <div className="flex md:hidden ">
                                                    <span className=""> {element.label}</span>
                                                    <div className="ml-auto ">{element.option ? <div className={element.id == navbarId ? "transform rotate-[180deg]" : ""}>
                                                        <UpArrowIcon />
                                                    </div>
                                                        : null}</div>
                                                </div>
                                            </>
                                            : element.label}
                                    </div>
                                    {element.option && element.id == navbarId ?
                                        <div className="relative">
                                            <div className="hidden md:block absolute right-8 top-8 z-[100] transform rotate-[180deg] bg-white">
                                                <UpArrowIcon />
                                            </div>
                                            <div className="md:absolute right-[21rem] top-11 bg-white ml-4 md:ml-0">
                                                <div className="md:fixed bg-white border rounded shadow-2xl py-4 w-full md:w-[20rem] z-50">
                                                    {element.option.map((opel, index) => {
                                                        return (
                                                            <div className="block"
                                                                onClick={() => {
                                                                    setNavbarId(0);
                                                                    setMobileVis(false);
                                                                }}
                                                            >
                                                                <NavLink
                                                                    exact
                                                                    to={opel.link}
                                                                    key={index}
                                                                    className={`block mt-4 lg:inline-block lg:mt-0  px-4 py-2 rounded hover:text-green-600  mr-2 ${opel.link == "signup" ? "lg:ml-auto" : "lg:ml-2"
                                                                        } ${opel.link == location.pathname
                                                                            ? " underline text-green-600"
                                                                            : " "
                                                                        }`}
                                                                >
                                                                    {opel.label}
                                                                </NavLink>
                                                            </div>
                                                        );
                                                    })
                                                    }
                                                </div>
                                            </div>
                                        </div> : null}
                                </>
                            )
                        })}
                    </div>
                    {Cookies.get("token") ? <div className="mx-6 md:hidden">
                        <button
                            onClick={() => {
                                logoutFunc();
                                setNavbarId(0);
                            }}
                            className={` mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                                background: "#FF0000",
                            }}> <PowerSettingsNewIcon /> Logout</button>
                    </div> : null}
                </div>
            </nav>
        </>
    );
};

export default NavMenu;
