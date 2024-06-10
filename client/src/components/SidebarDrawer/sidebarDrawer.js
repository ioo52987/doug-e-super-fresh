import {
  PlusIcon,
  XMarkIcon,
  BookmarkIcon,
  SparklesIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import "./picPlacement.css";

export default function SidebarDrawer(props) {
  let location = useLocation();

  return (
    <>
      <div className="fixed w-screen h-screen bg-black opacity-70 z-30"></div>
      <div className="fixed top-0 left-0 z-40 bg-white overflow-y-auto h-screen w-full md:w-64 ">
        <button
          type="button"
          onClick={() => props.setNT()}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
        >
          <XMarkIcon className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </button>

        <ul className="flex flex-col py-3">
          {/* about label */}
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-base md:text-sm font-black tracking-wide">
                About
              </div>
            </div>
          </li>

          {/*  */}
          <li onClick={() => props.setNT()}>
            <Link
              to="/about"
              className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-orange-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-8">
                <SparklesIcon className="h-6 w-6" />
              </span>
              <span className="ml-2 text-base md:text-sm tracking-wide truncate">
                Who We Are
              </span>
            </Link>
          </li>

          {/* menu label */}
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-base md:text-sm font-black tracking-wide">
                Menu
              </div>
            </div>
          </li>

          {/* map */}
          <li onClick={() => props.setNT()}>
            <Link
              to="/"
              className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-orange-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-8">
                <MapIcon className="h-6 w-6" />
              </span>
              <span className="ml-2 text-base md:text-sm tracking-wide truncate">
                Map
              </span>
            </Link>
          </li>

          {/* add fishing site */}
          <li onClick={() => props.setNT()}>
            <Link
              to="/inputNewSite"
              className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-orange-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-8">
                <MapPinIcon className="h-6 w-6" />
              </span>
              <span className="ml-2 text-base md:text-sm tracking-wide truncate">
                Add A New Site
              </span>
            </Link>
          </li>

          {/* add a trip */}
          <li onClick={() => props.setNT()}>
            <Link
              to="/inputNewTrip"
              className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-orange-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-8">
                <PlusIcon className="h-6 w-6" />
              </span>
              <span className="ml-2 text-base md:text-sm tracking-wide truncate">
                Add A New Trip
              </span>
            </Link>
          </li>

          {/* previous Trips */}
          <li onClick={() => props.setNT()}>
            <Link
              to="/previousTrips"
              className="relative flex flex-row items-center h-10 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-orange-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-8">
                <BookmarkIcon className="h-6 w-6" />
              </span>
              <span className="ml-2 text-base md:text-sm tracking-wide truncate">
                Previous Trips
              </span>
            </Link>
          </li>
        </ul>
        {location.pathname === "/about" ? (
          <img
            id="jeriIcon"
            src="https://i.ibb.co/kMn501q/jeri-triangle-glasses.png"
            alt="jeri-the-coolest-duh"
            border="0"
          />
        ) : (
          <img
            id="dadIcon"
            src="https://i.ibb.co/WgsJ7WQ/Screenshot-2023-09-14-222730-removebg-preview.png"
            alt="dad-hilton-pier"
            border="0"
          />
        )}
      </div>
    </>
  );
}
