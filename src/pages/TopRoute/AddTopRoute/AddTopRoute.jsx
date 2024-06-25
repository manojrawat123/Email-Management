import React, { useContext, useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../config';
import BlackButton from '../../../component/Buttons/BlackButton';
import { DataContext } from '../../../context';
import { Field, Form, Formik } from 'formik';

const AddTopRoute = () => {
    const [button, setButton] = useState(false);
    const [excel_file, setExcelSheet] = useState(null);
    const [topRoute, setTopRouteName] = useState('');
    const { handleErrorsFunc } = useContext(DataContext);

    const handleSubmit = (values, { resetForm }) => {
        setButton(true);
        const formData = new FormData();
        formData.append('excel_sheet', excel_file);
        formData.append('route_name', topRoute);
        
        const token = Cookies.get('token');
        axios.post(`${API_BASE_URL}/addroute/`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            toast.success("Route Added Successfully!!");
            resetForm();
        }).catch((error) => {
            handleErrorsFunc(error);
        }).finally(() => {
            setButton(false);
        });
    };

    return (
        <>
            <ToastContainer />
            <section className="gradient-form h-[100vh] bg-neutral-200 dark:bg-neutral-700 font-semibold text-gray-700">
                <div className=" h-full p-10">
                    <div className="flex h-full flex-wrap items-center justify-center text-gray-700 dark:text-neutral-200 md:w-[55%] mx-auto">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-xl dark:bg-neutral-800">
                                <div className="px-4 md:px-0">
                                    <div className="md:mx-6 md:p-12">
                                        <div className="text-center">
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-bold">
                                                Add Top Routes
                                            </h4>
                                        </div>
                                        <Formik
                                            initialValues={{
                                                route_name: '',
                                                excel_sheet: null
                                            }}
                                            onSubmit={handleSubmit}
                                        >
                                             {({ values, handleSubmit, resetForm, setFieldValue, handleBlur }) => (
                                            <Form>
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-gray-700 text-base">
                                                        Top Route Name
                                                        <span className="text-red-500">*</span>
                                                    </h4>
                                                    <div className="w-full relative col-span-1">
                                                        <InsertDriveFileIcon className="absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700" />
                                                        <Field
                                                            type="text"
                                                            name="route_name"
                                                            onChange={(e) => {
                                                                setFieldValue('route_name', e.target.value);
                                                                setTopRouteName(e.target.value);
                                                            }}
                                                            placeholder="Top Route Name"
                                                            required
                                                            className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-2 text-gray-700 text-base">
                                                        Top Route File
                                                        <span className="text-red-500">*</span>
                                                    </h4>
                                                    <div className="w-full relative col-span-1">
                                                        <InsertDriveFileIcon className="absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700" />
                                                        <Field
                                                            type="file"
                                                            name="excel_sheet"
                                                            onChange={(e) => {
                                                                setExcelSheet(e.target.files[0]);
                                                            }}
                                                            accept=".xls, .xlsx, .csv, application/vnd.ms-excel"
                                                            required
                                                            className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                                        />
                                                    </div>
                                                </div>
                                                <BlackButton title="Add Route" button={button} />
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
    );
};

export default AddTopRoute;
