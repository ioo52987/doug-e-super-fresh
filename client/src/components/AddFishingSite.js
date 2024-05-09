import { useState } from "react";
import axios from "axios";
import FormErrors from "./FormErrors.js";
import Select from "react-select";

function AddFishingSite() {
  /* FIELD VALUES */
  let [fieldValues, setFieldValues] = useState({
    siteName: "",
    siteType: "",
    longitude: "",
    latitude: "",
    description: "",
    url: "",
  });
  /* FIELD VALUES VALID? */
  let [fieldValuesValid, setFieldValuesValid] = useState({
    siteName: false,
    siteType: false,
    longitude: false,
    latitude: false,
    description: false,
    url: true,
  });
  /* ERROR TEXT (IF ANY) */
  let [formErrors, setFormErrors] = useState({
    siteName: "",
    siteType: "",
    longitude: "",
    latitude: "",
    description: "",
    url: "",
  });
  /* FORM VALIDED? STATE */
  let [formValid, setFormValid] = useState(false);

  // form validation
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "siteName":
        fieldValuesValid.siteName = value.length >= 3 && value.length <= 75;
        formErrors.siteName = fieldValuesValid.siteName
          ? ""
          : " Requires 3-75 characters";
        break;
      case "siteType":
        fieldValuesValid.siteType = value !== "";
        formErrors.siteType = fieldValuesValid.siteType ? "" : " Required";
        break;
      case "longitude":
        fieldValuesValid.longitude = value >= -77.58 && value <= -75.2;
        formErrors.longitude = fieldValuesValid.longitude
          ? ""
          : " Range is -77.58 to -75.2";
        if (fieldValuesValid.longitude) {
          fieldValuesValid.longitude = /\d\d\.\d{5}/gm.test(value);
          formErrors.longitude = fieldValuesValid.longitude
            ? ""
            : "Minimum 5 decimal points";
        }
        break;
      case "latitude":
        fieldValuesValid.latitude = value >= 36.56 && value <= 37.6;
        formErrors.latitude = fieldValuesValid.latitude
          ? ""
          : " Range is 36.56 to 37.60";
        if (fieldValues.latitude) {
          fieldValuesValid.latitude = /\d\d\.\d{5}/gm.test(value);
          formErrors.latitude = fieldValuesValid.latitude
            ? ""
            : "Minimum 5 decimal points";
        }
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

  // on form submission
  const handleSubmit = (e) => {
    console.log(fieldValues);
    console.log(fieldValuesValid);

    e.preventDefault();
    formValid =
      fieldValuesValid.siteName &&
      fieldValuesValid.siteType &&
      fieldValuesValid.longitude &&
      fieldValuesValid.latitude &&
      fieldValuesValid.description &&
      fieldValuesValid.url;

    console.log(formValid);
    //formValid = false;

    if (formValid) {
      axios
        .post(`/` + process.env.REACT_APP_FISHING_SITES_AIRTABLE + `/`, {
          fields: {
            siteName: document.getElementById("siteName").value,
            siteType: siteTypeSelectedOption.value,
            longitude: Number(document.getElementById("longitude").value),
            latitude: Number(document.getElementById("latitude").value),
            description: document.getElementById("description").value,
            siteURL: document.getElementById("url").value,
          },
        })
        .then((resp) => {
          console.log("success!!");
          setFormValid(true);
          const delay = 5000; // in milliseconds
          setTimeout(() => {
            window.location.reload(true);
          }, delay);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [siteTypeSelectedOption, setSiteTypeSelectedOption] = useState(null);

  const handleChange = (item) => {
    setSiteTypeSelectedOption(item);
    setFieldValues({ ...fieldValues, siteType: item.value });
    setFieldValuesValid({ ...fieldValuesValid, siteType: true });
  };

  return (
    <>
      <div className="border border-solid ml-2 mr-2 mt-3 mb-5 md:ml-10 md:mr-10 md:mt-5 md:p-3 md:pb-5 rounded bg-white shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)]">
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 md:px-3 pt-0 md:pt-2">
              <label>Fishing Site Name</label>
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="siteName"
                value={fieldValues.siteName}
                placeholder="Name"
                onChange={(e) => {
                  setFieldValues({ ...fieldValues, siteName: e.target.value });
                  validateField("siteName", e.target.value);
                }}
                minLength="3"
                maxLength="75"
                required
              ></input>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="siteName" />
              </div>
            </div>

            <div className="w-full md:w-1/6 md:px-3 pt-2">
              <label>Site Type</label>
              <Select
                value={siteTypeSelectedOption}
                onChange={handleChange}
                options={[
                  { value: "Tidal", label: "Tidal" },
                  {
                    value: "Non-tidal (Pond/Lake)",
                    label: "Non-tidal (Pond/Lake)",
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
                <FormErrors formErrors={formErrors} fieldName="siteType" />
              </div>
            </div>
            <div className="w-full md:w-1/2"></div>

            <div className="w-full md:w-1/4 md:px-3 pt-2">
              <label>Longitude</label>
              <input
                type="number"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="longitude"
                value={fieldValues.longitude}
                placeholder="Longitude"
                onChange={(e) => {
                  setFieldValues({ ...fieldValues, longitude: e.target.value });
                  validateField("longitude", e.target.value);
                }}
                step=".0000001"
                min="-77.58"
                max="-75.2"
                required
              ></input>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="longitude" />
              </div>
            </div>

            <div className="w-full md:w-1/4 md:px-3 pt-2">
              <label>Latitude</label>
              <input
                type="number"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="latitude"
                value={fieldValues.latitude}
                placeholder="Latitude"
                onChange={(e) => {
                  setFieldValues({ ...fieldValues, latitude: e.target.value });
                  validateField("latitude", e.target.value);
                }}
                step=".0000001"
                min="36.56"
                max="37.60"
                required
              ></input>
              <div className="panel panel-default">
                <FormErrors formErrors={formErrors} fieldName="latitude" />
              </div>
            </div>
            <div className="w-full md:w-1/2"></div>

            <div className="w-full md:w-1/2 md:px-3 pt-2">
              <label>Details about the NEW site!</label>
              <textarea
                rows="5"
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="description"
                value={fieldValues.description}
                placeholder="Description"
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
              <label>Website (optional)</label>
              <input
                type="url"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="url"
                placeholder="Enter an https:// to an associated website"
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
                Submit New Site
              </button>
            </div>
            <div className="w-full md:w-1/2 md:px-3 pt-6 text-mexican-orange">
              {formValid ? (
                <div>Success! Thanks for submitting a new site!"</div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddFishingSite;
