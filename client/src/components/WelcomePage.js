import OrangeBtn from "./Equipment/orangeBtn.js";
import { Link } from "react-router-dom";

export default function welcome() {
  return (
    <>
      <div id="hero">
        <div className="flex flex-col shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)] bg-gradient-to-r from-orange-200 to-amber-100 items-start bg-cover bg-center bg-50%_50% bg-no-repeat mx-auto pl-7 pr-7 md:pl-20 md:pr-20 pt-9">
          <div
            className="text-2xl md:text-3xl text-[#111111] font-light"
            style={{ fontFamily: "ArchitectsDaughter, serif" }}
          >
            Welcome to
          </div>
          <div
            className="text-4xl md:text-6xl text-dark-gray font-bold md:mb-2"
            style={{ fontFamily: "Reggae, serif" }}
          >
            Doug-E-Fish
          </div>
          <div className="text-2xl md:text-2xl text-black font-light mt-2 mb-9">
            A Greater Hampton Road's Fishing Tool
          </div>
          <Link to="/map">
            <div className="mb-9">
              <OrangeBtn text="Come on In!" />
            </div>
          </Link>
        </div>
      </div>
      <div id="hero-subtext">
        <div className="flex items-center justify-center mt-20">
          <div className="text-lg md:text-xl text-black mb-4">
            One Website,&nbsp;
          </div>
          <div className="text-lg md:text-xl text-mexican-orange font-bold mb-4">
            All the Fish
          </div>
        </div>
        {/*
        <div className="flex items-center justify-center text-black text-sm md:text-base font-normal mt-5 md:mt-8">
          <div className="">Made for tracking,&nbsp;</div>
          <div className="text-mexican-orange font-bold">Good Times!</div>
        </div> */}
      </div>
    </>
  );
}
