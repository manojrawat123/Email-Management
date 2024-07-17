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


const DisplayVendorTargetSheet = () => {
    const { getVendorTagetSheetFunction, vendorTargetSheet } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    const t_query = Object.fromEntries(new URLSearchParams(location.search).entries());
    const [query, setQuery] = useState(t_query);
    const [tempDisplayArr, setTempDisplayArr] = useState(displayVendorTargetSheetArr);
    const [searchValue, setSearchValue] = useState();
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
                            if (key != "LCRs"){
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

    return (
        <div>
            <div className='w-full md:w-[50%] mx-auto'>
                <div className='mt-4 '>

                <input type="text"
                placeholder='Search Country or Country Code'
                onChange={(e)=>{
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
                    getVendorTagetSheetFunction(url);
                    setQuery(url);
                    navigate(`/display-vendor-target-sheet/?${url}`);
console.log(url);
                }}>
                </BlackBtnTypeBtn>
                        </div>
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



// src/PaginatedList.js


// const DisplayVendorTargetSheet = () => {
//     const items = Array.from({ length: 1000 }, (_, index) => ({
//         id: index + 1,
//         name: `Item ${index + 1}`
//     }));

//     const [currentItems, setCurrentItems] = useState([]);
//     const [pageCount, setPageCount] = useState(0);
//     const [itemOffset, setItemOffset] = useState(0);
//     const itemsPerPage = 10;

//     useEffect(() => {
//         const endOffset = itemOffset + itemsPerPage;
//         setCurrentItems(items.slice(itemOffset, endOffset));
//         setPageCount(Math.ceil(items.length / itemsPerPage));
//     }, [itemOffset, itemsPerPage]);

//     const handlePageClick = (event) => {
//         const newOffset = (event.selected * itemsPerPage) % items.length;
//         setItemOffset(newOffset);
//     };

//     return (
//         <div>
//             <h1>Paginated List</h1>
//             <ul>
//                 {currentItems.map(item => (
//                     <li key={item.id}>{item.name} Thisi</li>
//                 ))}
//             </ul>
//             <ReactPaginate
//                 previousLabel={"previous"}
//                 nextLabel={"next"}
//                 breakLabel={"..."}
//                 breakClassName={"break-me"}
//                 pageCount={pageCount}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={5}
//                 onPageChange={handlePageClick}
//                 containerClassName={"pagination"}
//                 subContainerClassName={"pages pagination"}
//                 activeClassName={"active"}
//             />
//         </div>
//     );
// };

// export default DisplayVendorTargetSheet;


