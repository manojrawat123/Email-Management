import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CloseOutlined, Logout } from "@mui/icons-material";
import Cookies from "js-cookie";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useEffect } from "react";
import navBarArr from "./NavArr";
import NavBarIc from "../../images/icons/NavBarIc";
import UpArrowIcon from "../../images/icons/UpArrow";
import { DataContext } from "../../context";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const LogoutButton = ({ logoutFunc, setNavbarId }) => {
    const navigate = useNavigate();


    const handleLogout = () => {
        logoutFunc();
        setNavbarId(0);
        navigate('/login'); // Redirect to login or home page after logout
    };

    return (
        <button
            onClick={handleLogout}
            className={`hidden md:inline-block w-full rounded md:px-1 md:pb-1 md:pt-1 px-6 pb-2 pt-2.5 font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            style={{ background: "#FF0000" }}
        >
            <PowerSettingsNewIcon /> Logout
        </button>
    );
};

const NavMenu = () => {
    const [mobMenuVis, setMobileVis] = useState(false);
    const { logoutFunc, isValidSessionFunc, session } = useContext(DataContext);
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

    useEffect(() => {
        isValidSessionFunc();
    }, [])

    if (!session) {
        return null;
    }

    const updatedArr = [...session?.navbar, {
        id: "custom1",
        label: <AccountCircleIcon />,
        option: [
            {
                id: "8a",
                label: "Change Password",
                link: '/change-password'
            },
            {
                id: "c1",
                label: <LogoutButton logoutFunc={logoutFunc} setNavbarId={setNavbarId} />,
                link: '/login'
            },
        ]
    }];

    return (
        <>
            <nav className={`flex items-center justify-between flex-wrap bg-white py-4  shadow-md border-t-2 border-green-700  top-0 w-full ${!mobMenuVis ? 'fixed' : ''} ${navbarId != 0 ? 'z-10' : ''}`}>
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
                    <div className="flex items-center flex-shrink-0 text-gray-800 md:mr-2 mx-auto md:mx-0">
                        <span className="font-semibold text-xl tracking-tight">
                        </span>
                    </div>
                </div>
                <div className={`menu w-full lg:block lg:items-center lg:w-auto lg:px-3 px-[15%] md:static absolute top-0 bg-white   md:py-0 py-10 
                        ${mobMenuVis ? "z-50 h-[100%] flex-grow transition-all duration-1000 ease-in-out -left-[10%]" : "transition-all duration-300 ease-in-out -left-full"}`}>
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
                        {updatedArr?.map((element, index) => {
                            return (
                                <>
                                    <div
                                        onClick={() => {
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
                                            setNavbarId(0);
                                        }}
                                        key={index}
                                        className={`cursor-pointer block mt-4 lg:inline-block lg:mt-0  px-4 py-2 rounded  mr-2  ${element.link == "signup" ? "lg:ml-auto" : "lg:ml-2"
                                            } ${element.link == location.pathname
                                                ? " underline text-green-600"
                                                : " "
                                            }`}
                                    >
                                        {element.option ?
                                            <>
                                                <div className="hidden md:block hover:text-gray-900">{element.label}</div>
                                                <div className="flex md:hidden ">
                                                    <span className=""> {element.label} </span>
                                                    <div className="ml-auto ">{element.option ? <div className={element.id == navbarId ? "transform rotate-[180deg]" : ""}>
                                                        <UpArrowIcon />
                                                    </div>
                                                        : null
                                                    }
                                                    </div>
                                                </div>
                                            </>
                                            : <span className="hover:text-gray-900">{element.label}</span>}
                                        {element.option && element.id == navbarId ?
                                            <div className="relative">
                                                <div className="hidden md:block absolute right-4 top-0 z-[100] transform rotate-[180deg] bg-white">
                                                    <UpArrowIcon />
                                                </div>
                                                <div className="md:absolute right-[20rem] top-2 bg-white ml-4 md:ml-0">
                                                    <div className="md:fixed bg-white border rounded shadow-2xl py-4 w-full md:w-[20rem] z-50 flex-col items-center">
                                                        {element.option.map((opel, index) => {
                                                            return (
                                                                <div className="text-left"
                                                                    onClick={() => {
                                                                        setNavbarId(0);
                                                                        setMobileVis(false);
                                                                    }}
                                                                >
                                                                    <NavLink
                                                                        exact
                                                                        to={opel.link}
                                                                        key={index}
                                                                        className={`text-left block mt-4 lg:inline-block lg:mt-0  px-4 py-2 rounded hover:text-gray-900  mr-2 ${opel.link == "signup" ? "lg:ml-auto" : "lg:ml-2"
                                                                            } ${opel.link == location.pathname
                                                                                ? " underline text-gray-900"
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
                                    </div>

                                </>
                            )
                        })}
                        {Cookies.get("token") ? <div className="mx-6 md:hidden">
                            <button
                                onClick={() => {
                                    logoutFunc();
                                    setNavbarId(0);
                                }}
                                className={` mb-3 inline-block w-full rounded md:px-1 md:pb-1  md:pt:1 px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                                type="button"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                style={{
                                    background: "#FF0000",
                                }}> <PowerSettingsNewIcon />Logout</button>
                        </div> : null}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavMenu;
