import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function BookingWidget({place}){
    
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if (user) {
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0;
    if (checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date( checkOut), new Date( checkIn));
    }

    async function bookThisPlace(){
        
        const response = await axios.post('/bookings',{checkIn, checkOut, numberOfGuests, name, phone,
            place:place._id, price: numberOfNights*place.price
        });
        const bookingId = response.data._id;

        setRedirect(`/account/bookings/${bookingId}`)
    };
    
    if (redirect) {
        return <Navigate to={redirect}/>
    }
    
    return (
        <div className="bg-white shadow p-4 rounded-2xl mt-4 ">
          <div className="text-xl font-semibold text-center">
            Price: ₹ {place.price} / pernight
          </div>
          <div className="border rounded-2xl">
           <div className="flex">
              <div className="py-3 px-4 ">
                   <label> Check-in:</label>
                   <input type="date" 
                   value={checkIn} onChange={(e) => {
                    setCheckIn(e.target.value);
                   }}  />
              </div>
              <div className=" py-3 px-4 border-l">
                   <label> Check-out:</label>
                   <input type="date" value={checkOut} onChange={(e) => {
                    setCheckOut(e.target.value);}}  />
              </div>
            </div>
              <div className=" py-3 px-4 border-t">
                  <label> No. of Guests:</label>
                  <input type="number" value={numberOfGuests} onChange={(e)=>{
                    setNumberOfGuests(e.target.value)
                  }} />
              </div>
              {numberOfNights>0 &&(
            <div className="py-3 px-4 border-t">
                <label>Your full name: </label>
                <input type="text" placeholder="John Doe"
                value={name} onChange={(e)=>{
                    setName(e.target.value);
                }} />
                <label>Your Phone number: </label>
                <input type="tel" placeholder=""
                value={phone} onChange={(e)=>{
                    setPhone(e.target.value);
                }} />
            </div>
          ) }
          </div>
          

          <button onClick={bookThisPlace} className="mt-4 primary">Book this place!
            {numberOfNights > 0 &&  (
                <span>
                   &nbsp; ₹{numberOfNights * place.price}
                </span>
            ) }
          </button>
        </div>
    )
}