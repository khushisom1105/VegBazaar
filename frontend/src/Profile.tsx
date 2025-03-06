
function Profile() {
    return (
        <div>
            <div className='bg-[#3B5236] flex flex-col justify-center items-center h-96 text-white gap-3 p-10'>
                <p className='flex font-marcellus text-4xl'>My Profile</p>
                <p className='flex text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <p className='flex font-nunito text-lg font-semibold'>Home &rarr; Profile</p>
            </div>
            {/* <div className="bg-[#F2F2EC] m-28 p-12">
            <div>Profile Details</div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </div> */}
            <div className="bg-[#F2F2EC] my-20 m-3 md:m-28 p-12 rounded-2xl gap-8 flex flex-col">
                <h2 className="text-2xl font-semibold font-marcellus">Profile Details</h2>
                <div className="flex flex-col lg:flex-row justify-between font-nunito text-[#555554] font-semibold lg:text-lg border-y-2">
                    <div className="flex flex-col gap-3 py-5">
                        <p> Full Name:  Hani Zala</p>
                        <p> Mobile Number:  +(91) 7418529630</p>
                        <p> Email ID:  hani@gmail.com</p>
                        <p> Gender:  Female</p>
                    </div>
                    <div className="lg:border-l-2"></div>
                    <div className="flex flex-col gap-3 lg:py-5 pb-5">
                        <p> Date of Birth:  September 23, 2003</p>
                        <p> Location:  Gujarat, India</p>
                        <p> Alternate Mobile No:  +(91) 9898986532</p>
                        <p> Hint Name:  *not added*</p>
                    </div>
                </div>
                <button className='flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>EDIT YOUR PROFILE</button>
                
            </div>
        </div>
    )
}

export default Profile