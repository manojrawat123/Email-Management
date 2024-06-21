import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import generateValidationSchema from '../../component/genrateValidationSchema/genrateValidationSchema';
import genrateInitalValues from '../../component/genrateInitalValues/GenrateInitalValues';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { DataContext } from '../../context';

const CustomForms = ({ fieldsArr, route_name, title }) => {
    const validationSchema = generateValidationSchema(fieldsArr);
    const initialValues = genrateInitalValues(fieldsArr);
    const [button, setButton] = useState(false);
    const { handleErrorsFunc } = useContext(DataContext);
    const navigate = useNavigate();

    const handleSubmit = (values, { resetForm }) => {
        setButton(true);
        axios.post(`${API_BASE_URL}/${route_name}/`, values).then((value) => {
            console.log(values);
            toast.success("Successfully Updated", {
                position: "top-center"
            });
            resetForm();
        }).catch((err) => {
            handleErrorsFunc(err);
            console.log(err);
        }).finally(() => {
            setButton(false);
        });
    }

    return (
        <div>
            <ToastContainer />
            <div className="w-[100%] py-10 bg-blue-50">
                <div className="sm:w-[70%] w-[90%] mt-10  mx-auto bg-white rounded-lg shadow-2xl border border-solid border-gray-300 ">
                    <h2 className="bg-gray-100 text-gray-700 text-3xl py-4 px-6 mb-6 font-semibold text-center">{title}</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
                            <Form>
                                <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 gap-4 p-4">
                                    {fieldsArr?.map((element, index) => {
                                        return (
                                            <div className='' key={index}>
                                                <h4 className="text-gray-700 mb-2">{element.placeholder} <span className="text-red-500">*</span></h4>
                                                <div className={"w-full relative col-span-1 "}>
                                                    {["dynamicoption", "option"].includes(element.type) ?
                                                        <>
                                                            {element.type == "textarea" ? <Field
                                                                as="textarea"
                                                                name={element.name}
                                                                placeholder={element.placeholder}
                                                                required
                                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                            /> : <> {element.icon}
                                                                <Field
                                                                    as="select"
                                                                    name={element.name}
                                                                    placeholder={element.placeholder}
                                                                    required
                                                                    className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                                >
                                                                    <option value="">Please Select</option>
                                                                    {element?.name == "invoice_number" ? element?.option?.map((opt, index) => {
                                                                        if (values['customer_id'] == opt.customer_id) {
                                                                            return <option value={opt.value}>{opt.label}</option>
                                                                        }
                                                                    }) : element.option?.map((opt, index) => {
                                                                        return <option value={opt.value}>{opt.label}</option>
                                                                    })}
                                                                </Field>
                                                            </>}
                                                        </>
                                                        :
                                                        <>
                                                            {element.icon}
                                                            <Field
                                                                type={!element.type || element.type == "number" ? "text" : element.type}
                                                                name={element.name}
                                                                placeholder={element.placeholder}
                                                                required
                                                                max={['invoice_to_date', 'payment_date'].includes(element.name) ? new Date().toISOString().split('T')[0] : null}
                                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                            />
                                                        </>
                                                    }
                                                </div>
                                                <ErrorMessage name={element.name} component="div" className="text-red-500" />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="mb-4 mx-5">
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-black transition duration-300"
                                    >
                                        {button ? <CircularProgress size={19} color='inherit' /> : "Submit"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default CustomForms
