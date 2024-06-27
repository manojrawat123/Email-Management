import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../../context'
import addVendorRateArr from './AddVendorRateArr';
import CustomForms from '../../../CommonComponent/CutomForms/CustomForms';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';

const AddVendorRate = () => {

  const {
    addVenderRatePageFunc,
    vendorRatePage
  } = useContext(DataContext);

  useEffect(() => {
    addVenderRatePageFunc()
  }, []);

  if (!vendorRatePage) {
    return <Loading />
  }

  const updatedArr = addVendorRateArr.map((element, index) => {
    if (element.type == "dynamicoption") {
      if (element.name == "customer_id") {
        element["option"] = vendorRatePage?.customer?.map((element, index) => {
          return {
            "label": element.customer_name,
            "value": element.id
          }
        })
      }
      if (element.name == "vendor_rate_id") {
        element["option"] = vendorRatePage?.vendor_rate_tabel.map((element, index) => {
          return {
            "label": element.vendor_rate_name,
            "value": element.id,
            "customer_id": element.customer_id
          }
        })
      }
    }
    return element;
  });

  return (
    <>
      <CustomForms fieldsArr={updatedArr} route_name={"addvendorratepage"} title={"Add Vendor Rate"} />
    </>
  )
}

export default AddVendorRate
