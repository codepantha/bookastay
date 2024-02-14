import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';

import * as apiClient from '../api-client';

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotels,
    {
      onError: () => {}
    }
  );
  return (
    <div className="space-y-5">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <nav>
          <Link
            to="my-hotels"
            className="
              flex bg-blue-600 text-white rounded shadow-md text-xl
              font-bold p-2 hover:bg-blue-500"
          >
            Add Hotel
          </Link>
        </nav>
      </header>
      <section className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <article
            className="flex flex-col justify-between border border-slate-300
              rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <p className="whitespace-pre-line">{hotel.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex flex-col items-center text-center">
                <BsMap className="mr-2" />
                <p>
                  {hotel.city}, {hotel.country}
                </p>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex flex-col items-center text-center">
                <BsBuilding className="mr-2" />
                <p>{hotel.type}</p>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex flex-col items-center text-center">
                <BiMoney className="mr-2" />
                <p>{hotel.pricePerNight} per night</p>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex flex-col items-center text-center">
                <BiHotel className="mr-2" />
                <p>
                  {hotel.adultCount} adults, {hotel.childCount} children
                </p>
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex flex-col items-center text-center">
                <BiStar className="mr-2" />
                <p>{hotel.starRating} star rating</p>
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="
              flex bg-blue-600 text-white rounded shadow-md text-xl
              font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </article>
        ))}
      </section>
    </div>
  );
};

export default MyHotels;
