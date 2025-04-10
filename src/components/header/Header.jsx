import React, { useState } from "react";
import "./Header.css";

import { IoSearchSharp } from "react-icons/io5";
import ProfileDropdown from "../profileDropdown/ProfileDropdown";

export default function Header() {
  const [isInputFoucus, setIsInputFocus] = useState(false);

  return (
    <header className="header">
      <div className="container-fluid">
        <div className="header__wrapper">
          <div className="d-flex align-items-center gap-4">
            <ProfileDropdown />
          </div>

          <div>
            <form>
              <div className={`search-box ${isInputFoucus ? "search-box--expand" : ""}`}>
                <input className="search-box__input" type="text" placeholder="جستجو کنید" onFocus={() => setIsInputFocus(true)} onBlur={() => setIsInputFocus(false)} />
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
