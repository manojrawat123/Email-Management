import React, { useState, useContext, useEffect } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { DataContext } from '../../../context';
import BlackButton from '../../../component/Buttons/BlackButton';
import { API_BASE_URL } from '../../../config';
import Cookies from "js-cookie";

const RouteDeleteUpdate = () => {
    const [button, setButton ] = useState(false);
    const [excelSheet,setExcelSheet] = useState();
    const [routeId, setRouteId] = useState();

    const {
        searchPageOptionGetFunc,
        searchPageData, handleErrorsFunc
    } = useContext(DataContext);

    useEffect(() => {
        searchPageOptionGetFunc("top_route");
    }, [])

    return (
        <>
            <ToastContainer />
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
                                                Delete And Update Top Routes
                                            </h4>
                                        </div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            setButton(true);
                                            const formData = new FormData();
                                            formData.append("excel_sheet", excelSheet);
                                            formData.append("top_route_name", routeId);
                                            const token = Cookies.get('token')
                                            axios.post(`${API_BASE_URL}/toproute/` , formData, {
                                                headers : {
                                                    Authorization : `Bearer ${token}`
                                                } 
                                            }).then((value)=>{
                                                setRouteId("");
                                                toast.success("Route Updated Successfully!")
                                            }).catch((err)=>{
                                                handleErrorsFunc(err);
                                            }).finally(()=>{
                                                setButton(false);
                                            })
                                        }}>
                                            <div>
                                                <h4 className="font-semibold mb-2 text-gray-700 text-base">
                                                    { }{"Top Route Name"}
                                                    <span className="text-red-500">*</span>
                                                </h4>
                                                <div className={"w-full relative col-span-1 "}>
                                                    <InsertDriveFileIcon className={`absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`} />
                                                    <select name="" id=""
                                                        placeholder='Top Route Name'
                                                        required
                                                        value={routeId}
                                                        className={`pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 `}
                                                        onChange={(e)=>{
                                                            setRouteId(e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Please Select </option>
                                                        {searchPageData?.options?.map((element, index)=>{
                                                            return <option value={element.value}>{element.label}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-2 text-gray-700 text-base">
                                                    { }{"Top Route File"}
                                                    <span className="text-red-500">*</span>
                                                </h4>
                                                <div className={"w-full relative col-span-1 "}>
                                                    <InsertDriveFileIcon className={`absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`} />
                                                    <input type="file" accept=".xls, .xlsx, .csv, application/vnd.ms-excel"
                                                        onChange={(e) => {
                                                            setExcelSheet(e.target.files[0]);
                                                        }}
                                                        required
                                                        className={`pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 `}
                                                    />
                                                </div>
                                            </div>
                                            <BlackButton title={"Add Route"} button={button} />
                                        </form>
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

export default RouteDeleteUpdate
