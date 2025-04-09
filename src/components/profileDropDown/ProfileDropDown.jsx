import React, { useState } from "react";
import "./ProfileDropDown.css";
import { IoExitOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";

export default function ProfileDropdown() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(prev => !prev);
  const closeProfile = () => setIsProfileOpen(false);

  return (
    <>
      <div className={`profile__backdrop ${isProfileOpen ? "profile__backdrop--active" : ""}`} onClick={closeProfile}></div>
      <div className={`profile ${isProfileOpen ? "profile--open" : ""}`}>
        <div className="profile__btn" onClick={toggleProfile}>
          <img className="profile__img" src="https://avatars.githubusercontent.com/u/109421506?v=4" alt="" />
        </div>
        <ul className="profile__list shadow">
          <li className="profile__list-item">سید محمد نوحی</li>
          <li className="profile__list-item">فرانت اند دولوپر</li>
          <li className="profile__list-item">
            <GoSun className="icon" />
            {/* <GoMoon className="icon" /> */}
          </li>
          <li className="profile__list-item logout-btn">
            <IoExitOutline className="icon logout-btn__icon" />
            <span>خروج</span>
          </li>
        </ul>
      </div>
    </>
  );
}
