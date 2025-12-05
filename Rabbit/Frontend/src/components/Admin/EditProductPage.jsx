import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import { updateProduct } from '../../redux/slices/adminProductSlice';
import { useParams } from 'react-router-dom';
const EditProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        category: "",
        brand: "",
        sku: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [
        ]
    });
    const [uploading, setUploading] = useState(false); //Image upload
    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);
    useEffect(() => {
        if (selectedProduct) {
            setProductData(prev => ({
                ...prev,
                ...selectedProduct,
                sizes: selectedProduct.sizes || [],
                colors: selectedProduct.colors || [],
                images: selectedProduct.images || []
            }));
        }
    }, [selectedProduct]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            setUploading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }],
            }))
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProduct({ id, productData }));
        navigate("/admin/products");
    }
    if (loading) return <p>Loading....</p>
    if (error) return <p>Error:{error}</p>
    return (
        <div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
            <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
            <form action="" onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Product Name</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' rows={4} required />
                </div>
                {/* Desc */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Description</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />
                </div>
                {/* Price */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Price</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />
                </div>
                {/* Count In Stock */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Count In Stock</label>
                    <input type="number" name="countInStock" value={productData.countInStock} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />
                </div>
                {/* SKU */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>SKU</label>
                    <input type="text" name="sku" value={productData.sku} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2' required />
                </div>
                {/* Sizes */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name="sizes"
                        value={(productData.sizes || []).join(",")}
                        onChange={(e) => setProductData({
                            ...productData,
                            sizes: e.target.value.split(",").map(size => size.trim())
                        })}
                        className='w-full border border-gray-300 rounded-md p-2'
                    />
                </div>

                {/* Colors */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
                    <input
                        type="text"
                        name="colors"
                        value={productData.colors.join(",")}
                        onChange={(e) => setProductData({
                            ...productData,
                            colors: e.target.value.split(",").map(color => color.trim())
                        })}
                        className='w-full border border-gray-300 rounded-md p-2'
                    />
                </div>


                {/* Image upload */}
                <div className="mb-6">
                    <label className='block font-semibold mb-2'>Upload Image</label>
                    <input type="file" onChange={handleImageUpload} />
                    {uploading && <p>Uploading Image...</p>}
                    <div className="flex gap-4 mt-4">
                        {productData.images.map((image, index) => (
                            <div key={index} className="">
                                <img src={image.url} alt={image.altText || "Product image"} className='w-20 h-20 object-cover rounded-md shadow-md ' />
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-transform duration-200'>Update Product</button>
            </form>
        </div>
    )
}

export default EditProductPage
