import React from "react";
import "./Header.css";

import { IoSearchSharp } from "react-icons/io5";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";

export default function Header() {
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="header__wrapper">
          <div className="d-flex align-items-center gap-4">
            <ProfileDropdown />
          </div>

          <div>
            <form>
              <div className="search-box">
                <input className="search-box__input" type="text" placeholder="جستجو کنید" />
                <button className="search-box__btn">
                  <IoSearchSharp className="icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
