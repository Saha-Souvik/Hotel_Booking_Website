import "./stylesheet/IndexPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="p-2 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <div>
          <Link to={'/place/' + place._id} className="home bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
          </Link>
          <h2 className="text-sm font-bold font-serif text-primary mx-2">{place.title}</h2>
          <h3 className=" text-gray-500 font-semibold mx-2">{place.address}</h3>
          <div className="font-semibold text-gray-500">
            <span className="font-bold text-green-600 mx-2"> ${place.price}</span>per night
          </div>
        </div>
      ))}
    </div>
  );
}