import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../context';
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import { useLocation } from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import FirstNameIcon from "@mui/icons-material/Person";
import LastNameIcon from "@mui/icons-material/Person";

const DisplayIp = () => {

    const { getDisplayIpAddressGetFunc,
        displayIpAddressObj } = useContext(DataContext);

    const location = useLocation();
    const queryParams = Object.fromEntries(new URLSearchParams(location.search).entries());

    useEffect(()=>{
        getDisplayIpAddressGetFunc(queryParams);
    },[]);

    const iconCss = `absolute top-2 border-r border-black peer-focus:text-violet-700 left-1 text-gray-700`;

    const displayIPArr = [
        {
            label: "Customer Name",
            placeholder: "Customer Name",
            name: "customer_name",
            display : true,
            required: false,
            // value: "Default",
            icon: <PersonIcon className={iconCss} />
        },
        {
            label: "User Ip",
            placeholder: "User Ip",
            name: "ip_address",
            display : true,
            required: true,
            // value: "Default",
            icon: <PersonIcon className={iconCss} />
        },
        {
            label: "Added Date",
            placeholder: "Added Date",
            name: "added_date",
            display : true,
            required: true,
            type : "date",
            // value: "Default",
            icon: <PersonIcon className={iconCss} />
        },
        {
            label: "Action",
            placeholder: "Action",
            // value: "Default",
            required: false,
            display : true,
        }
    ]
  return (
    <div>
      <CustomTabel
      
      getFunc={getDisplayIpAddressGetFunc}
                tabelObj={displayIpAddressObj}
                topTableHeading={displayIPArr}
                key={1}
                EditModal={CustomEditModal}
                url_route={"userip"}
                title={"Customer Ip"}
                query={queryParams}/>
    </div>
  )
}

export default DisplayIp
