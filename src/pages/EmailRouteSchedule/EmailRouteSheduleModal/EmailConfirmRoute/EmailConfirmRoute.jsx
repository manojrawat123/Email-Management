import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Select from "react-select";
import { Check } from '@mui/icons-material';
// import EmailLastConfirm from '../../../CommonComponent/DynamicForm/ConfirmEmailModal/EmailLastConfirm';
import emailScheduleConfirmArr from './EmailConfirmRouteArr';
import genrateInitalValues from '../../../../component/genrateInitalValues/GenrateInitalValues';
import { DataContext } from '../../../../context';
import Loading from '../../../../component/LoadingSpinner/LoadingSpinner';
import { format } from "date-fns";
import EmailLastConfirm from '../../../../CommonComponent/DynamicForm/ConfirmEmailModal/EmailLastConfirm';

const RouteEmailScheduleConfirm = ({ setIsModalOpen, data, resetFunction }) => {
    const initialValues = genrateInitalValues(emailScheduleConfirmArr);
    // const validationSchema = generateValidationSchema(emailScheduleConfirmArr);
    const [addButton, setAddButton] = useState(false);
    const { emailSenderPageObj, getTopRouteFunc, topRouteTable, setTopRouteTable } = useContext(DataContext);
    const [showConfirmEmail, setShowConfirmEmail] = useState(false);
    const [lastData, setLastData] = useState();

    const formik = useFormik({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            setLastData(values);
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

    useEffect(() => {
        if (data.schedule_route_id != "") {
            getTopRouteFunc({
                route_id: data.schedule_route_id
            });

        }
        else {
            setTopRouteTable([]);
        }
    }, []);

    if (!topRouteTable) {
        return <Loading />
    }

    return (
        <div>
            {showConfirmEmail ? <EmailLastConfirm resetFunction={resetFunction} setShowConfirmEmail={setShowConfirmEmail} lastData={lastData} setIsModalOpen={setIsModalOpen} route={"emailshedule"} success_message={"Email Schedule Successfully!"}/> : null}
            <div className="w-[100%]">
                <div className="sm:w-[80%] w-[90%] mx-auto bg-white rounded-lg shadow-2xl border border-t-0 border-solid border-gray-300">
                    <h2 className="font-bold text-3xl  px-6  text-gray-800 text-center">
                       Routes Schedule For <span className='font-semibold text-xl'> {data.schedule_date_time ? format(new Date(data.schedule_date_time), 'dd MMMM yyyy HH:mm') : null}
                        </span>      </h2>
                    <form onSubmit={formik.handleSubmit} className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                            {emailScheduleConfirmArr.map((element, index) => (
                                <div className="" key={index}>
                                    <h4 className="font-semibold mb-2 text-gray-700 flex">
                                        {element.placeholder}{" "}
                                        <span className="text-red-500 mr-auto">*</span>
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
                                            readOnly={true}
                                            className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                                                null
                                        }
                                    </div>
                                    {formik.touched.username && formik.errors.username && (
                                        <p className="text-red-500 text-xs italic">{formik.errors.username}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='ml-4'>
                            <h1 className='font-bold'>To</h1>
                            {data.customer_names.map((element) => {
                                return <h1 className='font-semibold ml-4'> {element}</h1>
                            })}
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
                                    "Schedule Email"
                                )}
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    );
};

export default RouteEmailScheduleConfirm;