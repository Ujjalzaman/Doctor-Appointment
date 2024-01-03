import React, { useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import BreadCrumb from '../../UI/BreadCrumb';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import { useDebounced } from '../../../utils/hooks/useDebounced';
import { useGetDoctorsQuery } from '../../../redux/api/doctorApi';
import { Empty } from 'antd';
import { Pagination } from 'antd';


const SearchDoctor = () => {
    const query = {};
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByGender, setSorByGender] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [priceRange, setPriceRange] = useState({});

    query["limit"] = size;
    query["page"] = page;
    query["sortBy"] = sortBy;
    query["sortOrder"] = sortOrder;

    sortByGender !== '' && (query["gender"] = sortByGender);
    specialist !== '' && (query["specialist"] = specialist);

    const priceDebounced = useDebounced({ searchQuery: priceRange, delay: 600 });
    const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 })

    if (Object.keys(priceDebounced).length !== 0 && !!priceDebounced) {
        const { min, max } = priceDebounced
        query["min"] = min;
        query["max"] = max;
    }

    const resetFilter = () =>{
        setPage(1);
        setSize(10);
        setSortOrder("");
        setSearchTerm("");
        setSortOrder("");
        setSorByGender("");
        setSpecialist("");
        setPriceRange({});
    }

    if (!!debounced) { query.searchTerm = debounced }

    const { data, isLoading, isError } = useGetDoctorsQuery({ ...query })
    const doctorsData = data?.doctors;
    const meta = data?.meta;

    //what to render
    let content = null;
    if (isLoading) content = <>Loading ...</>;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && doctorsData.length === 0) content = <div><Empty /></div>
    if (!isLoading && !isError && doctorsData.length > 0) content =
        <>
            {
                doctorsData && doctorsData.map((item, id) => (
                    <SearchContent key={id + item.id} data={item} />
                ))
            }
        </>

    const onShowSizeChange = (current, pageSize) => {
        setPage(page);
        setSize(pageSize)
    }

    return (
        <div>
            <Navbar />
            <BreadCrumb />
            <div className="content" style={{ marginBottom: 200 }}>
                <div className="container-fluid">
                    <div className="row">
                        <SearchSidebar
                            setSearchTerm={setSearchTerm}
                            setSorByGender={setSorByGender}
                            setSpecialist={setSpecialist}
                            setPriceRange={setPriceRange}
                            resetFilter={resetFilter}
                            query={query}
                        />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {content}
                            <div className='text-center mt-5 mb-5'>
                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={meta?.total}
                                    pageSize={size}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchDoctor