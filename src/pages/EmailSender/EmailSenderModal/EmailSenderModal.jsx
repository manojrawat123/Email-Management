import React from 'react'
import EmailConfirmForm from './EmailConfirmForm/EmailConfirmForm';
import { Close } from '@mui/icons-material';
import Modal from 'react-modal';

const EmailSenderModal = (props) => {
  return (
    <Modal
    isOpen={
        props?.isModalOpen
    }
    onRequestClose={() =>
        props.setIsModalOpen(false)
    }
    style={{ border: "2px solid blue", borderRadius: "1rem" }}
>

    <div style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        cursor: 'pointer',
        
    }} onClick={()=>{
        props.setIsModalOpen(false);
    }}
    className="hover:bg-red-500 hover:text-white text-red p-4">
        <Close />
    </div>
    <EmailConfirmForm setIsModalOpen={props.setIsModalOpen} data={props.data}/>
</Modal>
  )
}

export default EmailSenderModal
