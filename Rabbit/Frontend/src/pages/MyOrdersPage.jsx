import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "112",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [{
                        name: "Product1",
                        image: "https://picsum.photos/500/500?random=1",
                    }],
                    totalPrice: 100,
                    isPaid: false
                },
                {
                    _id: "1121",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [{
                        name: "Product2",
                        image: "https://picsum.photos/500/500?random=2",
                    }],
                    totalPrice: 200,
                    isPaid: true
                },
                {
                    _id: "1122",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [{
                        name: "Product3",
                        image: "https://picsum.photos/500/500?random=4",
                    }],
                    totalPrice: 500,
                    isPaid: true
                },
                {
                    _id: "1123",
                    createdAt: new Date(),
                    shippingAddress: { city: "New York", country: "USA" },
                    orderItems: [{
                        name: "Product6",
                        image: "https://picsum.photos/500/500?random=3",
                    }],
                    totalPrice: 100,
                    isPaid: true
                },
            ];
            setOrders(mockOrders);
        }, 1000);
    }, []);

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`)
    }
    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
                My Orders
            </h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Image</th>
                            <th className='py-2 px-4 sm:py-3'>Order Id</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} onClick={() => handleRowClick(order._id)} className="border-b hover:border-gray-50 cursor-pointer">
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">
                                            <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg' />
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                                        <td className="py-2 px-2 sm:py-4">
                                            {order.createdAt.toLocaleDateString()}{" "}
                                            {order.createdAt.toLocaleTimeString()}
                                        </td>

                                        <td className="py-2 px-2 sm:py-4">
                                            {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "NA"}
                                        </td>
                                        <td className="py-2 px-2 sm:py-4">{order.orderItems.length}</td>
                                        <td className="py-2 px-2 sm:py-4">${order.totalPrice}</td>
                                        <td className="py-2 px-2 sm:py-4">
                                            {order.isPaid ? (
                                                <span className="text-green-600 bg-green-100 px-2 py-1 rounded-md font-medium">
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="text-red-600 bg-red-100 px-2 py-1 rounded-md font-medium">
                                                    Pending
                                                </span>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                        You have no orders
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;
