import React from 'react'

const NoDataPage = ({ noDataMessage, noDataSubmessage, height }) => {
    return (
        <div className={`flex items-center justify-center bg-gray-100 rounded-xl ${height}` }>
            <div>
                <div className='text-xl font-bold text-gray-800 text-center'> {noDataMessage}</div>
                <div className='text-xl font-semibold text-gray-700 text-center'> {noDataSubmessage}</div>
            </div>
        </div>
    )
}

export default NoDataPage
