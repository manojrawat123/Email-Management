import { CircularProgress } from '@mui/material'
import React from 'react'

const BlackButton = ({ button, title, mb }) => {
    return (
        <div className={`pb-1 pt-1 text-center ${mb ? mb : 'mb-12'}`}>
            <button
                className={`mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 font-semibold mt-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]`}
                type="submit"  // Change to type="button" to prevent form submission
                data-te-ripple-init
                data-te-ripple-color="light"
                style={{
                    background: "black",
                }}
            >
                {button ? <CircularProgress size={19} color='inherit'/> : title}
            </button>
        </div>
    )
}

export default BlackButton
