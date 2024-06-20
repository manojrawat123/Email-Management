import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import display_dispute_arr from './DisplayDisputeArr';


const DisputeDisplay = () => {

    const location = useLocation();
    const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());

    const {
        getDisputeSearchFunc,
        disputeObj
    } = useContext(DataContext);

    useEffect(() => {
        getDisputeSearchFunc(queryParams);
    }, []);

    if (!disputeObj) {
        return <Loading />
    }

    return (
        <div>
            <CustomTabel
                getFunc={getDisputeSearchFunc}
                tabelObj={disputeObj}
                topTableHeading={display_dispute_arr}
                key={1}
                EditModal={CustomEditModal}
                url_route={"dispute"}
                title={"Dispute Detail"}
                query={queryParams}
            />
        </div>
    )

}

export default DisputeDisplay
