import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import genrateInitalValues from '../../../component/genrateInitalValues/GenrateInitalValues';
import generateValidationSchema from '../../../component/genrateValidationSchema/genrateValidationSchema';
import { API_BASE_URL } from '../../../config';
import emailConfirmArr from './EmailConfirmArr';
import { DataContext } from '../../../context';
import Select from "react-select";
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import EmailLastConfirm from '../../../CommonComponent/DynamicForm/ConfirmEmailModal/EmailLastConfirm';


const EmailConfirmForm = ({ setIsModalOpen, data, resetFunction, fieldValueFunc, setLoading }) => {

    const initialValues = genrateInitalValues(emailConfirmArr);
    const [addButton, setAddButton] = useState(false);
    const { emailSenderPageObj, getTopRouteFunc, topRouteTable, setTopRouteTable } = useContext(DataContext);
    const [showConfirmEmail, setShowConfirmEmail] = useState(false);
    const [lastData, setLastData] = useState();

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            console.log(values);
            const customer = values["to"].map((element, index) => { return element.value });
            console.log(customer);
            formData.append("sendTo", customer);
            const final_html_format = `<h4>${values['template_body_before']}</h4>
                 ${topRouteTable?.html_data}
            <h4>${values['template_body_after']}</h4>
            <h4>${values['signatures']}</h4>
            `
            formData.append("message", final_html_format);
            formData.append("template_id", data.template_id);
            if (data["attachement"]) {
                formData.append("attachement", data["attachement"]);
            }
            Object.entries(values).forEach(([key, value]) => {
                if (key != 'to') {
                    formData.append(key, value);
                }
            }
            );
            setLastData(formData);
            setShowConfirmEmail(true);
        }
    });

    const defaultOptions = data.customer_id.map(id => ({
        value: id,
        label: emailSenderPageObj.customer_data.find(customer => customer.id === id)?.customer_name
    }));


    useEffect(() => {
        if (data.top_routes != "") {
            getTopRouteFunc({
                route_id: data.top_routes
            });

        }
        else {
            setTopRouteTable([]);
        }
    }, [])

    useEffect(() => {
        formik.setValues((prevValues) => ({
            ...prevValues,
            "to": defaultOptions,
            "subject": data.header,
            'template_body_before': data.template_body_before,
            'template_body_after': data.template_body_after,
            'signatures': data.signatures
        }))
    }, []);

    if (!topRouteTable && data.top_routes != "") {
        return <Loading />
    }

    return (
        <div>
            {showConfirmEmail ? <EmailLastConfirm setShowConfirmEmail={setShowConfirmEmail} lastData={lastData} setIsModalOpen={setIsModalOpen} resetFunction={resetFunction} fieldValueFunc={fieldValueFunc} setLoading={setLoading}/> : null}
            <div className="w-[100%]">
                <div className="sm:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-2xl border border-t-0 border-solid border-gray-300">
                    <h2 className="font-bold text-3xl  px-6  text-gray-800 text-center">
                       Send Top Routes
                    </h2>
                    <form onSubmit={formik.handleSubmit} className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                            {emailConfirmArr.map((element, index) => (
                                <div className="" key={index}>
                                    <h4 className="font-semibold mb-2 text-gray-700">
                                        {element.placeholder}{" "}
                                        <span className="text-red-500">*</span>
                                    </h4>
                                    <div className={"w-full relative col-span-1 "}>
                                        {element.icon}
                                        {element.type != "select" ? element.type == "textarea" ?
                                            <textarea
                                                onBlur={formik.handleBlur}
                                                type={element.type}
                                                name={element.name}
                                                onChange={formik.handleChange}
                                                value={formik.values[element.name]}
                                                placeholder={element.name === 'title' ? element.helpingtext : element.placeholder}
                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                required
                                            ></textarea>
                                            : <input
                                                onBlur={formik.handleBlur}
                                                type={element.type}
                                                name={element.name}
                                                onChange={formik.handleChange}
                                                value={formik.values[element.name]}
                                                placeholder={element.name === 'title' ? element.helpingtext : element.placeholder}
                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                required
                                            /> :
                                            <Select
                                                name='to'
                                                options={emailSenderPageObj?.customer_data?.filter(el=> defaultOptions.map((e2)=> e2.id).includes(el.id)).map((customer, idx) => ({
                                                    value: customer.id,
                                                    label: customer.customer_name
                                                }))}
                                                isSearchable={true}
                                                isMulti
                                                onChange={(selectedOptions)=>{
                                                    if (element.name === "to") {
                                                        formik.setFieldValue("to", selectedOptions);
                                                      }
                                                }}
                                                // isDisabled
                                                isClearable={true}
                                                defaultValue={defaultOptions}
                                                placeholder="Select a Customer"
                                                required
                                            />
                                        }
                                    </div>
                                    {formik.touched.username && formik.errors.username && (
                                        <p className="text-red-500 text-xs italic">{formik.errors.username}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {Array.isArray(topRouteTable) && topRouteTable.length == 0 ? null : <div dangerouslySetInnerHTML={{ __html: topRouteTable?.react_data }} />}
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

export default EmailConfirmForm