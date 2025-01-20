import img1 from './image/Product-banner.webp'
import img2 from './image/Double-leafs.png'
import { IoIosSearch } from "react-icons/io";

function Product() {
    const categories = [
        { name: 'Biscuit and Snacks', count: 33 },
        { name: 'Dairy and Beverages', count: 10 },
        { name: 'Fruits and Vegetables', count: 5 },
        { name: 'Meats', count: 8 },
        { name: 'Seafoods', count: 15 },
        { name: 'Uncategorized', count: 4 },
    ];
    return (
        <>
            <div className="flex m-28 gap-6">
                <div className="flex flex-col gap-10 bg-[#F2F2EC] h-screen w-1/3 p-5 rounded-3xl">
                    <div className='flex flex-col w-full gap-4'>
                        <div className='font-marcellus font-semibold text-2xl'>Search Your Product</div>
                        <div className='relative flex items-center'>
                            <input
                                type="text"
                                placeholder="Search for..."
                                className="flex w-full p-3 pr-8 border rounded-lg text-sm focus:outline-none"
                            />
                            <IoIosSearch className='absolute right-0 m-2 hover:cursor-pointer' />
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        {/* <div className='font-marcellus font-semibold text-2xl'>Product Categories</div>
                        <div className='flex flex-col w-full'>
                            <div className='flex relative w-full'>
                                <div className='flex absolute left-0'>Biscuit and Snacks</div>
                                <div className='flex absolute right-0'>(30)</div>
                            </div>
                            <div className='flex relative w-full'>
                                <div className='flex absolute left-0'>Biscuit and Snacksmsdakmf</div>
                                <div className='flex absolute right-0'>(30)</div>
                            </div>
                            <div className='flex relative w-full'>
                                <div className='flex absolute left-0'>Biscuit and Snacks</div>
                                <div className='flex absolute right-0'>(30)</div>
                            </div>
                        </div> */}
                        {/* <div className="bg-[#fcfcf4] p-4"> */}
                        <div className='font-marcellus font-semibold text-2xl'>Product Categories</div>
                            <ul>
                                {categories.map((category) => (
                                    <li
                                        key={category.name}
                                        className="flex justify-between items-center text-[#8B8B98] text-sm font-medium mb-2"
                                    >
                                        <span>{category.name}</span>
                                        <span className="text-gray-400">({category.count})</span>
                                    </li>
                                ))}
                            </ul>
                        {/* </div> */}
                    </div>
                </div>
                <div className="flex flex-col w-2/3 gap-5 relative">
                    {/* <div className="flex bg-red-600 h-full rounded-3xl"> */}
                    <div className="flex relative rounded-3xl overflow-hidden">
                        <img src={img1} className="object-cover"></img>
                        <p className="flex absolute text-white text-center pt-20">Your Content Here</p>
                    </div>
                    <img src={img2} className='absolute -right-12 -top-16 w-16'></img>
                    <div>Product</div>
                </div>
            </div>
        </>
    )
}

export default Product
