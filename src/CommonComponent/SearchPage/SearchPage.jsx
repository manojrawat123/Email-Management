import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import generateValidationSchema from '../../component/genrateValidationSchema/genrateValidationSchema';
import genrateInitalValues from '../../component/genrateInitalValues/GenrateInitalValues';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { DataContext } from '../../context';
import Select from "react-select";
import Cookies from 'js-cookie';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';

const SearchPage = ({ title, search_page_arr, route_page, country_code_pg }) => {
    const validationSchema = generateValidationSchema(search_page_arr);
    const initialValues = genrateInitalValues(search_page_arr);
    const [button, setButton] = useState(false);
    const [country, setCountry] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [countryCode, setCountryCode] = useState();
    const { handleErrorsFunc } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate()


    const handleSubmit = (values, { resetForm }) => {
        setButton(true);
        navigate(`/${route_page}/?${new URLSearchParams({
            ...values
        }
        )}`);
    }

    console.log(search_page_arr);

    return (
        <section className="gradient-form h-[100vh] bg-neutral-200 dark:bg-neutral-700">
            {
                isLoading ?
                    <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
                        <Loading />
                    </div> : null
            }
            <ToastContainer />
            <div className=" h-full p-10">
                <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 md:w-[55%] mx-auto">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800 py-20 md:py-0">
                            <h2 className="bg-gray-100 text-gray-700 text-3xl py-4 px-6 mb-6 font-semibold text-center">{title}</h2>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
                                    <Form>
                                        <div className="px-4 md:px-0">
                                            <div className="md:mx-6 md:p-12">
                                                {search_page_arr?.map((element, index) => {
                                                    return (
                                                        <div className='' key={index}>
                                                            <h4 className="text-gray-700 mb-2">{element.placeholder} <span className="text-red-500">*</span></h4>
                                                            <div className={"w-full relative col-span-1 "}>
                                                                {
                                                                    ["option", "apioption"].includes(element.type) ?
                                                                        <Select
                                                                            options={element.name == "customer_rate_id" ?
                                                                                element?.option?.filter((rate_el, index) => rate_el.customer_id == values["customer_id"]) : element.type == "apioption" ? element.option : element.name == "country_code" ? country : element?.option}
                                                                            isSearchable={true}
                                                                            isClearable={true}
                                                                            onChange={(selectedOptions) => {
                                                                                setFieldValue(element.name, selectedOptions.value);

                                                                                if (element.name == "customer_rate_id") {
                                                                                    setIsLoading(true);
                                                                                    const token = Cookies.get("token");
                                                                                    axios.get(`${API_BASE_URL}/searchpage/${selectedOptions.value}/`, {
                                                                                        headers: {
                                                                                            Authorization: `Bearer ${token}`
                                                                                        }
                                                                                        , params: {
                                                                                            page: "get_country",
                                                                                            url: location.pathname
                                                                                        }
                                                                                    }).then((res) => {
                                                                                        const opt_val = res.data.country.map((element) => {
                                                                                            return {
                                                                                                value: element,
                                                                                                label: element
                                                                                            }
                                                                                        })
                                                                                        setCountry(opt_val);
                                                                                    }).catch((err) => {
                                                                                        console.log(err);
                                                                                    }).finally(() => {
                                                                                        setIsLoading(false);
                                                                                    });
                                                                                }
                                                                            }}
                                                                            placeholder={element.placeholder}
                                                                            required
                                                                        />
                                                                        :
                                                                        <>
                                                                            {element.icon}
                                                                            <Field
                                                                                type={element.type ? element.type : "text"}
                                                                                name={element.name}
                                                                                placeholder={element.placeholder}
                                                                                required
                                                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                                            />
                                                                        </>
                                                                }
                                                            </div>
                                                            <ErrorMessage name={element.name} component="div" className="text-red-500" />
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
                                                        {button ? <CircularProgress size={19} color='inherit' /> : "Search"}
                                                    </button>
                                                </div>
                                            </div>


                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchPage

