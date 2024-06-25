import React, { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
// import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
// import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
// import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import display_user_arr from './DisplayUserArr';
import CustomTabel from '../../CommonComponent/Tabels/Tabel';
import CustomEditModal from '../../CommonComponent/EditForms/EditModal';
import Loading from '../../component/LoadingSpinner/LoadingSpinner';
import { DataContext } from '../../context';


const DisplayUser = () => {
   
    const {
        getAllUserFunc ,
        allUser
    } = useContext(DataContext);    

    console.log(allUser);

    useEffect(() => {
        getAllUserFunc();
    }, []);

    if (!allUser){
        return <Loading />
    }

    return (
        <div>
            <CustomTabel
                getFunc={getAllUserFunc} 
                tabelObj={allUser} 
                topTableHeading={display_user_arr}
                key={1}
                EditModal={CustomEditModal}
                url_route={"myuser"} 
                title={"User Detail"}
                // query={{ "country_name" : query }}
        />
        </div>
    )
}

export default DisplayUser;
