import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header(props) {
  let location = useLocation();
  let rootPage = location.pathname === "/" ? true : false;

  return (
    <>
      <div
        id="WhiteHeaderBar"
        className={
          "w-full " +
          (!rootPage
            ? " shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)]"
            : " py-5 md:py-5") +
          " font-['Montserrat'] sticky top-0"
        }
      >
        <div
          className="flex flex-row flex-1 justify-between py-3 items-center px-3 md:px-7 bg-white"
        >
          {!rootPage && (
            <div className="flex flex-row items-center gap-2">
              <button
                type="button"
                onClick={() => props.setNT()}
                className="hover:bg-lite-gray hover:rounded-full rounded-4 p-3 "
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <div
                className="font-medium text-xl text-dark-gray"
                style={{ fontFamily: "Reggae, serif" }}
              >
                <Link to="/">Doug-E-Fish</Link> 
              </div>
            </div>
          )}
        </div>

        {/* gradient line decoration logic */}
        {!rootPage && (
          <div
            className=
              "flex flex-col bg-gradient-to-r from-orange-200 to-amber-100 items-start bg-cover bg-center bg-50%_50% bg-no-repeat mx-auto pl-7 pr-7 md:pl-20 md:pr-20 pt-3"
          ></div>
        )}
      </div>
    </>
  );
}
