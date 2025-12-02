import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlineDashboard, MdOutlineLogout, MdOutlineMessage } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbCategoryPlus, TbShoppingCartDollar } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { PiSlideshow } from "react-icons/pi";
import { CgAddR } from "react-icons/cg";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ActiveLinkDashboard from "../Pages/Dashboard/ActiveLinkDashboard";


const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "user", link: "/dashboard/user", icon: AiOutlineUser },
    { name: "Add Product`s", link: "/dashboard/addProduct", icon: CgAddR },
    { name: "Add Category`s", link: "/dashboard/addCategory", icon: TbCategoryPlus },
    { name: "Slider", link: "/dashboard/addSlider", icon: PiSlideshow },
    { name: "Orders", link: "/dashboard/orders", icon: TbShoppingCartDollar },
    { name: "Admin", link: "/dashboard/admin", icon: MdOutlineAdminPanelSettings },
    { name: "Messages", link: "/dashboard/Messages", icon: MdOutlineMessage },
];

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/adminLoginPanel', { replace: true });
    }

    return (
        <section className="flex">
            <Toaster />
            {/* Side bar */}
            <div className={`bg-[#070F2B] min-h-screen ${open ? "w-64 px-4" : "w-0 px-0"} duration-300 text-gray-100  z-50`}>
                <div className="py-3 flex justify-between">
                    {open && <span className="text-xl">Logo</span>}
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className={`mt-4 flex flex-col gap-4 relative duration-300 ${open ? 'block' : 'hidden'}`}>
                    {menus?.map((menu, i) => (
                        <ActiveLinkDashboard
                            to={menu?.link}
                            key={i}
                            className="font-semibold text-gray-300 text-2xl">
                            <div className="font-semibold text-gray-300 text-sm">{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{ transitionDelay: `${i + 3}00ms`, }}
                                className={`whitespace-pre  text-white text-sm ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
                            >
                                {menu?.name}
                            </h2>
                            <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </ActiveLinkDashboard>

                    ))}
                    <button onClick={handleLogout} className="flex mt-4 pl-2 items-center gap-1 font-semibold text-gray-300">
                        <MdOutlineLogout className="text-red-600 text-2xl" /> Logout
                    </button>
                </div>
            </div>
            {/* Content here */}
            <div className="w-full">
                <div className="flex items-center gap-4 px-4 py-4 ">
                    {!open && <HiMenuAlt3
                        size={26}
                        className={`cursor-pointer ${open ? 'hidden' : 'block'}`}
                        onClick={() => setOpen(!open)}
                    />}
                    <div className="text-xl text-gray-900 font-semibold uppercase">
                        Dashboard
                    </div>
                </div>

                <div className="my-4 ">
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;