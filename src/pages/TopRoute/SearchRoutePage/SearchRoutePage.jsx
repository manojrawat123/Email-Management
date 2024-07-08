import React, { useContext, useEffect, useState } from 'react';
import Select from "react-select";
import { DataContext } from '../../../context';
import Loading from '../../../component/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const SearchRoutePage = () => {
    const {
        searchPageOptionGetFunc,
        searchPageData
    } = useContext(DataContext);
    const navigate = useNavigate();
    const [searchValue1, setSearchValue1] = useState();
    const page_title = "Search Top Route";
    const placeholder = "Select Routes";

    useEffect(() => {
        searchPageOptionGetFunc("top_route")
    }, []);

    if (!searchPageData) {
        return <Loading />
    }

    return (
        <div className="h-[70vh] flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">{page_title}</h1>
                <Select
                    type="text"
                    placeholder={placeholder}
                    isSearchable
                    options={searchPageData.options}
                    value={searchValue1}
                    onChange={(e) => {
                        console.log(e.value)
                        setSearchValue1(e.value);
                        navigate(`/display-route?search=${e.value}`);
                    }}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            height: 50, // Customize the height
                            minHeight: 50, // Ensure the control has a minimum height
                        }),
                        input: (provided, state) => ({
                            ...provided,
                            height: 'auto', // Adjust the input field height as needed
                        }),
                        placeholder: (provided, state) => ({
                            ...provided,
                            fontSize: '16px', // Customize the font size of the placeholder
                        }),
                    }}
                //   className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default SearchRoutePage;
