import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export default function SavedHotels() {

  const [saved, setSaved] = useState([]);
  useEffect(() => {
    axios.get('/saved').then(response => {
      setSaved(response.data);
    });
  }, []);

  const handleDelete = async (hotelId) => {
    try {
      await axios.delete(`/deleteHotel/${hotelId}`);
      setSaved((prevSaved) => prevSaved.filter((place) => place._id !== hotelId));
      toast.success("Hotel removed successfully.")
    } catch (error) {
      console.error(error);
    }
  };



  return (

    <div className="bg-gray-300 w-full text-black p-4">
      <div className="flex flex-col">
        {saved?.length > 0 && saved.map((place) => (
          <div className="home flex flex-col sm:flex-row gap-4 bg-secondary rounded-2xl overflow-hidden mb-4">
            <div className="w-full sm:w-52 flex flex-shrink-0">
              {place.photos.length > 0 && (
                <img
                  className="object-cover w-full h-48 sm:h-48"
                  src={'http://localhost:4000/uploads/' + place.photos[0]}
                  alt=""
                />
              )}
            </div>
           
            <div className=" py-3 pr-3 grow flex flex-col">
              <h2 className=" text-xl font-bold text-primary font-serif">{place.title}</h2>
              <a className="flex gap-1 my-2 font-semibold underline font-mono" target="_blank" href={'https://maps.google.com/?q=' + place.address} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}</a>
              <h2 className=" text-md font-semibold font-mono">Price per night: ${place.price}</h2>
              <div className="flex gap-4 font-semibold font-mono">
              <h2 className="text-md">Check-In: {place.checkIn}:00</h2>
              <h2 className="text-md">Check-Out: {place.checkOut}:00</h2>
              </div>
              <h2 className="text-md font-semibold font-mono">Max guests: {place. maxGuests}</h2>
              <button  onClick={() => handleDelete(place._id)} className="w-fit bg-secondary absolute right-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            

            </div>
          </div>
        ))}
      </div>
    </div>




  );
}