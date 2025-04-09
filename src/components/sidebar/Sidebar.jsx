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
              <a className="link sidebar__nav-link sidebar__nav-link--active" href="#">
                <GoHome className="icon" />
                <span className="text-truncate ">صفحه اصلی</span>
              </a>
            </li>
            <li className="sidebar__nav-item">
              <a className="link sidebar__nav-link" href="#">
                <BsBoxes className="icon" />
                <span className="text-truncate">محصولات</span>
              </a>
            </li>
            <li className="sidebar__nav-item">
              <a className="link sidebar__nav-link" href="#">
                <LiaComments className="icon" />
                <span className="text-truncate">کامنت ها</span>
              </a>
            </li>
            <li className="sidebar__nav-item">
              <a className="link sidebar__nav-link" href="#">
                <FiUsers className="icon" />
                <span className="text-truncate">کاربران</span>
              </a>
            </li>
            <li className="sidebar__nav-item">
              <a className="link sidebar__nav-link" href="#">
                <FiShoppingCart className="icon" />
                <span className="text-truncate">سفارشات</span>
              </a>
            </li>
            <li className="sidebar__nav-item">
              <a className="link sidebar__nav-link" href="#">
                <MdOutlineLocalOffer className="icon" />
                <span className="text-truncate">تخفیف ها</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
