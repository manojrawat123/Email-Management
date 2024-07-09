import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context'
import rate_email_arr from './RateEmailArr';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import DynamicForm from '../../CommonComponent/DynamicForm/DynamicForm';
import RateEmailConfirmForm from './RateConfirmEmail/RateConfirm';

const RateEmail = () => {

    const { emailSenderPageFunc, emailSenderPageObj } = useContext(DataContext);
    const [isAllCountry, setIsAllCountry] = useState(true);

    useEffect(() => {
        emailSenderPageFunc();
    }, [])

    if (!emailSenderPageObj) {
        return <Loading />
    }

    const updateRateEmailArr = rate_email_arr.map((element, index) => {
        if (element.type == "dynamic_option" || element.type == "dynamic_select") {
            if (element.name == "template_id") {
                element["option"] = emailSenderPageObj?.email_template?.map((values, idx) => {
                    values["label"] = values.TemplateName
                    values["id"] = values.TemplateID
                    return values;
                });
            }

            if (element.name == "customer_id") {
                element['option'] = emailSenderPageObj?.customer_data?.map((values, index) => {
                    values["label"] = values.customer_name
                    return values;
                });
            }

            if (element.name == "rate_id") {
                element['option'] = emailSenderPageObj?.customer_rate?.map((values, index) => {
                    values["label"] = values?.rate_name
                    values["customer_id"] = values?.customer_id
                    return values;
                });
            }

            if (element.name == "country") {
                element["option"] = emailSenderPageObj?.rate_list?.map((value) => {
                    return {
                        id: value,
                        label: value
                    }
                })
            }
        }
        return element;
    });

    return (
        <>
            <DynamicForm
                form_array={updateRateEmailArr}
                isAllCountry={isAllCountry} setIsAllCountry={setIsAllCountry} EmailConfirmForm={RateEmailConfirmForm} emailSenderPageObj={emailSenderPageObj}
            />
        </>

    )
}

export default RateEmail
