import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {

  const [activeLink, setActiveLink] = useState(null);

  function linkClasses(type = null) {
    let classes =' ';
    if (type === activeLink) {
      classes += ' bg-green-500 text-white rounded-full p-1 w-fit ';
    }
    else {
      classes =' ';
    }

    return classes;
  }

  return (
    <div className="sidebar w-60 p-3 flex flex-col text-white">
      <div className="fixed">
        <div className="flex items-center gap-2 px-1 py-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="currentColor" className="bg-red-500 rounded-full p-1 w-6 h-6 md:w-7 md:h-7">
            <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
            <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clipRule="evenodd" />
            <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
          </svg>
          <Link onClick={() => { setActiveLink(null); }} to={'/admin/home'} className="font-bold text-md sm:text-sm text-green-600">
            <span className=" text-xs md:text-lg">𝐵𝑜𝑜𝓀𝑀𝓎𝑅𝑜𝑜𝓂</span></Link>
        </div>
        <hr className="my-2 lg:w-44 mt-1 border border-solid border-red-500" />
        <div className="items-center px-1 py-3 font-serif">

          <div className="mt-4">
            <Link onClick={() => setActiveLink('details')} className={`flex items-center gap-1 ${linkClasses('details')}`} to={'/admin/home/details'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
              </svg>

              <span className="text-xs md:text-lg">Booking Details</span></Link>
          </div>
          <div className="mt-6">
            <Link onClick={() => setActiveLink('saved')} className={`flex items-center gap-1 ${linkClasses('saved')}`} to={'/admin/home/saved'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
              </svg>

              <span className=" text-xs md:text-lg">Saved Hotels</span></Link>
          </div>
          <div className="mt-6">
            <Link onClick={() => setActiveLink('add')} className={`flex items-center gap-1 ${linkClasses('add')}`} to={'/admin/home/add'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>


              <span className=" text-xs md:text-lg">Add Hotels</span></Link>
          </div>
        </div>
        <div className="">
          <Link to={'/admin'} className="flex items-center gap-2 px-1 py-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            <span className="font-serif font-semibold text-xs md:text-lg text-primary">Logout</span>
          </Link>
        </div>
      </div>
    </div>


  );
}

