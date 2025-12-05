import React, { useEffect, useState, useRef } from 'react'
import { FaFilter } from "react-icons/fa"
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByfilters } from "../redux/slices/productsSlice";
const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParam] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParam]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    useEffect(() => {
        dispatch(fetchProductByfilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParam]);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const handleClickOutside = (e) => {
        //Close sidebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        //Add click event Listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);


    return (
        <div className='flex flex-col lg:flex-row'>
            {/* Mobile Filter button */}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
                <FaFilter className='mr-2' />
            </button>
            {/* Filter Side bar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static`}>
                <FilterSidebar />
            </div>
            <div className="fles-grow p-4">
                <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
                {/* Sort Option */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage
