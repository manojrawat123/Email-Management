import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import Select from "react-select";
import { Phone } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import genrateInitalValues from '../../component/genrateInitalValues/GenrateInitalValues';
import BlackButton from '../../component/Buttons/BlackButton';
import { DataContext } from '../../context';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import emailScheduleArr from './EmailScheduleArr';
import EmailSenderModal from '../../CommonComponent/DynamicForm/ConfirmEmailModal/EmailSenderModal';
import RouteEmailScheduleConfirm from './EmailRouteSheduleModal/EmailConfirmRoute/EmailConfirmRoute';



const EmailRouteShedule = () => {

    const { emailSenderPageFunc, emailSenderPageObj } = useContext(DataContext);
    const [button, setButton] = useState();
    const initialValues = genrateInitalValues(emailScheduleArr);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState();
    const [resetForm, setResetForm] = useState();

    useEffect(() => {
        emailSenderPageFunc();
    }, []);

    if (!emailSenderPageObj) {
        return <Loading />
    }

    return (
        <>
            <ToastContainer />
            <EmailSenderModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} data={data} EmailConfirmForm={RouteEmailScheduleConfirm} resetFunction={resetForm} />
            <section className="gradient-form h-[100vh] bg-neutral-200 dark:bg-neutral-700 font-semibold text-gray-700">
                <div className=" h-full p-10">
                    <div className="flex h-full flex-wrap items-center justify-center text-gray-700 dark:text-neutral-200 md:w-[55%] mx-auto">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800">
                                {/* Left column container */}
                                <div className="px-4 md:px-0">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-bold">
                                                Send Top Route Email
                                            </h4>
                                        </div>
                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={(values, { resetForm }) => {
                                                setData(prevData => { return { ...prevData, ...values } });
                                                setResetForm(resetForm);

                                                setIsModalOpen(true);
                                            }}
                                        >
                                            {({
                                                values, resetForm, setFieldValue
                                            }) => (
                                                <Form>
                                                    {emailScheduleArr.map((element, index) => (
                                                        <div key={index} className="mt-4">
                                                            <h4 className="font-semibold mb-2 text-gray-700">
                                                                {element.placeholder}{" "}
                                                                <span className="text-red-500">*</span>
                                                            </h4>
                                                            {element.label && <label htmlFor={element.name} className="block mb-2 font-bold">{element.label}</label>}
                                                            {element.type === "option" && (<Field
                                                                as="select"
                                                                id={element.name}
                                                                name={element.name}
                                                                required
                                                                onChange={(e) => {
                                                                    setFieldValue(element.name, e.target.value);
                                                                    if (element.name == "schedule_template") {
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

                                                                }}
                                                                className='w-[100%] h-[2.3rem] outline-blue-600 border-2 rounded'
                                                            >
                                                                <option value="">{element.placeholder}</option>
                                                                {element.name == "schedule_template" ? emailSenderPageObj.email_template?.map((values, idx) => (
                                                                    <option key={idx} value={values?.TemplateID}>{values?.TemplateName}</option>
                                                                )) : null}
                                                                {
                                                                    element.name == "schedule_route_id" ? emailSenderPageObj?.route_list?.map((values, idx) => {
                                                                        return <option value={values}>{values}</option>
                                                                    }) : null
                                                                }
                                                            </Field>
                                                            )}
                                                            {element.type === "dynamic_select" && (
                                                                <Select
                                                                    options={emailSenderPageObj?.customer_data?.map((customer, idx) => ({
                                                                        value: customer.id,
                                                                        label: customer.customer_name
                                                                    }))}
                                                                    isSearchable={true}
                                                                    isMulti
                                                                    isClearable={true}
                                                                    onChange={(selectedOptions) => {
                                                                        const selectedValues = selectedOptions.map(option => option.value);
                                                                        setFieldValue(element.name, selectedValues);
                                                                        const customerObj = emailSenderPageObj?.customer_data?.map(emailEl => {
                                                                            if (selectedValues.includes(emailEl.id)) {
                                                                                return emailEl.customer_name;
                                                                            }
                                                                        });
                                                                        console.log(customerObj);
                                                                        setData({
                                                                            ...data,
                                                                            "customer_names": customerObj
                                                                        });
                                                                    }}
                                                                    placeholder="Select a Customer"
                                                                    required
                                                                />
                                                            )}

                                                            {!["option", "select", "dynamic_select"].includes(element.type) ? <Field
                                                                type={element.type}
                                                                id={element.name}
                                                                name={element.name}
                                                                required
                                                                min={new Date().toISOString().slice(0, 16)}
                                                                className='w-[100%] h-[2.3rem] outline-blue-600 border-2 rounded'
                                                            ></Field> :
                                                                null
                                                            }
                                                        </div>
                                                    ))}
                                                    <BlackButton title={"Schedule Email"} button={button} />
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmailRouteShedule