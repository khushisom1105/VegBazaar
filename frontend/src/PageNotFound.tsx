import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
     

      {/* 404 Error Content */}
      <div className="main-box bg-gray-50 shadow-lg rounded-lg p-10 max-w-2xl text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! That page can’t be found</h2>
        <p className="text-gray-500 mt-3">
          Lorem ipsum dolor sit amet consectetur. Lacus felis enim viverra nulla ut commodo mi purus.
          Pellentesque nisi magna aliquet pellentesque. Nulla id lectus viverra nulla eu.
        </p>

        {/* Back to Homepage Button */}
        <div className="flex justify-center items-center">
                                        <button onClick={()=> navigate("/")} className='m-5 flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>BACK TO HOME</button>
                                        </div>
        
      </div>
    </div>
  );
};

export default PageNotFound;