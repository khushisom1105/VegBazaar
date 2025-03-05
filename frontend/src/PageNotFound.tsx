import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  text-center my-10">


      {/* 404 Error Content */}
      <div className="main-box rounded-lg p-10 max-w-2xl text-center">
        <h1 className="text-8xl font-bold text-gray-800 font-marcellus">404</h1>
        <h2 className="text-4xl font-semibold text-gray-700 mt-4 font-marcellus">Oops! That page can’t be found</h2>
        <p className="text-gray-500 mt-3 font-nunito">
        The page you’re looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back to Homepage Button */}
        <div className="flex justify-center items-center">
          <button onClick={() => navigate("/")} className='m-5 flex items-center justify-center font-nunito text-sm border p-3 px-8 rounded-full gap-2 bg-[#3B5236] text-white font-semibold hover:bg-[#D3B758]'>BACK TO HOME</button>
        </div>

      </div>
    </div>
  );
};

export default PageNotFound;