import React, { useContext, useEffect } from 'react'
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';

import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import topRouteTabelArr from './TopRouteDisplayArr';


const DisplayTopRoutes = () => {

    const { getTopRouteFunc, topRouteTable, setTopRouteTable } = useContext(DataContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get("search");

    const query = {
        route_id : search
    };

    useEffect(() => {
        getTopRouteFunc(query);
    }, []);

    if (!topRouteTable) {
        return <Loading />
    }

    return (
        <div>
            <CustomTabel
                getFunc={getTopRouteFunc}
                tabelObj={topRouteTable?.normal_data}
                topTableHeading={topRouteTabelArr}
                key={1}
                EditModal={CustomEditModal}
                url_route={"addroute"}
                title={"Top Route Detail"}
                query={query}
    />
        </div>
    )
}

export default DisplayTopRoutes;
