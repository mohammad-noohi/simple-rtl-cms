import React, { useState } from "react";
import "./Sidebar.css";
// icons
import { GoHome } from "react-icons/go";
import { BsBoxes } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { LiaComments } from "react-icons/lia";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { GoSidebarExpand } from "react-icons/go";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  /*---------- States ----------*/
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /*---------- Funcitons & Events Handlers ----------*/
  // const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <>
      {isSidebarOpen && <div className="backdrop" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar__header">
          <GoSidebarExpand className="icon sidebar__toggler" onClick={toggleSidebar} />
          <button className="btn btn-close sidebar__close-btn" onClick={closeSidebar}></button>
          <span className="sidebar__title">داشبورد</span>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__nav-list">
            <li className="sidebar__nav-item">
              <NavLink className={({ isActive }) => `link sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`} to="/">
                <GoHome className="icon" />
                <span className="text-truncate ">صفحه اصلی</span>
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink className={({ isActive }) => `link sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`} to="/products">
                <BsBoxes className="icon" />
                <span className="text-truncate">محصولات</span>
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink className={({ isActive }) => `link sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`} to="/comments">
                <LiaComments className="icon" />
                <span className="text-truncate">کامنت ها</span>
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink className={({ isActive }) => `link sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`} to="/users">
                <FiUsers className="icon" />
                <span className="text-truncate">کاربران</span>
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink className={({ isActive }) => `link sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`} to="/orders">
                <FiShoppingCart className="icon" />
                <span className="text-truncate">سفارشات</span>
              </NavLink>
            </li>
            <li className="sidebar__nav-item">
              <NavLink className={({ isActive }) => `link sidebar__nav-link ${isActive ? "sidebar__nav-link--active" : ""}`} to="/offers">
                <MdOutlineLocalOffer className="icon" />
                <span className="text-truncate">تخفیف ها</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
