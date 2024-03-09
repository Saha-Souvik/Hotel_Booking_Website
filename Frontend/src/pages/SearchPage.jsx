// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from "react-router-dom";

// export default function SearchPage() {
//   const [places, setPlaces] = useState([]);
//   const location = useLocation(); // Use useLocation hook to get location

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTerm = urlParams.get('searchTerm');
//     const searchQuery = searchTerm ? searchTerm.toString() : ''; // Handle searchTerm being null
//     console.log(searchQuery);

//     axios.get('/places').then(response => {
//       const filteredPlaces = response.data.filter(place =>
//         place.city.toLowerCase() === searchQuery.toLowerCase() ||
//         place.title.toLowerCase() === searchQuery.toLowerCase()
//       );
//       setPlaces(filteredPlaces);
//     });
//   }, [location.search]); // Use location.search as a dependency

//   return (
//     <div>
//       <div className='ml-1'>
//         <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Searching Results:</h1>
//       </div>
//       <div className="p-2 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {places.length > 0 ? (
//           places.map(place => (
//             <div key={place._id}>
//               <Link to={`/place/${place._id}`} className="home bg-gray-500 mb-2 rounded-2xl flex">
//                 {place.photos?.[0] && (
//                   <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:4000/uploads/${place.photos?.[0]}`} alt="" />
//                 )}
//               </Link>
//               <h2 className="text-sm font-bold font-serif text-primary mx-2">{place.title}</h2>
//               <h3 className="text-gray-500 font-semibold mx-2">{place.address}</h3>
//               <div className="font-semibold text-gray-500">
//                 <span className="font-bold text-green-600 mx-2">${place.price}</span> per night
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center mt-5 text-primary">
//             <h1 className='text-2xl font-serif'>No results found</h1>
//             <div className='flex items-center justify-center'>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
//               </svg>
//             </div>

//           </div>

//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

export default function SearchPage() {
  const [places, setPlaces] = useState([]);
  const [sortOrder, setSortOrder] = useState(''); // Added sortOrder state
  const location = useLocation(); // Use useLocation hook to get location

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');
    const searchQuery = searchTerm ? searchTerm.toString() : '';

    axios.get('/places').then(response => {
      let filteredPlaces;

      if (searchQuery.toLowerCase() === 'india') {
        // If the searchQuery is 'India', show all hotels
        filteredPlaces = response.data;
      } else {
        // Otherwise, filter based on city or title
        filteredPlaces = response.data.filter(place =>
          place.city.toLowerCase() === searchQuery.toLowerCase() ||
          place.title.toLowerCase() === searchQuery.toLowerCase()
        );
      }

      // Sort places based on the sortOrder
      const sortedPlaces = sortPlaces(filteredPlaces, sortOrder);

      setPlaces(sortedPlaces);
    });
  }, [location.search, sortOrder]);


  const sortPlaces = (placesToSort, order) => {
    if (order === 'lowToHigh') {
      return placesToSort.sort((a, b) => a.price - b.price);
    } else if (order === 'highToLow') {
      return placesToSort.sort((a, b) => b.price - a.price);
    } else {
      return placesToSort;
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <div className='grid md:grid-cols-4 border-b items-center mt-5 p-3'>
        <div className="md:col-span-3">
          <h1 className='text-3xl font-semibold text-slate-700'>Searching Results:</h1>
        </div>
        <div>
          <label className="text-2xl font-serif text-slate-700">Filter : </label>
          {/* Add dropdown/select input for sorting */}
          <select className="rounded border-2 border-primary" value={sortOrder} onChange={handleSortChange}>
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="p-2 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 ? (
          places.map(place => (
            <div key={place._id}>
              <Link to={`/place/${place._id}`} className="home bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:4000/uploads/${place.photos?.[0]}`} alt="" />
                )}
              </Link>
              <h2 className="text-sm font-bold font-serif text-primary mx-2">{place.title}</h2>
              <h3 className="text-gray-500 font-semibold mx-2">{place.address}</h3>
              <div className="font-semibold text-gray-500">
                <span className="font-bold text-green-600 mx-2">${place.price}</span> per night
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 text-center mt-5 text-primary">
            <h1 className='text-2xl font-serif'>No results found</h1>
            <div className='flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

