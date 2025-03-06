import img1 from "./image/shop-img1.jpg";
import img2 from "./image/shop-img2.jpg";
import img3 from "./image/shop-img3.jpg";

const MyOrder = () => {
    const orders = [
        { id: 1, name: "Fresh Natural Oranges", qty: 2, price: 50.0, date: "Mar 7, 2025", rating: 5, image: img1 },
        { id: 2, name: "Organic Cabbage (1 Pc)", qty: 3, price: 80.0, date: "Mar 7, 2025", rating: 5, image: img2 },
        { id: 3, name: "Red Apple Envy (6 pc)", qty: 1, price: 100.0, date: "Mar 7, 2025", rating: 5, image: img3 },
    ];
    return (
        <>
            <div className="bg-[#3B5236] flex flex-col justify-center items-center h-64 md:h-96 text-white gap-3 p-10">
                <p className="font-marcellus text-3xl md:text-4xl font-semibold">My Orders</p>
                <p className="font-nunito text-sm md:text-lg font-semibold">Home &rarr; My Orders</p>
            </div>
            <div className="m-5 md:m-24 lg:m-32">
                <h2 className="text-2xl font-bold mb-4 text-[#3B5236] font-marcellus">My Orders</h2>

                <div className="flex flex-col gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-lg">
                            <img src={order.image} alt={order.name} className="w-24 h-24 md:w-32 md:h-28 rounded-xl object-cover" />
                            <div className="text-center md:text-left flex flex-col md:flex-row justify-between w-full font-nunito gap-5">
                                <div className="text-[#3B5236] font-semibold text-lg font-marcellus flex gap-2 justify-center">
                                    <p>{order.name}</p>
                                    <p className="font-nunito">X</p>
                                    <p>{order.qty}</p>
                                </div>
                                <p className="text-[#3B5236] font-semibold">₹{order.price.toFixed(2)}</p>
                                <div>
                                    <p className="text-gray-500 text-sm">Delivered on {order.date}</p>
                                    <p className="text-yellow-500 text-sm">{"★".repeat(order.rating)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 my-10 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>CONTINUE SHOPPING</button>

            </div>
        </>
    )
};

export default MyOrder;