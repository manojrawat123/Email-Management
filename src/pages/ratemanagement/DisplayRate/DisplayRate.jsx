import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import topTableHeading from './RateArr';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';


const DisplayRate = () => {

    const { getRateSearchFunction, filterRate } = useContext(DataContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("search");

    useEffect(() => {
        getRateSearchFunction({ country_name: query });
    }, []);

    if (!filterRate){
        return <Loading />
    }

    return (
        <div>
            <CustomTabel 
                getFunc={getRateSearchFunction} 
                tabelObj={filterRate} 
                topTableHeading={topTableHeading}
                key={1}
                EditModal={CustomEditModal}
                title={"Rate Search Result"}
                url_route={"rate-update-delete"} 
                query={{ "country_name" : query }}
        />
        </div>
    )
}

export default DisplayRate
