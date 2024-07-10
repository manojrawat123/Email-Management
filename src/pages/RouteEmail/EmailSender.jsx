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
import BlackBtnTypeBtn from '../../component/Buttons/BlackBtnTypeBtn';
import EmailSenderModal from '../../CommonComponent/DynamicForm/ConfirmEmailModal/EmailSenderModal';
import EmailConfirmForm from './EmailConfirmForm/EmailConfirmForm';


const emailSenderFormArr = [
  {
    'type': 'option',
    'id': 'template_id',
    'name': 'template_id',
    'required': true,
    'placeholder': 'Template',
    // 'icon': <Phone className={iconCss} />
  },
  {
    'type': 'select',
    'id': 'customer_id',
    'name': 'customer_id',
    'required': true,
    'placeholder': 'Customer',
    // 'icon': <Phone className={iconCss} />
  },
  {
    'type': 'option',
    'id': 'top_routes',
    'name': 'top_routes',
    'required': true,
    'placeholder': ' Top Route',
    // 'icon': <Phone className={iconCss} />
  },
  // {
  //   'type': 'file',
  //   'id': 'attachement',
  //   'name': 'attachement',
  //   'required': true,
  //   'placeholder': '',
  // },
]

const EmailSenderForm = () => {

  const { emailSenderPageFunc, emailSenderPageObj } = useContext(DataContext);
  const [loading, setLoading] = useState();
  const initialValues = genrateInitalValues(emailSenderFormArr);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [attachement, setAttachement] = useState();
  const [resetFunction, setResetFunction] = useState();
  const [fieldValueFunc, setFieldValueFunc] = useState();


  useEffect(() => {
    emailSenderPageFunc();
  }, []);

  if (!emailSenderPageObj) {
    return <Loading />
  }

  return (
    loading ? <Loading /> : <>
      <ToastContainer />
      <EmailSenderModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} data={data} EmailConfirmForm={EmailConfirmForm} resetFunction={resetFunction} fieldValueFunc={fieldValueFunc} setLoading={setLoading} />
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
                        Send Top Route
                      </h4>
                    </div>
                    <Formik
                      initialValues={initialValues}
                      // validationSchema={validationSchema}
                      onSubmit={(values, { resetForm, setFieldValue }) => {
                        setResetFunction(() => resetForm);
                        setFieldValueFunc(() => setFieldValue);
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
                                  if (element.name == "template_id") {
                                    const tempObj = emailSenderPageObj?.email_template?.find(emailEl => emailEl.TemplateID == e.target.value);

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
                                <option value="">{"Please Select"}</option>
                                {element.name == "template_id" ? emailSenderPageObj.email_template?.map((values, idx) => (
                                  <option key={idx} value={values?.TemplateID}>{values?.TemplateName}</option>
                                )) : null}
                                {
                                  element.name == "top_routes" ? emailSenderPageObj?.route_list?.map((values, idx) => {
                                    return <option value={values}>{values}</option>
                                  }) : null
                                }
                              </Field>
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
                            </div>
                          ))}
                          <BlackButton title={"Submit"} button={false} />
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