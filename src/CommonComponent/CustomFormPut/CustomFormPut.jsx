import React, { useContext, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import generateValidationSchema from '../../component/genrateValidationSchema/genrateValidationSchema';
import genrateInitalValues from '../../component/genrateInitalValues/GenrateInitalValues';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cookies from "js-cookie";
import { DataContext } from '../../context';
import Select from "react-select";

const CustomFormsPut = ({ fieldsArr, route_name, title, pageFunc }) => {
    const validationSchema = generateValidationSchema(fieldsArr);
    const initialValues = genrateInitalValues(fieldsArr);
    const [button, setButton] = useState(false);
    const { handleErrorsFunc } = useContext(DataContext);
    const navigate = useNavigate();
    const [maxDisputeAmount, setMaxDisputeAmount] = useState(0);
    const [selectedUser, setSelectedUser] = useState([]);
    const [selectedCustomer, setCustomerOption] = useState([]);
    const [fromDataTransferUser, setFromDataTransferUser] = useState();
    const selectRef = useRef();
    const handleSubmit = (values, { resetForm }) => {
        setButton(true);
        const token = Cookies.get("token");
        axios.put(`${API_BASE_URL}/${route_name}/`, { ...values, fromDataTransferUser }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((value) => {
            toast.success("Successfully Updated", {
                position: "top-center"
            });
            if (pageFunc) {
                pageFunc();
            }
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
                                                                placeholder={"Select Customer"}
                                                                required
                                                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                            /> : element.name == "transfer_customer" ? <Select
                                                                options={selectedCustomer}
                                                                ref={selectRef}
                                                                isSearchable={true}
                                                                isMulti
                                                                isClearable={true}
                                                                onChange={(selectedOptions) => {
                                                                    const selectedValues = selectedOptions.map(option => option.value);
                                                                    setFieldValue(element.name, selectedValues);
                                                                }}
                                                                name={element.name}
                                                                placeholder="Select a Customer"
                                                                required
                                                            />

                                                                : <> {element.icon}
                                                                    <Field
                                                                        as="select"
                                                                        name={element.name}
                                                                        placeholder={element.placeholder}
                                                                        required
                                                                        onChange={(e) => {
                                                                            setFieldValue(element.name, e.target.value);
                                                                            if (element.name == "invoice_number") {
                                                                                const tempObj = element.option.find(el => el.value == e.target.value);
                                                                                setMaxDisputeAmount(Number(tempObj.invoice_amount));
                                                                            }
                                                                            if (element.name == "from_transfer_user") {
                                                                                
                                                                                if (selectRef.current) {
                                                                                    selectRef.current.clearValue();
                                                                                    
                                                                                  }
                                                                                const tempObj = element.option.find(el => el.value == e.target.value);
                                                                                const customer = fieldsArr.find(el => el.name == "transfer_customer");
                                                                                const user = fieldsArr.find(el => el.name == "transfer_user");
                                                                                console.log(user);
                                                                                setCustomerOption(customer['option'].filter((cus_el) => cus_el.userId == tempObj.value));
                                                                                setSelectedUser(user['option'].filter((user_el)=> user_el.value != e.target.value));

                                                                            }
                                                                        }}
                                                                        className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                                    >
                                                                        <option value="">Please Select</option>
                                                                        {["invoice_number", 'vendor_rate_id'].includes(element?.name) ? element?.option?.map((opt, index) => {
                                                                            if (values['customer_id'] == opt.customer_id && values['dispute_type'] == opt.invoice_type) {
                                                                                return <option value={opt.value}>{opt.label}</option>
                                                                            }
                                                                        }) : element.name == "transfer_user" ? selectedUser?.map((opt, index) => {
                                                                            return <option value={opt.value}>{opt.label}</option>
                                                                        }) :
                                                                            element.option?.map((opt, index) => {
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
                                                                onChange={(e) => {
                                                                    if (element.name == "dispute_amount") {
                                                                        if (maxDisputeAmount < e.target.value) {
                                                                            toast.error("Dispute Amount cannot more than invoice amount");
                                                                            return;
                                                                        }
                                                                        else {
                                                                            setFieldValue(element.name, e.target.value);
                                                                        }
                                                                    }
                                                                    else {
                                                                        setFieldValue(element.name, e.target.value);
                                                                    }
                                                                }}
                                                                required
                                                                max={['invoice_to_date', 'payment_date'].includes(element.name) ? new Date().toISOString().split('T')[0] : element.name == "dispute_amount" ? 90 : null}
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

export default CustomFormsPut
