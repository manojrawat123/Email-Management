import React, { useContext, useEffect, useState } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';

import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import displayCustomerHeading from './DisplayCustomerArr';
import months_arr from '../../../data/month';
import PersonIcon from '@mui/icons-material/Person';
import BlackButton from '../../../component/Buttons/BlackButton';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import Cookies from "js-cookie";


const DisplayCustomer = () => {

    const { customerObject, getCustomerFunction ,setCustomerObjectList} = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [monthObj, setMonthObj] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getCustomerFunction();
    }, []);

    if (!customerObject) {
        return <Loading />
    }
    console.log(customerObject);

    const yearArr = [];
    for (let i = new Date().getFullYear(); i >= new Date().getFullYear() - 10; i--) {
        yearArr.push(i);
    }

    return (
        <div>
            {
        isLoading ?
          <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
            <Loading />
          </div> : null
      }
            <div className=' m-4  flex item-center justify-center'>
                <form action="" className='border rounded-xl p-4' onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    const month = e.target.month.value;
                    const year = e.target.year.value;
                    const customer = e.target.customer.value;

                    const url = new URLSearchParams({
                        from_date: `${year}-${month}-01`,
                        to_date: `${year}-${month}-${e.target.month == '02' ? e.target.year.value % 4 == 0 ? "29" : "28" : monthObj.max}`,
                        customer: customer
                    });

                    navigate(`/showcustomer/?${url}`);
                    const token = Cookies.get('token');
                    axios.get(`${API_BASE_URL}/customer/?${url}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((value) => {
                        setCustomerObjectList(value.data);
                        console.log(value);
                    }).catch((err) => {
                        console.log(err);
                    }).finally(()=>{
                        setIsLoading(false);
                    });
                }}>
                    <div className='grid grid-cols-3 gap-10  '>
                        <div>
                            <select name="month" id=""

                                className=" w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                required
                                onChange={(e) => {
                                    const selectedMonth = months_arr.find(mel => mel.number == e.target.value);
                                    console.log(selectedMonth);
                                    setMonthObj(selectedMonth);
                                }}
                            >
                                <option value="">Select Month</option>
                                {months_arr.map((el) => {
                                    return <option value={el.number}>{el.value}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <select name="year" id=""
                                className=" w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                required
                            >
                                <option value="">Select Year</option>
                                {yearArr.map((el) => {
                                    return <option value={el}>{el}</option>
                                })}

                            </select>
                        </div>
                        <div className='w-full relative col-span-1'>
                            <input type="text"
                                placeholder='Search Customer'
                                name='customer'
                                className="pl-9 w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                required
                            />
                            <PersonIcon className={'absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700'} />
                        </div>
                    </div>

                    <div className='text-center'>
                        <BlackButton button={false} title={"Search"} mb={"2"} />
                    </div>
                </form>
            </div>

            <CustomTabel
                getFunc={getCustomerFunction}
                tabelObj={customerObject}
                topTableHeading={displayCustomerHeading}
                key={1}
                EditModal={CustomEditModal}
                url_route={"customer"}
                title={"Customer Detail"}
            // query={{ "country_name" : query }}
            />
        </div>
    )
}

export default DisplayCustomer;
