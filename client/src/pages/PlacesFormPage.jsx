import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";


export default function PlacesFormPage(){
  const {id} = useParams();
  
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);

  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get("/places/"+id).then(res =>{
      const {data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    })
  },[id])

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,}

    if(id) {
      //update
      console.log(placeData)
      await axios.put("/places", {
        id,
        ...placeData
      });
      setRedirect(true)
    }else{
      console.log(placeData)
      await axios.post("/places", 
        placeData
      );
    }
    
    setRedirect(true);
  }  
  if (redirect) {
    return <Navigate to={'/account/places'}/>
  }
    return(
        <div>
            <AccountNav/>
          <form onSubmit={savePlace}>
            <h2 className="text-xl mt-4 font-medium">Title</h2>
            <p className="text-gray-500 text-sm mt-1">
              Title for your place should be short and catchy as in
              advertisement
            </p>
            <input
              type="text"
              placeholder="title, ex. My apartment"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />

            <h2 className="text-xl mt-2 font-medium">Address</h2>
            <p className="text-gray-500 text-sm mt-1">Address to this place</p>
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />

            <h2 className="text-xl mt-4 font-medium">Description</h2>
            <p className="text-gray-500 text-sm">description of the place</p>
            <textarea
              className="w-screen mt-3 border rounded-2xl h-40 p-4"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <h2 className="text-xl mt-4 font-medium">Perks</h2>
            <p className="text-gray-500 text-sm ">
              select all the perks of the place
            </p>
            <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className="text-xl mt-4 font-medium">Extra Info</h2>
            <p className="text-gray-500 text-sm ">house rules, etc.</p>
            <textarea
              className="w-screen mt-3 border rounded-2xl h-20 p-4"
              value={extraInfo}
              onChange={(e) => {
                setExtraInfo(e.target.value);
              }}
            ></textarea>
            <h2 className="text-xl mt-4 font-medium">
              Check in&out times, max guests
            </h2>
            <p className="text-gray-500 text-sm ">
              add check in and out times, rememeber to have some time window for
              cleaning the between the guests
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1"> Check in time</h3>
                <input
                  type="text"
                  placeholder="11:00"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                />
              </div>

              <div>
                <h3 className="mt-2 -mb-1"> Check out time</h3>
                <input
                  type="text"
                  placeholder="11:00"
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1"> Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => {
                    setMaxGuests(e.target.value);
                  }}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1"> Price per night</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4 ">Save</button>
            </div>
          </form>
        </div>
                )
};
