import React, { useContext, useEffect, useState } from 'react';
import BlackButton from '../../component/Buttons/BlackButton';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import genrateInitalValues from '../../component/genrateInitalValues/GenrateInitalValues';
import generateValidationSchema from '../../component/genrateValidationSchema/genrateValidationSchema';
import Select from "react-select";
import { Phone } from '@mui/icons-material';
import { DataContext } from "../../context"
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import { ToastContainer, toast } from 'react-toastify';
import EmailSenderModal from './EmailSenderModal/EmailSenderModal';
import BlackBtnTypeBtn from '../../component/Buttons/BlackBtnTypeBtn';


const emailSenderFormArr = [
  {
    'type': 'option',
    'id': 'template_id',
    'name': 'template_id',
    'required': true,
    'placeholder': 'Select Template',
    // 'icon': <Phone className={iconCss} />
  },
  {
    'type': 'select',
    'id': 'customer_id',
    'name': 'customer_id',
    'required': true,
    'placeholder': 'Enter Company Phone',
    // 'icon': <Phone className={iconCss} />
  },
  {
    'type': 'option',
    'id': 'top_routes',
    'name': 'top_routes',
    'required': true,
    'placeholder': 'Select Top Route',
    // 'icon': <Phone className={iconCss} />
  },
  {
    'type': 'file',
    'id': 'attachement',
    'name': 'attachement',
    'required': true,
    'placeholder': '',
  },
]

const EmailSenderForm = () => {

  const { emailSenderPageFunc, emailSenderPageObj } = useContext(DataContext);
  const [button, setButton] = useState();
  const initialValues = genrateInitalValues(emailSenderFormArr);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [dataType, setDataType] = useState(1);
  const [attachement, setAttachement] = useState();

  useEffect(() => {
    emailSenderPageFunc();
  }, []);

  if (!emailSenderPageObj) {
    return <Loading />
  }


  return (
    <>
      <ToastContainer />
      <EmailSenderModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} data={data} />
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
                        Send Email
                      </h4>
                    </div>
                    <Formik
                      initialValues={initialValues}
                      // validationSchema={validationSchema}
                      onSubmit={(values) => {
                        setData(prevData => { return { ...prevData, ...values, attachement } });
                        setIsModalOpen(true);
                      }
                      }
                    >
                      {({
                        values, resetForm, setFieldValue
                      }) => (
                        <Form>
                          {emailSenderFormArr.map((element, index) => (
                            <div key={index} className="mt-4">
                              {
                                element.name == "top_routes" ? <div className='font-semibold my-4'>
                                  <button
                                    type='button'
                                    className={`${dataType == 1 ? 'bg-black text-white' : 'border border-black'}  rounded py-1 px-2  mx-2 `} onClick={() => {
                                      setDataType(1);
                                      setFieldValue("top_routes", "")
                                    }}>
                                    Select Excel File
                                  </button>
                                  <button
                                    type='button'
                                    className={`${dataType == 2 ? 'bg-black text-white' : 'border border-black'}  rounded py-1 px-2  mx-2 `} onClick={() => {
                                      setDataType(2);
                                    }} >Select Existing
                                  </button>
                                </div>
                                  : null}
                              {element.label && <label htmlFor={element.name} className="block mb-2 font-bold">{element.label}</label>}
                              {element.type === "option" && (
                                dataType == 2 || element.name == "template_id" ? <Field
                                  as="select"
                                  id={element.name}
                                  name={element.name}
                                  required
                                  onChange={(e) => {
                                    setFieldValue(element.name, e.target.value);
                                    if (element.name == "template_id") {
                                      const tempObj = emailSenderPageObj?.email_template?.find(emailEl => emailEl.TemplateID == e.target.value)
                                      console.log(tempObj);
                                      setData({
                                        ...data,
                                        header: tempObj.TemplateMessage,
                                        body: tempObj.TemplateBody
                                      });
                                    }
                                  }}
                                  className='w-[100%] h-[2.3rem] outline-blue-600 border-2 rounded'
                                >
                                  <option value="">{element.placeholder}</option>
                                  {element.name == "template_id" ? emailSenderPageObj.email_template?.map((values, idx) => (
                                    <option key={idx} value={values?.TemplateID}>{values?.TemplateName}</option>
                                  )) : null}
                                  {
                                    element.name == "top_routes" ? emailSenderPageObj?.route_list?.map((values, idx) => {
                                      return <option value={values}>{values}</option>
                                    }) : null
                                  }
                                </Field> : null
                              )}
                              {element.type === "select" && (
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
                                  }}
                                  placeholder="Select a Customer"
                                  required
                                />
                              )}

                              {element.type === "file" && dataType == 1 ?
                                <input
                                  type="file"
                                  accept=".xls, .xlsx, .csv, application/vnd.ms-excel"
                                  className='w-[100%] h-[2.3rem] outline-blue-600 border-2 rounded'
                                  onChange={(e) => {
                                    console.log(e.target.files[0]);
                                    setAttachement(e.target.files[0]);
                                  }}
                                  required
                                />
                                : null}
                            </div>
                          ))}

                          {/* Customer Id input */}

                          {/* Submit button */}
                          {/* <BlackBtnTypeBtn title={"Send Email"} button={false} func={()=>{
                          setIsModalOpen(true);
                        }} />  */}

                          <BlackButton title={"Send Email"} button={button} />

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

export default EmailSenderForm