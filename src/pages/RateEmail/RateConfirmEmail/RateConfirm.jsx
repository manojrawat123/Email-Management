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


const RateEmailConfirmForm = ({ setIsModalOpen, data, isAllCountry, setIsAllCountry, form_array }) => {

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
            // const customer = values["to"].map((element, index) => { return element.value });
            //     console.log(customer);
            formData.append("type", 'rate');
            formData.append("is_all_country", isAllCountry);

            const final_html_format = `<h4>${values['template_body_before']}</h4>
                                            ${topRouteTable?.html_data && topRouteTable?.html_data != "undefined" ? topRouteTable?.html_data : ""}
                                        <h4>${values['template_body_after']}</h4>
                <h4>${values['signatures']}</h4>`
                console.log(final_html_format);
            formData.append("message", final_html_format);
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });
            setLastData(formData);
            setShowConfirmEmail(true);
        }
    });
    console.log(data);
    const defaultValue = data.country != "" ? data.country.map((element) => {
        return {
            value: element,
            label: element
        }
    }) : {}

    useEffect(() => {
        if (data.top_routes != "") {
            if (data.rate_country != "undefined" || !data.rate_country) {
                getTopRouteFunc({
                    country_name: data.top_routes
                });
            }
            else {
                getTopRouteFunc({
                    route_id: data.top_routes
                });
            }
        }
        else {
            setTopRouteTable([])
        }
    }, []);

    useEffect(() => {
        formik.setValues((prevValues) => ({
            ...prevValues,
            "to": data.customer_name,
            "subject": data.header,
            'template_body_before': data.template_body_before,
            'template_body_after': data.template_body_after,
            'signatures': data.signatures,
            'customer_id': data.customer_id,
            'rate_id': data.rate_id,
            'country': data.country
        }))
    }, []);

    console.log(rateEmailConfirmArr);
    if (!topRouteTable && data.top_routes != "") {
        return <Loading />
    }

    return (
        <div>
            {showConfirmEmail ? <EmailLastConfirm setShowConfirmEmail={setShowConfirmEmail} lastData={lastData} setIsModalOpen={setIsModalOpen} /> : null}
            <div className="w-[100%]">
                <div className="sm:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-2xl border border-t-0 border-solid border-gray-300">
                    <h2 className="font-bold text-3xl  px-6  text-gray-800 text-center">
                        Update Customer Details
                    </h2>
                    <form onSubmit={formik.handleSubmit} className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                            {rateEmailConfirmArr.map((element, index) => (
                                <div className="" key={index}>
                                    <h4 className="font-semibold mb-2 text-gray-700 flex">
                                        {element.placeholder}{" "}
                                        <span className="text-red-500 mr-auto">*</span>
                                        {
                                            element.name == "country" ? <div className="flex items-center ">
                                                <div className="ml-auto">
                                                    <input
                                                        type="checkbox"
                                                        name="is_country"
                                                        checked={isAllCountry}
                                                        onChange={() => {
                                                            setIsAllCountry(!isAllCountry);
                                                        }}
                                                        className=""
                                                    />
                                                    <label className="">Select All Countries</label>
                                                </div>
                                            </div> : null
                                        }
                                    </h4>
                                    <div className={"w-full relative col-span-1 "}>
                                        {element.icon}
                                        {element.type != "select" && element.type != "option" ? <input
                                            onBlur={formik.handleBlur}
                                            type={element.type}
                                            name={element.name}
                                            onChange={formik.handleChange}
                                            value={formik.values[element.name]}
                                            placeholder={element.name === 'title' ? element.helpingtext : element.placeholder}
                                            required
                                            readOnly={element.readOnly}
                                            className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        /> :
                                            element.type == "option" ?
                                                <select
                                                    value={formik.values[element.name]}
                                                    placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                    required
                                                    onChange={(e) => {
                                                        formik.setFieldValue(element.name, e.target.value);
                                                    }}
                                                    // onChange={(e) => {
                                                    //     setFieldValue(element.name, e.target.value);
                                                    //     if (element.name === "customer_id") {
                                                    //         const tempObj = element?.option?.find(el => el.id == e.target.value);
                                                    //         setData({
                                                    //             ...data,
                                                    //             "customer_name": tempObj.label
                                                    //         })
                                                    //     }
                                                    // }}
                                                    className={`pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600`}
                                                >
                                                    <option value="">Please Select</option>
                                                    {form_array?.find((f_e, f_i) => f_e.name == element.name)?.option?.map((subel, index) => {
                                                        return <option value={subel.id}>{subel.label}</option>
                                                    })}
                                                </select>
                                                :
                                                isAllCountry ? <h1 className="text-green-700 font-semibold w-full py-1 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "> <span><Check className="border border-green-700 rounded-full" /> </span>All Country Selected</h1> : <Select
                                                    options={emailSenderPageObj?.rate_list?.map((coun_ele, idx) => ({
                                                        value: coun_ele,
                                                        label: coun_ele
                                                    }))}
                                                    isSearchable={true}
                                                    isMulti
                                                    isClearable={true}
                                                    onChange={(selectedOptions) => {
                                                        const selectedValues = selectedOptions.map(option => option.value);
                                                        formik.setFieldValue(element.name, selectedValues);
                                                    }}
                                                    defaultValue={defaultValue}
                                                    placeholder="Select a Country"
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
                        {Array.isArray(topRouteTable) && topRouteTable.length == 0 ? null : <div dangerouslySetInnerHTML={{ __html: topRouteTable?.html_data }} />}
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