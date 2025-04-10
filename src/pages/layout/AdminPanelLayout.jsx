import React from "react";
import "./AdminPanelLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

export default function AdminPanelLayout() {
  return (
    <>
      <div className="admin-panel-layout">
        <Sidebar />
        <main className="main">
          <Header />
          <div className="mt-5">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
