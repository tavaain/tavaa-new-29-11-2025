import { NavLink } from "react-router-dom";

const ActiveLinkDashboard = ({to, children}) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? "group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md bg-gray-800" : "group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"}
        >
            {children}
        </NavLink>
    );
};

export default ActiveLinkDashboard;