import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

export default function Layout1(){
    return(
        <div className="flex flex-row min-h-screen">
             <Sidebar />
             <Outlet/>
        </div>
    )
}