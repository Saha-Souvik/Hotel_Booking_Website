import React, { useState } from 'react';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddHotel() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState('');

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(response => {
      const { data: filenames } = response;
      setAddedPhotos(prev => {
        return [...prev, ...filenames];
      })
    })
  }

  async function addNewHotel(ev) {

    ev.preventDefault();

    if (!title || !address || !city || addedPhotos.length === 0 || !description || !checkIn || !checkOut || !maxGuests || !price) {
      toast.info("Please fill in all the required fields.");
      return;
    }
    else {
      await axios.post('/places', { title, address, city, addedPhotos, description, checkIn, checkOut, maxGuests, price, });
      toast.success("Hotel added successfully")
      setRedirect('/admin/home');
    }

  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-gray-300 w-full text-black p-4">
      <form onSubmit={addNewHotel}>
        <h2 className='text-2xl mt-4 font-semibold font-serif'>Title</h2>
        <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder='title' />
        <div className='grid gap-2 grid-cols-1 md:grid-cols-3'>
          <div className="col-span-2">
            <h2 className='text-2xl mt-4 font-semibold font-serif'>Address</h2>
            <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='address' />
          </div>
          <div>
            <h2 className='text-2xl mt-4 font-semibold font-serif'>City</h2>
            <input type='text' value={city} onChange={ev => setCity(ev.target.value)} placeholder='eg:kolkata' />
          </div>
        </div>
        <h2 className='text-2xl mt-4 font-semibold font-serif'>Photos</h2>
        <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
            <div key={index} className='h-32 flex p-2'>
              <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/' + link} alt='' />
            </div>
          ))}
          <label className='flex items-center gap-1 justify-center border border-black bg-transparent rounded-2xl p-8 text-sm lg:text-2xl md:text-2xl text-gray-600 font-semibold cursor-pointer'>
            <input type='file' multiple className='hidden' onChange={uploadPhoto} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
            </svg>
            Upload
          </label>
        </div>
        <h2 className='text-2xl mt-4 font-semibold font-serif'>Description</h2>
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
          <div>
            <h2 className='text-2xl mt-4 font-semibold font-serif'>Check-in time</h2>
            <input type='text' value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder='14' />
          </div>
          <div>
            <h2 className='text-2xl mt-4 font-semibold font-serif'>Check-out time</h2>
            <input type='text' value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='14' />
          </div>
          <div>
            <h2 className='text-2xl mt-4 font-semibold font-serif'>Max no of guests</h2>
            <input type='number' value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder='1' />
          </div>
          <div>
            <h2 className='text-2xl mt-4 font-semibold font-serif'>Price per night</h2>
            <input type='text' value={price} onChange={ev => setPrice(ev.target.value)} placeholder='1000' />
          </div>
        </div>
        <button className='primary my-4 font-semibold font-serif'>Save</button>
      </form>
    </div>
  )
}








