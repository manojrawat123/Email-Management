import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import customerFieldsArr from './AddCustomerArr';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import genrateInitalValues from '../../../component/genrateInitalValues/GenrateInitalValues';
import generateValidationSchema from '../../../component/genrateValidationSchema/genrateValidationSchema';
import { API_BASE_URL } from '../../../config';
import { DataContext } from '../../../context';

const AddCustomer = () => {

    const initialValues = genrateInitalValues(customerFieldsArr);
    const validationSchema = generateValidationSchema(customerFieldsArr);
    const [addButton, setAddButton] = useState(false);
    const { authHeader, handleErrorsFunc } = useContext(DataContext);

    return (
        <div>
            <ToastContainer />
            <div className="w-[100%] py-10 bg-blue-50">
                <div className="sm:w-[80%] w-[90%]  mx-auto bg-white rounded-lg shadow-2xl border border-solid border-gray-300">
                    <h2 className="bg-gray-100  font-bold text-3xl py-4 px-6 mb-6 text-gray-800 text-center">
                        Add Customer
                    </h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            setAddButton(true);
                            axios.post(`${API_BASE_URL}/customer/`, values, authHeader).then((res)=>{
                            resetForm();
                            toast.success("Customer Added Successfully!!", {position : "top-center"});
                            }).catch((error)=>{
                                console.log(error);
                                handleErrorsFunc(error);
                            }).finally(()=>{
                                setAddButton(false);
                            })
                        }}
                    >
                        {({
                            values, resetForm, setFieldValue
                        }) => (
                            <Form>
                                <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
                                    {
                                        customerFieldsArr.map((element, index) => {
                                            return (<div className="" key={index}>
                                                <h4 className="font-semibold mb-2 text-gray-700">
                                                    {element.placeholder}{" "}
                                                    <span className="text-red-500">*</span>
                                                </h4>
                                                <div className={"w-full relative col-span-1 "}>
                                                    {element.icon}
                                                    <Field
                                                        // type={element.type}
                                                        name={element.name}
                                                        placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
                                                        required
                                                        className={"pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "}
                                                    />
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
                                        {addButton ? (
                                            <CircularProgress size={19} color="inherit" />
                                        ) : (
                                            "Add Customer"
                                        )}
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





//     <Formik
//     initialValues={initialValues}
//     onSubmit={addExperienceDetailsFunc}
//     validationSchema={validationSchema}
//   >
//     {({
//       values,
//       handleSubmit,
//       resetForm,
//       setFieldValue
//     }) => (
//       <Form encType="multipart/form-data">
//         <div className="mb-4 grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
//           {JobExperienceInputArr.map((element, index) => {
//             return (
//               <div className="" key={index}>
//                 <h4 className="text-blue-600 mb-2">
//                     {element.placeholder}{" "}
//                   <span className="text-red-500">*</span>
//                 </h4>
//                 <div className={"w-full relative col-span-1 "}>
//                   {element.icon}
//                   <Field
//                     type={element.type}
//                     name={element.name}
//                     placeholder={element.name == 'title' ? element.helpingtext : element.placeholder}
//                     required
//                     className={"pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "}
//                   />
//                 </div>
//                 <ErrorMessage
//                   name={element.name}
//                   component="div"
//                   className="text-red-500"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </Form>
//     )}
//   </Formik>
export default AddCustomer
