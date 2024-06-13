import { CircularProgress } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import genrateInitalValues from "../../component/genrateInitalValues/GenrateInitalValues";
import generateValidationSchema from "../../component/genrateValidationSchema/genrateValidationSchema";
import Loading from "../../component/LoadingSpinner/LoadingSpinner";
import Select from "react-select";
import { AllInbox, Check } from "@mui/icons-material";
import EmailSenderModal from "./ConfirmEmailModal/EmailSenderModal";

const DynamicForm = ({ form_array, isAllCountry, setIsAllCountry, EmailConfirmForm, emailSenderPageObj }) => {

    const initialValues = genrateInitalValues(form_array);
    // initialValues["is_country"] = ""
    // const validationSchema = generateValidationSchema(form_array);
    const [button, setButton] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState();

    if (!form_array) {
        return <Loading />
    }

    return (<div>
        <EmailSenderModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} data={data} EmailConfirmForm={EmailConfirmForm} isAllCountry={isAllCountry} setIsAllCountry={setIsAllCountry} form_array={form_array}/>
        <ToastContainer />
        <div className="w-[100%] py-10 bg-blue-50">
            <div className="sm:w-[80%] w-[90%]  mx-auto bg-white rounded-lg shadow-2xl border border-solid border-gray-300">
                <h2 className="bg-gray-100  font-bold text-3xl py-4 px-6 mb-6 text-gray-800 text-center">
                    Add Customer
                </h2>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        setData(prevData => { return { ...prevData, ...values } });
                        setIsModalOpen(true);
                        console.log(values);
                        // axios.post(`${API_BASE_URL}/customer/`, values, authHeader).then((res) => {
                        //     resetForm();
                        //     toast.success("Customer Added Successfully!!", { position: "top-center" });
                        // }).catch((error) => {
                        //     console.log(error);
                        //     handleErrorsFunc(error);
                        // }).finally(() => {
                        //     setAddButton(false);
                        // })
                    }}
                >
                    {({
                        values, resetForm, setFieldValue
                    }) => (
                        <Form>
                            <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                                {
                                    form_array?.map((element, index) => {
                                        return (<div className="" key={index}>
                                            <h4 className="font-semibold mb-2 text-gray-700 flex">
                                                <div className="mr-auto"> {element.placeholder}{" "}  <span className="text-red-500">*</span> </div>{
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
                                                {
                                                    element.type == "dynamic_option" ? <Field
                                                        as="select"
                                                        name={element.name}
                                                        placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                        required
                                                        onChange={(e) => {
                                                            setFieldValue(element.name, e.target.value);
                                                            if (element.name == "template_id") {
                                                                const tempObj = emailSenderPageObj?.email_template?.find(emailEl => emailEl.TemplateID == e.target.value);
                                                                console.log(tempObj);
                                                                setData({
                                                                    ...data,
                                                                    header: tempObj.TemplateSubject,
                                                                    'template_body_before': tempObj.template_body_before,
                                                                    'template_body_after': tempObj.template_body_after,
                                                                    'signatures': tempObj.signatures
                                                                });
                                                            }
                                                            if (element.name === "customer_id") {
                                                                const tempObj = element?.option?.find(el => el.id == e.target.value);
                                                                setData({
                                                                    ...data,
                                                                    "customer_name": tempObj.label
                                                                })
                                                            }
                                                        }}
                                                        className={`pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600`}
                                                    >
                                                        <option value="">Please Select</option>
                                                        {element.option?.map((subel, index) => {
                                                            return <option value={subel.id}>{subel.label}</option>
                                                        })}
                                                    </Field> : null
                                                }
                                                {
                                                    element.type == "dynamic_select" ?
                                                        <>
                                                            {isAllCountry ? <h1 className="text-green-700 font-semibold w-full py-1 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "> <span><Check className="border border-green-700 rounded-full"/> </span>All Country Selected</h1>
                                                                : null}
                                                            {!isAllCountry ? <Select
                                                                name={element.name}
                                                                className={` ${isAllCountry ? 'hidden' : 'block'}`}
                                                                options={element?.option?.map((element, index) => {
                                                                    return {
                                                                        value: element.id,
                                                                        label: element.label
                                                                    }
                                                                })}
                                                                isSearchable={true}
                                                                isMulti
                                                                isClearable={true}
                                                                onChange={(selectedOptions) => {
                                                                    const selectedValues = selectedOptions.map(option => option.value);
                                                                    setFieldValue(element.name, selectedValues);
                                                                }}
                                                                placeholder="Select Countries"
                                                                required
                                                            /> : null}</> : null}
                                                {element.type == "text" ? <Field
                                                    name={element.name}
                                                    placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                    required
                                                    className={"pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "}
                                                /> : null}
                                            </div>
                                            <ErrorMessage
                                                name={element.name}
                                                component="div"
                                                className="text-red-500"
                                            />
                                        </div>)
                                    })
                                }
                            </div>

                            <div className="mb-4 mx-5">
                                <button
                                    type="submit"
                                    className="w-full font-bold bg-black text-white py-3 px-4 rounded hover:bg-black transition duration-300 "
                                >
                                    {button ? (
                                        <CircularProgress size={19} color="inherit" />
                                    ) : (
                                        "Send Email"
                                    )}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </div>)
}

export default DynamicForm;