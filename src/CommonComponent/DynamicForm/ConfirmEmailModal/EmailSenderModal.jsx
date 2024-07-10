import React from 'react'
import { Close } from '@mui/icons-material';
import Modal from 'react-modal';

const EmailSenderModal = ({ isModalOpen, data, setIsModalOpen, EmailConfirmForm, isAllCountry, setIsAllCountry, form_array,fieldValueFunc, resetFunction, setLoading }) => {

    return (
        <Modal
            isOpen={
                isModalOpen
            }
            onRequestClose={() =>
                setIsModalOpen(false)
            }
            style={{ border: "2px solid blue", borderRadius: "1rem" }}
        >

            <div style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                cursor: 'pointer',

            }} onClick={() => {
                setIsModalOpen(false);
            }}
                className="hover:bg-red-500 hover:text-white text-red p-4">
                <Close />
            </div>
            {<EmailConfirmForm  resetFunction={resetFunction} setIsModalOpen={setIsModalOpen} data={data} isAllCountry={isAllCountry} setIsAllCountry={setIsAllCountry} form_array={form_array} fieldValueFunc={fieldValueFunc} setLoading={setLoading}/>}
        </Modal>
    )
}

export default EmailSenderModal
