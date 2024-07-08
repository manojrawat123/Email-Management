import React, { useContext, useEffect, useState } from 'react';
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import Select from "react-select";
import displayVendorTargetSheetArr from './DisplayVendorTargetSheetArr';

const DisplayVendorTargetSheet = () => {
    const { getVendorTagetSheetFunction, vendorTargetSheet } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const t_query = Object.fromEntries(new URLSearchParams(location.search).entries());
    const [query, setQuery] = useState(t_query);
    const [tempDisplayArr, setTempDisplayArr] = useState(displayVendorTargetSheetArr);

    useEffect(() => {
        getVendorTagetSheetFunction(query);
    }, []);

    useEffect(() => {
        if (vendorTargetSheet && vendorTargetSheet.data) {
            const highestLCRGetFunc = (m_obj) => {
                let temp_highestLCRKeysSet = [];
                const tempArr = [];

                m_obj.forEach((obj) => {
                    Object.keys(obj).forEach((key) => {
                        if (key.startsWith("LCR") && !tempArr.includes(key)) {
                            tempArr.push(key);
                        }
                    });

                    if (tempArr.length > temp_highestLCRKeysSet.length) {
                        temp_highestLCRKeysSet = tempArr;
                    }
                });

                return temp_highestLCRKeysSet;
            };

            const newDisplayArr = [...displayVendorTargetSheetArr];
            highestLCRGetFunc(vendorTargetSheet.data).forEach((element) => {
                newDisplayArr.push({
                    label: element,
                    placeholder: element,
                    display: true,
                    name: element,
                });
            });
            setTempDisplayArr(newDisplayArr);
        }
    }, [vendorTargetSheet]);

    if (!vendorTargetSheet) {
        return <Loading />;
    }

    console.log(vendorTargetSheet);

    return (
        <div>
            <div className='w-full md:w-[50%] mx-auto'>
                <Select
                    options={vendorTargetSheet.country_list ? vendorTargetSheet.country_list.map((el) => {
                        return {
                            value: el,
                            label: el
                        };
                    }) : vendorTargetSheet.country_code.map((el) => {
                        return {
                            value: el,
                            label: el
                        };
                    }) }
                    isSearchable={true}
                    isClearable={true}
                    onChange={(selectedOptions) => {
                        console.log(location.pathname);
                        let url;
                        if (!isNaN(parseFloat(selectedOptions.value))){
                            url = new URLSearchParams({ "country_code": selectedOptions.value });
                        } 
                        else {
                            url = new URLSearchParams({ "country_name": selectedOptions.value });
                        }
                        getVendorTagetSheetFunction(url);
                        setQuery(url);
                        navigate(`/display-vendor-target-sheet/?${url}`);
                    }}
                    placeholder={"Search By Country or Country Code"}
                    required
                />
            </div>
            <CustomTabel
                getFunc={getVendorTagetSheetFunction}
                tabelObj={vendorTargetSheet.data.slice(0, 51)}
                topTableHeading={tempDisplayArr}
                key={1}
                EditModal={CustomEditModal}
                title={"Vendor Rate Search Result"}
                url_route={"vendorratesearch"}
                query={query}
            />
        </div>
    );
};

export default DisplayVendorTargetSheet;
