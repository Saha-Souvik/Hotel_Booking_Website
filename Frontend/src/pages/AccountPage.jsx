import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import "./stylesheet/IndexPage.css";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { toast } from 'react-toastify';

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  let { subpage } = useParams();


  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);

  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading....';
  }

  if (ready && !user && !ready) {
    return <Navigate to={'/login'} />;
  }

  function linkClasses(type = null) {
    let classes = 'inline-flex gap-1 py-2 px-6';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  }

  const cancelBooking = async (bookingId) => {
    try {
      await axios.post(`/bookings/${bookingId}/cancel`);
      const response = await axios.get('/bookings');
      setBookings(response.data);
      toast.success("Booking cancelled successfully.")
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };


  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div className=" bg-cover bg-center">
      <nav className="w-full flex justify-center mt-8 mb-8 gap-2 font-bold">
        <Link className={linkClasses('profile')} to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          My Bookings</Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto text-secondary mt-14 h-screen ">
          <span className="text-black font-serif font-bold bg-secondary rounded-full p-2">
            Profile Name:&nbsp;
            <span className="text-blue-500">
              {user.name}<br />
            </span>
          </span><br />
          <span className="text-black font-serif font-bold bg-secondary rounded-full p-2">
            Email Id:&nbsp;
            <span className="text-blue-500">
              {user.email}
            </span>
          </span>
          <button onClick={logout} className="primary max-w-sm mt-7 font-bold">Logout</button>
        </div>


      )}

      {subpage === 'bookings' && (
        <div className="p-4 -mt-2">
          {bookings?.length > 0 && bookings.map(booking => (
            <div className="home flex flex-col sm:flex-row gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
              <div className="w-full sm:w-48 flex flex-shrink-0">
                {booking.place.photos.length > 0 && (
                  <img className="object-cover w-full h-48 sm:h-36" src={'http://localhost:4000/uploads/' + booking.place.photos[0]} alt="" />
                )}

              </div>
              <div className="py-3 pr-3 grow flex flex-col">
                <Link to={`/place/${booking.place._id}`}>
                  <h2 className="text-xl font-bold text-primary font-serif">{booking.place.title}</h2>
                </Link>

                <div className="flex gap-2 border-t border-gray-300 mt-2 py-2 font-sans">
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                  </div>
                  &rarr;
                  <div className="flex gap-1 items-center">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>

                    {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                  </div>
                </div>
                <div className="flex gap-2 text-md">
                  <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    {booking.rooms} rooms
                  </div>
                  <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>

                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                  </div>
                  <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>

                    Total price: {booking.price}
                  </div>
                  <div className="absolute right-8 -mt-28 md:mt-5">
                    <button onClick={() => cancelBooking(booking._id)} className="bg-primary text-sm p-1 rounded-xl text-white">Cancel Booking</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
   );
}
