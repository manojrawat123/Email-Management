import React, { useState } from 'react'
import navBarArr from './NavArr'
// import UpArrowIcon from "../../image/icons/UpArrow";
import UpArrowIcon from '../../images/icons/UpArrow'
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const [navbarId, setNavbarId] = useState();
    return (
        <nav className=" flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-green-700">

            <div className='flex  mx-4'>
                <div className='text-md font-bold text-gray-700 mr-auto'>Rate Logo</div>
                {/* Navbar Data Array */}
                <div className="text-md font-bold text-gray-700 md:flex text-center">
                    {navBarArr.map((element, index) => {
                        return (
                            <>
                                <div className={'md:mx-4 relative cursor-pointer'}
                                    onMouseEnter={() => {
                                        setNavbarId(element.id);
                                    }}
                                    onMouseLeave={() => {
                                        setNavbarId(null);
                                    }}
                                >
                                    {element.options && navbarId == element.id ?
                                        <div className="md:absolute right-[12rem] top-6 ml-4 md:ml-0">
                                            <div className="md:fixed bg-white border rounded shadow-2xl py-4 w-full md:w-[12rem] z-50">
                                                <div>
                                                    {element.options.map((navElement, index) => {
                                                        return (
                                                            <>
                                                                <NavLink
                                                                    to={navElement.link}
                                                                    className='block mt-4 lg:inline-block lg:mt-0  px-4 py-2 rounded hover:text-green-600  mr-2'>
                                                                    {navElement.label}
                                                                </NavLink>
                                                                <br />
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    {!element.options ?
                                        <NavLink to={element.link}>
                                            {element.label}
                                        </NavLink>
                                        : element.label
                                    }
                                    {element.options ?
                                        element.id == navbarId ?
                                            <div className='ml-3 inline-block transform rotate-180'>
                                                <UpArrowIcon display={"inline-block"} />
                                            </div>
                                            :
                                            <div className='ml-3 inline-block'>
                                                <UpArrowIcon display={"inline-block"} />
                                            </div> : null}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
