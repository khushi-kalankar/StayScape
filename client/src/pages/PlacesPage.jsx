import { Link, Navigate, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
  // if (redirectToPlacesList && action!== 'new') {
  //   return <Navigate to = {'/account/places'}/>
  // }
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        list of all added places
        <br />
        <Link
          className="inline-flex bg-primary mt-6 gap-1 text-white py-2 px-6 rounded-full s"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+place._id} className="flex gap-4 cursor-pointer bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0"> 
              <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
              </div>
              
            </Link>
          ))}
      </div>
    </div>
  );
}