import { Link, Navigate, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiCartAdd } from "react-icons/bi";
import { getLocaldata } from "../Shared/LocalStorage.JSX";
import { AuthContext } from "../Hooks/AuthProvider";
import { FaRegUser } from "react-icons/fa";
import "./Nv.css";

const NaveBar = () => {
  const [buttont, setButtont] = useState(false);
  const [products, setProducts] = useState([]);
  const { maulLoading, user, logOut } = useContext(AuthContext);


  const handelTFT = () => {
    setButtont(!buttont);
  };
  const signOut = () => {
    logOut();
    Navigate("/");
  };

  useEffect(() => {
    const product = getLocaldata();
    setProducts(product);
  }, [maulLoading]);


  const productLength = products?.length ;

  return (
    <header class="main-header">
      <nav class="top-nav">
        <Link to='/' class="nav-logo">
          TAVAA
        </Link>
        <div class="nav-links desktop">
          <Link to='/'>
            Home
          </Link>
          <Link to='/NewArrival'>New Arrivals</Link>
          <Link to='/ShopPage'>Shop</Link>
          <Link to='/About'>About</Link>
        </div>
        <div class="nav-icons">
          <div class="currency-dropdown-container">
            <button
              class="currency-toggle"
              aria-controls="currency-menu"
              aria-expanded="false"
              aria-label="Select Currency"
            >
              {user?.uid ? (
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:bg-transparent ${isActive ? "bg-transparent" : ""}`
                  }
                >
                  <div className="dropdown dropdown-hover dropdown-end ">
                    <NavLink
                      onClick={handelTFT}
                      className={({ isActive }) =>
                        `hover:bg-transparent ${
                          isActive ? "bg-transparent" : ""
                        }`
                      }
                    >
                      <FaRegUser size={20} />
                    </NavLink>
                    {buttont && (
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-slate-100 text-black rounded-box z-1 w-52 p-2 shadow-sm"
                      >
                        <li className="border bordrt-b">
                          <NavLink onClick={handelTFT} to="/yourOrders">
                            Order's
                          </NavLink>
                        </li>
                        <li>
                          <button onClick={signOut}>Log Out</button>
                        </li>
                      </ul>
                    )}
                  </div>
                </NavLink>
              ) : (
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    `hover:bg-transparent ${isActive ? "bg-transparent" : ""}`
                  }
                >
                  Login
                </NavLink>
              )}
            </button>
          </div>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center justify-center relative p-2 rounded outline-none ring-0 focus:outline-none focus:ring-0 border-none ${
                isActive ? "bg-[#b9c5c5]" : ""
              }`
            }
          >
            <div className="indicator p-0 m-0 -ml-2 -mt-1">
              {productLength !== 0 && (
                <span className="indicator-item badge badge-secondary text-black">
                  {productLength}
                </span>
              )}
              <BiCartAdd className="text-2xl font-bold" />
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default NaveBar;
