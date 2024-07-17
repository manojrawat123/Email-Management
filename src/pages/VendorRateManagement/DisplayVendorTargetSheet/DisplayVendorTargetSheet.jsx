import React, { useContext, useEffect, useState } from 'react';
import CustomTabel from '../../../CommonComponent/Tabels/Tabel';
import { DataContext } from '../../../context';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomEditModal from '../../../CommonComponent/EditForms/EditModal';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import Select from "react-select";
import displayVendorTargetSheetArr from './DisplayVendorTargetSheetArr';
import BlackBtnTypeBtn from '../../../component/Buttons/BlackBtnTypeBtn';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ArrowForward, ArrowForwardIos } from '@mui/icons-material';


const DisplayVendorTargetSheet = () => {

    const { getVendorTagetSheetFunction, vendorTargetSheet } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const t_query = Object.fromEntries(new URLSearchParams(location.search).entries());
    const [query, setQuery] = useState(t_query);
    const [tempDisplayArr, setTempDisplayArr] = useState(displayVendorTargetSheetArr);
    const [isLoading, setLoading] = useState();
    const [searchValue, setSearchValue] = useState();

    useEffect(() => {
        getVendorTagetSheetFunction(t_query);
    }, []);

    useEffect(() => {
        if (vendorTargetSheet && vendorTargetSheet.data) {
            const highestLCRGetFunc = (m_obj) => {
                let temp_highestLCRKeysSet = [];
                const tempArr = [];

                m_obj.forEach((obj) => {
                    Object.keys(obj).forEach((key) => {
                        if (key.startsWith("LCR") && !tempArr.includes(key)) {
                            if (key != "LCRs") {
                                tempArr.push(key);
                            }

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

    const handlePageClick = async (event) => {
        setLoading(true);
        await getVendorTagetSheetFunction({ ...t_query, page_no: event.selected });
        setLoading(false);
    };

    return (
        <div>
            <div className='mt-4 w-full md:w-[50%] mx-auto'>
                <input type="text"
                    placeholder='Search Country or Country Code'
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    className={"w-full py-2 peer px-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 "}
                />
                <BlackBtnTypeBtn
                    title={"Search"}
                    func={() => {
                        let url;
                        if (!isNaN(parseFloat(searchValue))) {
                            url = new URLSearchParams({ "country_code": searchValue });
                        }
                        else {
                            url = new URLSearchParams({ "country_name": searchValue });
                        }
                        setQuery(url);
                        getVendorTagetSheetFunction(url);
                        navigate(`/display-vendor-target-sheet/?${url}`);
                        console.log(url);
                    }}>
                </BlackBtnTypeBtn>
            </div>
            {
                isLoading ?
                    <div className="fixed inset-3 flex items-center justify-center bg-gray-900  bg-opacity-75 z-40">
                        <Loading />
                    </div> : null
            }
            {/* <h1>Paginated List</h1> */}
            <div className='mb-16'>

                <CustomTabel
                    getFunc={getVendorTagetSheetFunction}
                    tabelObj={vendorTargetSheet.data}
                    topTableHeading={tempDisplayArr}
                    key={1}
                    EditModal={CustomEditModal}
                    title={"Vendor Rate Search Result"}
                    url_route={"vendorratesearch"}
                    // query={query}
                />
            </div>
            {vendorTargetSheet.length > 1 ? <ReactPaginate
                previousLabel={<ArrowBackIosIcon />}
                nextLabel={<ArrowForwardIos />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={vendorTargetSheet.length}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            /> : null}
        </div>
    );
};

export default DisplayVendorTargetSheet;




