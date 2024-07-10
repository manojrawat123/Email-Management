import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import genrateInitalValues from '../../../component/genrateInitalValues/GenrateInitalValues';
import generateValidationSchema from '../../../component/genrateValidationSchema/genrateValidationSchema';
import { DataContext } from '../../../context';
import Select from "react-select";
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import rateEmailConfirmArr from './RateConfirmArr';
import { Check } from '@mui/icons-material';
import EmailLastConfirm from '../../../CommonComponent/DynamicForm/ConfirmEmailModal/EmailLastConfirm';


const RateEmailConfirmForm = ({ setIsModalOpen, data, isAllCountry, setIsAllCountry, form_array, resetFunction }) => {

    const initialValues = genrateInitalValues(rateEmailConfirmArr);
    // const validationSchema = generateValidationSchema(rateEmailConfirmArr);
    const [addButton, setAddButton] = useState(false);
    const { emailSenderPageObj, getTopRouteFunc, topRouteTable, setTopRouteTable } = useContext(DataContext);
    const [showConfirmEmail, setShowConfirmEmail] = useState(false);
    const [lastData, setLastData] = useState();

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            console.log(values);
            formData.append("type", 'rate');
            formData.append("is_all_country", isAllCountry);
            const final_html_format = `<h4>${values['template_body_before']}</h4>
                                        <h4>${values['template_body_after']}</h4>
                <h4>${values['signatures']}</h4>`
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            setLastData(formData);
            setShowConfirmEmail(true);
        }
    });

    useEffect(() => {
        formik.setValues((prevValues) => ({
            ...prevValues,
            ...data,
            "to": data.customer_name,
            "subject": data.header,
            'template_body_before': data.template_body_before,
            'template_body_after': data.template_body_after,
            'signatures': data.signatures,
            'customer_name': data.customer_name,
            'rate_name': data.rate_name,
            'country': data.country
        }))
    }, []);

    return (
        <div>
            {showConfirmEmail ? <EmailLastConfirm resetFunction={resetFunction} setShowConfirmEmail={setShowConfirmEmail} lastData={lastData} setIsModalOpen={setIsModalOpen} /> : null}
            <div className="w-[100%]">
                <div className="sm:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-2xl border border-t-0 border-solid border-gray-300">
                    <h2 className="font-bold text-3xl  px-6  text-gray-800 text-center">
                        Send Rate
                    </h2>
                    <form onSubmit={formik.handleSubmit} className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                            {rateEmailConfirmArr.map((element, index) => (
                                <div className="" key={index}>
                                    <h4 className="font-semibold mb-2 text-gray-700 flex">
                                        {element.placeholder}{" "}
                                        <span className="text-red-500 mr-auto">*</span>
                                        {
                                        }
                                    </h4>
                                    <div className={"w-full relative col-span-1 "}>
                                        {element.icon}
                                        {element.type != "select" && element.type != "option" ?
                                            ['template_body_before', 'template_body_after', 'signatures'].includes(element.name) ?
                                                <textarea
                                                    onBlur={formik.handleBlur}
                                                    type={element.type}
                                                    name={element.name}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[element.name]}
                                                    placeholder={element.name === 'title' ? element.helpingtext : element.placeholder}
                                                    required
                                                    readOnly={element.readOnly}
                                                    className={`pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 `} />
                                                :
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    type={element.type}
                                                    name={element.name}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[element.name]}
                                                    placeholder={element.name === 'title' ? element.helpingtext : element.placeholder}
                                                    required
                                                    readOnly={element.readOnly}
                                                    className={`pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 `}
                                                /> :
                                            element.type == "option" ?
                                                <input
                                                    onBlur={formik.handleBlur}
                                                    type={element.type}
                                                    name={element.name}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[element.name]}
                                                    placeholder={element.name === 'title' ? element.helpingtext : element.placeholder}
                                                    required
                                                    readOnly={true}
                                                    className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                />
                                                :
                                                isAllCountry ? <h1 className="text-green-700 font-semibold w-full py-1 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "> <span><Check className="border border-green-700 rounded-full" /> </span>All Country Selected</h1> :
                                                    <h1 className="text-gray-700 font-semibold w-full py-1 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 overflow-y-scroll h-[5rem]">
                                                        {data.country?.map((con_el, index) => {
                                                            return <span>
                                                                {con_el} {",  "}
                                                            </span>
                                                        })}
                                                    </h1>
                                        }
                                    </div>
                                    {formik.touched.username && formik.errors.username && (
                                        <p className="text-red-500 text-xs italic">{formik.errors.username}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* {Array.isArray(topRouteTable) && topRouteTable.length == 0 ? null : <div dangerouslySetInnerHTML={{ __html: topRouteTable?.html_data }} />} */}
                        <br />
                        <div className="mb-4 mx-5">
                            <button
                                type="submit"
                                className="w-full font-bold bg-black text-white py-3 px-4 rounded hover:bg-black transition duration-300"
                            >
                                {addButton ? (
                                    <CircularProgress size={19} color="inherit" />
                                ) : (
                                    "Send Email"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RateEmailConfirmForm