import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'
const placeholderProducts = [

    {
        _id: 1,
        name: "product 1",
        price: 100,
        images: [{
            url: "https://picsum.photos/500/500?random=1",
            altText: "Stylish Jacket 1"
        }],
    },
    {
        _id: 2,
        name: "product 2",
        price: 100,
        images: [{
            url: "https://picsum.photos/500/500?random=2",
            altText: "Stylish Jacket 2"
        }],
    },
    {
        _id: 3,
        name: "product 3",
        price: 300,
        images: [{
            url: "https://picsum.photos/500/500?random=3",
            altText: "Stylish Jacket 3"
        }],
    },
    {
        _id: 4,
        name: "product 4",
        price: 400,
        images: [{
            url: "https://picsum.photos/500/500?random=4",
            altText: "Stylish Jacket 4"
        }],
    },
    {
        _id: 5,
        name: "product 5",
        price: 500,
        images: [{
            url: "https://picsum.photos/500/500?random=5",
            altText: "Stylish Jacket 5"
        }],
    },

    {
        _id: 6,
        name: "product 6",
        price: 600,
        images: [{
            url: "https://picsum.photos/500/500?random=6",
            altText: "Stylish Jacket 6"
        }],
    },
    {
        _id: 7,
        name: "product 7",
        price: 700,
        images: [{
            url: "https://picsum.photos/500/500?random=7",
            altText: "Stylish Jacket 7"
        }],
    },
    {
        _id: 8,
        name: "product 8",
        price: 800,
        images: [{
            url: "https://picsum.photos/500/500?random=8",
            altText: "Stylish Jacket 8"
        }],
    },

]
const Home = () => {
    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />
            {/* Best Seller */}
            <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
            <ProductDetails />
            <div className="container mx-auto "></div>
            <h2 className="tezt-3xl text-center font-bold mb-4">Top Wears Women</h2>
            <ProductGrid products={placeholderProducts} />
            <FeaturedCollection />
            <FeatureSection />
        </div>
    )
}

export default Home
