import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {differenceInCalendarDays} from "date-fns";
import { UserContext } from "../UserContext";
import { toast } from 'react-toastify';

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [numberOfGuests,setNumberOfGuests]=useState(1);
    const [name,setName]=useState('');
    const [phone,setPhone]=useState('');
    const [redirect,setRedirect]=useState('');

    const { user } = useContext(UserContext);

    let numberOfNights=0;
    let roomsRequired=0;
    let totalPrice=0;

    if(checkIn && checkOut){
        numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    async function bookThisPlace(){
        if (!user) {
            toast.warning("For booking please login first!!!");
            setRedirect('/login');
          }
          else if(numberOfNights<0 || !name || !phone){
            toast.info("Please fill in all the required fields correctly.")
            return;
          }
          else{
            roomsRequired=Math.ceil(numberOfGuests/place.maxGuests)
            totalPrice=numberOfNights* place.price *roomsRequired
            alert("Total Rooms Required:"+roomsRequired+"\n"+"Total Price:"+totalPrice);
            toast.success("Booking Successful.");
    
            await axios.post('/bookings',{
                checkIn,checkOut,numberOfGuests,name,phone,
                place:place._id,
                rooms:roomsRequired,
                price:numberOfNights * place.price *roomsRequired
            });
            
           setRedirect('/account/bookings');
          }
       
    }


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data)
        });
    }, [id]);

    if (!place) return '';

    if(redirect){
        return <Navigate to={redirect}/>
    }


    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 min-h-screen">
                <div className="p-5 grid bg-gray-200 min-h-screen">
                    <div>
                        <h2 className="text-lg lg:text-3xl mb-4 font-bold text-center underline">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed top-20 flex gap-1 py-2 px-4 rounded-2xl bg-primary text-white shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>

                            Close photos</button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        {place?.photos?.length > 0 && place.photos.map(photo => (
                            <div className="h-[600px]">
                                <img className="rounded-md w-full h-full object-cover object-center" src={'http://localhost:4000/uploads/' + photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }



    return (

        <div className=" bg-gray-100 px-4 py-8">
            <h1 className="text-3xl font-serif font-bold text-primary">{place.title}</h1>
            <a className="flex gap-1 my-2 font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + place.address} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>

                {place.address}</a>
            <div className="relative">
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {place.photos.slice(0, 3).map((photo, index) => (
                        <div key={index} className="h-[300px]">
                            <img
                                src={'http://localhost:4000/uploads/' + photo}
                                alt=""
                                className="rounded-md w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}


                </div>
                <button onClick={() => setShowAllPhotos(true)}
                    className="flex gap-1 font-mono absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                    </svg>
                    Show more photos</button>
            </div>

            <div className="mt-8 grid gap-12 grid-cols-1 md:grid-cols-[2fr_1fr] font-mono">
                <div>
                    <div className="font-serif text-gray-600">
                        <h2 className="font-semibold text-xl text-black mb-2">Extra info</h2>
                        {place.description}</div>
                    <div className="home mt-4 w-fit p-4 rounded-2xl bg-primary text-white flex items-center">
                        Check-in: {place.checkIn}:00<br />
                        Check-out: {place.checkOut}:00<br />
                        Max number of guests: {place.maxGuests}
                    </div>

                </div>
                <div className="book p-4 rounded-4xl">
                    <div className="text-2xl text-center font-mono font-bold">
                        Price: ${place.price} / per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="py-3 px-7">
                                <label>Check-in:</label>
                                <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
                            </div>
                            <div className="border-l py-3 px-3">
                                <label>Check-out:</label>
                                <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
                            </div>
                        </div>
                        <div className="py-3 px-4 border-t">
                            <label>Number of guests:</label>
                            <input type="number" value={numberOfGuests} onChange={ev=>setNumberOfGuests(ev.target.value)} />
                        </div>
                        {numberOfNights>0 && (
                            <div className="py-3 px-4 border-t">
                            <label>Your full name:</label>
                            <input type="text" value={name} onChange={ev=>setName(ev.target.value)} />
                            <label>Your Phone number:</label>
                            <input type="tel" value={phone} onChange={ev=>setPhone(ev.target.value)} />
                        </div>
                        )}


                    </div>

                    <button onClick={bookThisPlace} className="primary mt-4"> Book Now</button>
                </div>

            </div>

        </div>
    );
}











