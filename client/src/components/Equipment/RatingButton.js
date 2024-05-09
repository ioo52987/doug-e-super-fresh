import { useState } from "react";

function RatingButton({ fieldValues }) {
  /* DYNAMIC ACTIVE CLASS - RATING */
  let [activeButtons, setActiveButtons] = useState({
    active1: true,
    active2: false,
    active3: false,
    active4: false,
    active5: false,
  });

  let [rating, setChildRating] = useState(1); // shows rating on the page
  let [star, setStar] = useState("star");

  const setParentRating = (eventID) => {
    fieldValues.rating = eventID;
  };
  setParentRating(rating); // passes page load rating (1), without a click event

  // handle rating field button group -- could do some basic arithmetic to make this cleaner (future work)
  const handleClickActivation = (event) => {
    let eventID = Number(event.target.id);
    setChildRating(eventID);
    setParentRating(eventID);
    eventID === 1 ? setStar("star") : setStar("stars");

    switch (eventID) {
      case 1:
        setActiveButtons({
          ...activeButtons,
          active1: true,
          active2: false,
          active3: false,
          active4: false,
          active5: false,
        });
        break;
      case 2:
        setActiveButtons({
          ...activeButtons,
          active1: true,
          active2: true,
          active3: false,
          active4: false,
          active5: false,
        });
        break;
      case 3:
        setActiveButtons({
          ...activeButtons,
          active1: true,
          active2: true,
          active3: true,
          active4: false,
          active5: false,
        });
        break;
      case 4:
        setActiveButtons({
          ...activeButtons,
          active1: true,
          active2: true,
          active3: true,
          active4: true,
          active5: false,
        });
        break;
      case 5:
        setActiveButtons({
          ...activeButtons,
          active1: true,
          active2: true,
          active3: true,
          active4: true,
          active5: true,
        });
        break;
    }
  };
  return (
    <div>
      {/* use map() here -- (uses bootstrap UI tools)*/}
      <div
        className="btn-group row"
        role="group"
        aria-label="rating"
        id="rating"
      >
        <div className="col-xs-12 col-md-12">
          <button
            type="button"
            className={
              activeButtons.active1
                ? "bg-purple-300 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
                : "bg-gray-200 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
            }
            id="1"
            onClick={handleClickActivation}
          >
            <i className="fa fa-star"></i>
          </button>
          <button
            type="button"
            className={
              activeButtons.active2
                ? "bg-purple-300 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
                : "bg-gray-200 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
            }
            id="2"
            onClick={handleClickActivation}
          >
            <i className="fa fa-star"></i>
          </button>
          <button
            type="button"
            className={
                activeButtons.active3
                  ? "bg-purple-300 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
                  : "bg-gray-200 rounded pr-4 pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
              }
            id="3"
            onClick={handleClickActivation}
          >
            <i className="fa fa-star"></i>
          </button>
          <button
            type="button"
            className={
                activeButtons.active4
                  ? "bg-purple-300 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
                  : "bg-gray-200 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
              }
            id="4"
            onClick={handleClickActivation}
          >
            <i className="fa fa-star"></i>
          </button>
          <button
            type="button"
            className={
                activeButtons.active5
                  ? "bg-purple-300 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
                  : "bg-gray-200 rounded pt-2 pb-2 pr-3 pl-3 md:pr-4 md:pl-4 m-0.5"
              }
            id="5"
            onClick={handleClickActivation}
          >
            <i className="fa fa-star"></i>
          </button>
        </div>
        {/*<div className='rating col-xs-2 col-md-2'>{rating} {star}</div>*/}
      </div>{" "}
      {/* close row */}
    </div>
  );
}
export default RatingButton;
