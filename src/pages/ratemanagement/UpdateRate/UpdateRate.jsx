import React, { useContext, useEffect, useState } from 'react'
import BlackButton from '../../../component/Buttons/BlackButton';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import genrateInitalValues from '../../../component/genrateInitalValues/GenrateInitalValues';
import updateRateArr from './UpdateRateArr';
import generateValidationSchema from '../../../component/genrateValidationSchema/genrateValidationSchema';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import Cookies from "js-cookie";

const UpdateRate = () => {

    const initialValues = genrateInitalValues(updateRateArr);
    // const validationSchema = generateValidationSchema(updateRateArr);
    const [button, setButton] = useState(false);
    const { ratePageObj, getCustomerRatePageFunc, isValidSessionFunc } = useContext(DataContext);
    const [excelSheet, setExcelSheet] = useState();

    useEffect(() => {
        getCustomerRatePageFunc();
    }, [])

    if (!ratePageObj) {
        return <Loading />
    }

    return (
        <section className="gradient-form h-[80vh] bg-neutral-200  dark:bg-neutral-700">
            <ToastContainer />
            <div className="p-10">
                <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 md:w-[55%] mx-auto">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800 py-4">
                            {/* Left column container */}
                            <div className="px-4 md:px-0 ">
                                <div className="md:mx-6 ">
                                    {/* Logo */}
                                    <div className="text-center">
                                        <h4 className="text-2xl font-bold text-gray-600 underline">
                                            Rate Update Form
                                        </h4>
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values, { resetForm }) => {
                                            setButton(true);
                                            const formData = new FormData();
                                            Object.entries(values).forEach(([key, value]) => {
                                                if (key == 'excel_sheet') {
                                                    formData.append(key, excelSheet);
                                                }
                                                else {
                                                    formData.append(key, value);
                                                }
                                            });
                                            const token = Cookies.get("token");
                                            axios.put(`${API_BASE_URL}/rate/`, formData, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            }).then((val) => {
                                                toast.success("Data Updated Successfully", {
                                                    "position": "top-center"
                                                });
                                                resetForm();
                                            }).catch((err) => {
                                                toast.error("Internal Server Error!!", {
                                                    "position": "top-center"
                                                });
                                                isValidSessionFunc();
                                                console.log(err);
                                            }).finally(() => {
                                                setButton(false);
                                            });
                                        }}
                                    >
                                        {({
                                            values,
                                            handleSubmit,
                                            resetForm,
                                            setFieldValue,
                                            handleBlur,
                                        }) => (
                                            <Form encType="multipart/form-data">
                                                <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                                                    {updateRateArr.map((element, index) => {
                                                        let fieldCss = `pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 `
                                                        return (
                                                            <div className="" key={index}>
                                                                <h4 className="font-semibold mb-2 text-gray-700 text-base">
                                                                    {element.placeholder}{" "}
                                                                    <span className="text-red-500">*</span>
                                                                </h4>
                                                                <div className={"w-full relative col-span-1 "}>
                                                                    {element.icon}
                                                                    {element.type == "dynamicoption" ? <Field as={"select"}
                                                                        type={element.type}
                                                                        name={element.name}
                                                                        placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                                        required
                                                                        className={fieldCss}
                                                                    >
                                                                        <option value="">Please Select</option>
                                                                        {element.name == "customer" ? ratePageObj?.customer_data?.map((sub_element, index) => {
                                                                            return (
                                                                                <option value={sub_element.id}>{sub_element.customer_name}</option>)
                                                                        }) : null}

                                                                        {element.name == "rate" ?
                                                                            ratePageObj?.customer_rate?.filter((el) => el.customer_id == values["customer"])?.map((sub_element, index) => {
                                                                                return (
                                                                                    <option value={sub_element.id}>{sub_element.rate_name}</option>)
                                                                            }) : null
                                                                        }
                                                                    </Field> : ""}
                                                                    {element.type == "file" ? <input
                                                                        onChange={(e) => {
                                                                            setExcelSheet(e.target.files[0]);
                                                                        }}
                                                                        type={'file'}
                                                                        accept=".xls,.xlsx"
                                                                        name={element.name}
                                                                        placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                                        required
                                                                        className={fieldCss}
                                                                    /> : null}
                                                                    <ErrorMessage
                                                                        name={element.name}
                                                                        component="div"
                                                                        className="text-red-500"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <BlackButton title={"Update"} button={button} />
                                            </Form>)}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateRate
