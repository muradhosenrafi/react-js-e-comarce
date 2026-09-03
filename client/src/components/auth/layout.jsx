import { Outlet } from "react-router-dom";
import image from "../../assets/image.png";

function AuthLayout() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f3c9a3] p-4">
      <div className="w-full max-w-4xl bg-[#f6e9dc] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left image panel */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={image}
            alt="Welcome"
            className="w-full h-full"
          />
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-12 md:px-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;