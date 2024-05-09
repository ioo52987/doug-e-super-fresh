import { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import FormErrors from "./Equipment/FormErrors.js";
import RatingButton from "./Equipment/RatingButton.js";
import Select from "react-select";

function AddFishingTrip() {
  const ref = useRef();

  /* FISHING SITES */
  let [fishingSiteData, setFishingSiteData] = useState([]);
  /* DROPDOWN VALUES */
  let [dropdownValues, setDropdownValues] = useState([]);
  /* FIELD VALUES */
  let [fieldValues, setFieldValues] = useState({
    date: new Date(),
    siteName: "",
    tideType: "",
    fishCaught: "",
    rating: "",
    description: "",
    url: "",
  });
  /* FIELD VALUES VALID? */
  let [fieldValuesValid, setFieldValuesValid] = useState({
    date: false,
    siteName: false,
    tideType: false,
    fishCaught: false,
    description: false,
    url: true, // field isn't required and can submit empty
  });
  /* ERROR TEXT (IF ANY) */
  let [formErrors, setFormErrors] = useState({
    date: "",
    siteName: "",
    tideType: "",
    fishCaught: "",
    description: "",
    url: "",
  });
  /* FORM VALID? STATE */
  let [formState, setFormState] = useState();

  // GET fishingSite names for dropdown field
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `${process.env.REACT_APP_API_SERVER_URL}/getFishingSites`
      );
      response = await response.json();
      setFishingSiteData(response);
    }
    fetchMyAPI();
  }, []);

  // alphabetize siteNames and populate dropdown
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < fishingSiteData.length; i++) {
      arr.push(fishingSiteData[i].siteName);
    }
    arr.sort();

    // create obj for react-select
    let selectOptions = [];
    arr.forEach((i) => {
      let obj = { value: i, label: i };
      selectOptions.push(obj);
    });

    setDropdownValues(selectOptions);
  }, [fishingSiteData]);

  // form validation
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "date" /* check on this validator again, not working quite right */:
        //dateValid = (/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/).test(value);
        fieldValuesValid.date = true;
        formErrors.date = fieldValuesValid.date ? "" : " Format mm/dd/yyyy";
        break;
      case "siteName":
        fieldValuesValid.siteName = !/^$/.test(value);
        formErrors.siteName = fieldValuesValid.siteName
          ? ""
          : " Location required";
        break;
      case "tideType":
        fieldValuesValid.tideType = value !== "";
        formErrors.tideType = fieldValuesValid.tideType ? "" : " Required";
        break;
      case "fishCaught":
        fieldValuesValid.fishCaught = /^[^.]*$/.test(value); // why doesn't (in the input field) a period throw an error?
        formErrors.fishCaught = fieldValuesValid.fishCaught
          ? ""
          : " Integers only";
        break;
      case "description":
        fieldValuesValid.description =
          value.length >= 25 && value.length <= 1500;
        formErrors.description = fieldValuesValid.description
          ? ""
          : " Description required to be between 25-1500 characters";
        break;
      case "url":
        fieldValuesValid.url = /(^https:\/\/)|(^\s*$)/.test(value);
        formErrors.url = fieldValuesValid.url
          ? ""
          : " URL requried to begin with https:// ";
        break;
      default:
        break;
    }

    setFormErrors(formErrors);
    setFieldValuesValid(fieldValuesValid);
  };

  // on form submission...
  const handleSubmit = (event) => {
    event.preventDefault();
    formState =
      fieldValuesValid.date &&
      fieldValuesValid.siteName &&
      fieldValuesValid.tideType &&
      fieldValuesValid.fishCaught &&
      fieldValuesValid.description &&
      fieldValuesValid.url;

    //console.log(fieldValues);
    //console.log(fieldValuesValid);
    //console.log(formState);
    //formState = false;

    if (formState) {
      // POST new fishingTrip data
      fetch(`http://localhost:${process.env.REACT_APP_PORT}/fishingTrips`, {
        method: "POST",
        mode: `cors`,
        body: JSON.stringify({
          date: fieldValues.date,
          siteName: siteSelectedOption.value,
          tideType: tideSelectedOption.value,
          fishCaught: Number(fieldValues.fishCaught),
          rating: fieldValues.rating,
          descrb: fieldValues.description,
          url: fieldValues.url,
        }),
        headers: {
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "Content-Type, Accept",
          Origin: "*",
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          //setFormValid(true);
          /*
        const delay = 5000; // in milliseconds
        setTimeout(() => {
          window.location.reload(true);
        }, delay);*/
          return resp.json();
        })
        .then(function (data) {
          console.log(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  /* DROPDOWN STATES */

  const [tideSelectedOption, setTideSelectedOption] = useState(null);
  const [siteSelectedOption, setSiteSelectedOption] = useState(null);
  const handleChange = (item) => {
    if (item.type === "tide") {
      setTideSelectedOption(item);
      setFieldValues({ ...fieldValues, tideType: item.value });
      setFieldValuesValid({ ...fieldValuesValid, tideType: true });
    } else {
      setSiteSelectedOption(item);
      setFieldValues({ ...fieldValues, siteName: item.value });
      setFieldValuesValid({ ...fieldValuesValid, siteName: true });
    }
  };

  return (
    <>
      <div className="border border-solid ml-2 mr-2 mt-3 mb-5 md:ml-10 md:mr-10 md:mt-5 md:p-3 md:pb-5 rounded bg-white shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)]">
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/6 md:px-3 pt-0 md:pt-2">
              <label>Date</label>
              <input
                type="text"
                ref={ref}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="date"
                placeholder="mm/dd/yyyy"
                aria-label={fieldValues.date}
                aria-describedby="basic-addon2"
                onFocus={() => (ref.current.type = "date")}
                onBlur={() => (ref.current.type = "text")}
                onChange={(e) => {
                  setFieldValues({ ...fieldValues, date: e.target.value });
                  validateField("date", e.target.value);
                }}
                required
              ></input>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="date" />
              </div>
            </div>
            <div className="w-full md:w-1/3 md:px-3 pt-2">
              <label>Fishing Site</label>
              <Select
                value={siteSelectedOption}
                onChange={handleChange}
                options={dropdownValues}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "#e5e7eb",
                    lineHeight: "2rem",
                    borderColor: state.isFocused ? "none" : "none",
                    borderWidth: 0,
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: "#9CA3AF", // placeholder color
                  },
                })}
              />
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="siteName" />
              </div>
            </div>
            <div className="w-full md:w-1/3"></div>
            <div className="w-full md:w-1/4 md:px-3 pt-2">
              <label>Rating</label>
              <div id="rating" style={{ zIndex: 0 }}>
                <RatingButton fieldValues={fieldValues} />
              </div>
            </div>

            <div className="w-full md:w-1/6 md:px-3 pt-2">
              <label>Tidal Info</label>
              <Select
                value={tideSelectedOption}
                onChange={handleChange}
                options={[
                  { value: "High Tide", label: "High Tide", type: "tide" },
                  { value: "Low Tide", label: "Low Tide", type: "tide" },
                  { value: "Ebb Tide", label: "Ebb Tide", type: "tide" },
                  {
                    value: "Not Applicable",
                    label: "Not Applicable",
                    type: "tide",
                  },
                ]}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "#e5e7eb",
                    lineHeight: "2rem",
                    borderColor: state.isFocused ? "none" : "none",
                    borderWidth: 0,
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    neutral50: "#9CA3AF", // placeholder color
                  },
                })}
              />
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="tideType" />
              </div>
            </div>
            <div className="w-full md:w-1/12 md:px-3 pt-2">
              <label>Fish No.</label>
              <input
                type="number"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="fishCaught"
                placeholder="#"
                aria-label="No. Fish Caught"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setFieldValues({
                    ...fieldValues,
                    fishCaught: e.target.value,
                  });
                  validateField("fishCaught", e.target.value);
                }}
                min="0"
                max="500"
                required
              ></input>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="fishCaught" />
              </div>
            </div>
            <div className="w-full md:w-1/2"></div>
            <div className="w-full md:w-1/2 md:px-3 pt-2">
              <label>Describe how your trip went!</label>
              <textarea
                rows="5"
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                placeholder="Description"
                aria-label="Describe the fishing trip!"
                onChange={(e) => {
                  setFieldValuesValid({ ...fieldValuesValid, url: false });
                  setFieldValues({
                    ...fieldValues,
                    description: e.target.value,
                  });
                  validateField("description", e.target.value);
                }}
                minLength="25"
                maxLength="1500"
                required
              ></textarea>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="description" />
              </div>
            </div>
            <div className="w-full md:w-1/2"></div>
            <div className="w-full md:w-1/2 md:px-3 pt-2">
              <label>Link to Photo Album (optional)</label>
              <input
                type="url"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="url"
                placeholder="Enter an https:// to a public photo album of trip"
                aria-label={fieldValues.url}
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setFieldValues({ ...fieldValues, url: e.target.value });
                  validateField("url", e.target.value);
                }}
              ></input>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="url" />
              </div>
            </div>
            <div className="w-full md:w-1/2"></div>
            <div className="w-full md:w-1/4 md:px-3 pt-5">
              <button
                type="submit"
                className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
              >
                Submit New Trip
              </button>
            </div>
            <div className="w-full md:w-1/3 md:px-3 pt-2">
              {formState ? (
                <div>"Success! Thanks for submitting a trip!"</div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddFishingTrip;
