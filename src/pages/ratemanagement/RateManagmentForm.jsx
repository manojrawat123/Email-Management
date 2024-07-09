import React, { useContext, useEffect, useState } from 'react'
import { read, write, utils } from 'xlsx';
import axios from 'axios';
import { DataContext } from '../../context';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import BlackButton from '../../component/Buttons/BlackButton';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import genrateInitalValues from '../../component/genrateInitalValues/GenrateInitalValues';
import rateArr from './RateManagementArr';
import generateValidationSchema from '../../component/genrateValidationSchema/genrateValidationSchema';
import { API_BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";

const RateManagmentForm = () => {

    const { ratePageObj, getCustomerRatePageFunc, isValidSessionFunc, handleErrorsFunc } = useContext(DataContext);
    const [button, setButton] = useState();
    const initialValues = genrateInitalValues(rateArr);
    // const validationSchema = generateValidationSchema(rateArr);
    const [customerRateId, setCustomerRateId] = useState();
    const [excelSheet, setExcelSheet] = useState();
    const [radioValue, setRadioValue] = useState(1);

    useEffect(() => {
        getCustomerRatePageFunc();
    }, []);


    if (!ratePageObj) {
        return <Loading />
    }

    return (
        <section className="gradient-form h-[80vh] bg-neutral-200  dark:bg-neutral-700">
            <ToastContainer />
            <div className=" p-10">
                <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 md:w-[55%] mx-auto">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800 py-4">
                            {/* Left column container */}
                            <div className="px-4 md:px-0 ">
                                <div className="md:mx-6 ">
                                    {/* Logo */}
                                    <div className="text-center">
                                        <h4 className="text-2xl font-bold text-gray-600 underline">
                                            Rate Management System
                                        </h4>
                                    </div>
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values, {resetForm}) => {
                                            setButton(true);
                                            values['radio_value'] = radioValue
                                            if ((excelSheet == "" || !excelSheet) && (customerRateId == "" || !customerRateId)) {
                                                toast.error("Please Select Data", {
                                                    "position": "top-center"
                                                });
                                                setButton(false);
                                                return;
                                            }
                                            values["customer_rate_id"] = customerRateId;
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
                                            axios.post(`${API_BASE_URL}/rate/`, formData, {
                                                headers : {
                                                    Authorization : `Bearer ${token}`
                                                }
                                            }).then((value) => {
                                                toast.success("Data Updated Successfully", {
                                                    "position": "top-center"
                                                });
                                               resetForm();
                                            }).catch((err) => {
                                                isValidSessionFunc();
                                                handleErrorsFunc(err);
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
                                                    {rateArr.map((element, index) => {
                                                        let fieldCss = `pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 `
                                                        return (
                                                            <div className="" key={index}>
                                                                <h4 className="font-semibold mb-2 text-gray-700 text-base">
                                                                    {element.placeholder}{" "}
                                                                    <span className="text-red-500">*</span>
                                                                </h4>
                                                                {element.type == "choice" ?
                                                                    <div className='font-semibold my-4'>
                                                                        <button
                                                                            type='button'
                                                                            className={`${radioValue == 1 ? 'bg-black text-white' : 'border border-black'}  rounded py-1 px-2  mx-2 `} onClick={() => {
                                                                                setRadioValue(1);
                                                                            }}>
                                                                            Select Excel File
                                                                        </button>
                                                                        <button
                                                                            type='button'
                                                                            className={`${radioValue == 2 ? 'bg-black text-white' : 'border border-black'}  rounded py-1 px-2  mx-2 `} onClick={() => {
                                                                                setRadioValue(2);
                                                                            }} >Select Existing
                                                                        </button>
                                                                    </div> : null
                                                                }
                                                                <div className={"w-full relative col-span-1 "}>
                                                                    {element.icon}
                                                                    {
                                                                        element.type == "option" ?
                                                                            <Field
                                                                                as="select"
                                                                                type={element.type}
                                                                                name={element.name}
                                                                                placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                                                required
                                                                                className={fieldCss}
                                                                            >
                                                                                <option value="">Please Select</option>
                                                                                {element.name == "customer_id" ? ratePageObj?.customer_data?.map((sub_element, index) => {
                                                                                    return (
                                                                                        <option value={sub_element.id}>{sub_element.customer_name}</option>)
                                                                                }) : null}
                                                                                {
                                                                                    element.name == "rate_status" ? element.option?.map((sub_element) => {
                                                                                        return <option value={sub_element.value}>{sub_element.label}</option>
                                                                                    }) : null
                                                                                }
                                                                                {
                                                                                    element.name == "rate_profile" ? ratePageObj?.management_profile?.map((element, index) => {
                                                                                        return <option value={element.id}>{element.name}</option>
                                                                                    }) : null
                                                                                }
                                                                            </Field> :
                                                                            element.type == "choice" ?
                                                                                radioValue == 1 ? <input
                                                                                    onChange={(e) => {
                                                                                        setExcelSheet(e.target.files[0])
                                                                                    }}
                                                                                    accept=".xls,.xlsx"
                                                                                    type={'file'}
                                                                                    name={element.name}
                                                                                    placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                                                    required
                                                                                    className={fieldCss}
                                                                                /> :
                                                                                    <Field
                                                                                        as="select"
                                                                                        type={element.type}
                                                                                        name={""}
                                                                                        value={customerRateId}
                                                                                        placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                                                        required
                                                                                        className={fieldCss}
                                                                                        onChange={(e) => {
                                                                                            setCustomerRateId(e.target.value);
                                                                                        }}
                                                                                    >
                                                                                        <option value="">Please Select</option>
                                                                                        {
                                                                                            ratePageObj?.customer_rate?.map((sub_element, index) => {
                                                                                                return (
                                                                                                    <option value={sub_element.id}>{sub_element.rate_name}</option>)
                                                                                            })
                                                                                        }
                                                                                    </Field>
                                                                                : <Field
                                                                                    type={element.type}
                                                                                    name={element.name}
                                                                                    placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                                                    required
                                                                                    className={fieldCss}
                                                                                />
                                                                    }
                                                                </div>
                                                                <ErrorMessage
                                                                    name={element.name}
                                                                    component="div"
                                                                    className="text-red-500"
                                                                />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <BlackButton title={"Submit"} button={button} />
                                            </Form>)}
                                    </Formik>
                                    {/* {customerObject?.map((element, index)=>{
                                                    return <option value={element.id} key={index}>{element?.customer_name}</option>
                                                })} */}
                                    {/* Submit button */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RateManagmentForm

// const fileManagement = (e) => {
//     e.preventDefault();
//     const fileInput = document.getElementById('file');
//     const file = fileInput.files[0];

//     const ratename = e.target.ratename?.value
//     const customerid = e.target.customerid?.value
//     const customerpre = e.target.customerpre?.value
//     const rateprofile = e.target.rateprofile?.value
//     const status = e.target.status?.value

//     if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const data = new Uint8Array(e.target.result);
//             const workbook = read(data, { type: 'array' });
//             const sheetName = workbook.SheetNames[0];
//             const worksheet = workbook.Sheets[sheetName];
//             const excelData = utils.sheet_to_json(worksheet, { header: 1 });

//             excelData.forEach((element, index) => {
//                 if (index != 0) {
//                     const postData = {
//                         RateName: ratename,
//                         CustomerID: customerid,
//                         CustomerPrefix: customerpre,
//                         RateProfile: rateprofile,
//                         CountryCode: element[1],
//                         CountryName: element[0],
//                         Rate: element[2],
//                         BillingIncrement1: element[5],
//                         BillingIncrementN: element[6],
//                         Status: element[3],
//                         EffectiveDate: element[4]?.substring(0, 10),
//                         RateStatus: status
//                     }
//                     if (index == 1 || 3) {
//                         console.log("Post Data", postData);
//                     }
//                     axios.post('http://localhost:8000/ratetable/', postData).then((value) => {
//                         console.log("Data Updated Successfully!!");
//                     }).catch((err) => {
//                         if (index == 4 || 5) {

//                             console.log(err);
//                         }
//                     })
//                 }
//             })
//         };



//         reader.readAsArrayBuffer(file);
//     }
// }