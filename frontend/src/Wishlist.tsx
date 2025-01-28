import shop1 from './image/shop-img1.jpg'
import shop2 from './image/shop-img2.jpg'
import shop3 from './image/shop-img3.jpg'

interface Product {
    id: number;
    productName: string;
    price: number;
    image: string;
}

const products: Product[] = [
    {
        id: 1,
        productName: "Fresh Natural Oranges",
        price: 29.00,
        image: shop1,
    },
    {
        id: 2,
        productName: "Organic Cabbage (1 Pc)",
        price: 54.00,
        image: shop2,
    },
    {
        id: 3,
        productName: "Red Apple Envy (6 pc)",
        price: 99.00,
        image: shop3,
    },
    {
        id: 1,
        productName: "Fresh Natural Oranges",
        price: 29.00,
        image: shop1,
    },
    {
        id: 2,
        productName: "Organic Cabbage (1 Pc)",
        price: 54.00,
        image: shop2,
    },
    {
        id: 3,
        productName: "Red Apple Envy (6 pc)",
        price: 99.00,
        image: shop3,
    },
    {
        id: 1,
        productName: "Fresh Natural Oranges",
        price: 29.00,
        image: shop1,
    },
    {
        id: 2,
        productName: "Organic Cabbage (1 Pc)",
        price: 54.00,
        image: shop2,
    },
    {
        id: 3,
        productName: "Red Apple Envy (6 pc)",
        price: 99.00,
        image: shop3,
    },
];

function Wishlist() {
    return (
        <div>
            <div className="m-28 md:block hidden">
                <table className="w-full border-collapse font-marcellus">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-4 font-marcellus">Products</th>
                            <th className="text-left p-4 font-marcellus max-lg:hidden">Stock Status</th>
                            <th className="text-left p-4 font-marcellus">Price</th>
                            <th className="text-left p-4 font-marcellus">Add to Cart</th>
                            <th className="text-center p-4 font-marcellus">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="flex items-center gap-4 p-4">
                                    <img src={product.image} alt={product.productName} className="w-32 h-28 rounded-xl object-cover" />
                                    <div>
                                        <p className="font-semibold text-lg">{product.productName}</p>
                                    </div>
                                </td>
                                <td className="p-4 max-lg:hidden">
                                    <span className="px-4 py-1 text-xs font-semibold bg-yellow-200 text-yellow-700 rounded-full ">
                                        In Stock
                                    </span>
                                </td>
                                <td className="p-4 font-semibold">₹{product.price.toFixed(2)}</td>
                                <td className="p-4">
                                    <button className='flex items-center justify-center text-xs border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>ADD TO CART </button>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-green-800 hover:text-red-600">✖</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center md:hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="flex justify-center">
                            <div className="main-box flex flex-col justify-center items-center font-marcellus w-64 border-2 p-2 rounded-xl">
                                <img src={product.image} alt={product.productName} className="rounded-3xl object-cover w-64" />
                                <div className="flex flex-col w-full gap-4 p-5">
                                    <p className="font-semibold text-lg">{product.productName}</p>
                                    <p className="text-xl">₹{product.price.toFixed(2)}</p>
                                    <div className="flex gap-4">
                                        <p>Stock Status:</p>
                                        <span className="px-4 py-1 text-xs font-semibold bg-yellow-200 text-yellow-700 rounded-full">
                                            In Stock
                                        </span>
                                    </div>
                                    <div className="flex justify-around">
                                        <button className="text-xs border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]">
                                            ADD TO CART
                                        </button>
                                        <button className="text-green-800 hover:text-red-600">✖</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    );
};

export default Wishlist;
