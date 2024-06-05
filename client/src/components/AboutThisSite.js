import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function AboutThisSite() {
  const form = useRef();
  let YOUR_SERVICE_ID = "doug.e.fishNN@gmail.com";
  let YOUR_TEMPLATE_ID = "template_j26qvab";
  let YOUR_PUBLIC_KEY = "hnaI_MVKgRLHhx_NK";
  let [formState, setFormState] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormState(true);
    const delay = 5000; // in milliseconds
    setTimeout(() => {
      window.location.reload(true);
    }, delay);

    emailjs
      .sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        form.current,
        YOUR_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="border border-solid ml-2 mr-2 mt-3 mb-5 md:ml-10 md:mr-10 md:mt-5 md:pb-5 rounded bg-white shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)]">
        <div className="form-content">
          <h1
            className="text-xl font-bold md:px-3"
            style={{ fontFamily: "ArchitectsDaughter, serif" }}
          >
            Welcome!
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 md:px-3 pt-0 md:pt-2">
              This web app is created for the fishing community in the Greater
              Hampton Roads Area. Our hope is that it is used and enjoyed by
              everyone who loves all things fishing! By design, the tool should
              be easy, efficient, friendly, fun, and intuitive. There will NEVER
              be ads. It should and will be always free for everyone to use! 
              &nbsp;&nbsp;--<i>Enjoy! &nbsp;&nbsp;Property is theft!</i>
              <br></br>
              <br></br>
              <i className="fa fa-envelope"></i>&nbsp;&nbsp;&nbsp;If you have an
              suggestions for making this a more effective or fun tool please
              shoot us a message via the contact form below. (*powered by
              emailJS)
              <br></br>
              <br></br>
            </div>
          </div>{" "}
          {/* closes row */}
          <form ref={form} onSubmit={sendEmail} id="emailForm">
            <div className="w-full md:w-1/2 px-3 pt-2">
              <input
                type="text"
                name="user_name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Name"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3 pt-2">
              <input
                type="email"
                name="user_email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3 pt-2">
              <textarea
                rows="3"
                type="text"
                name="message"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Message"
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-3 pt-5">
              <button
                type="submit"
                className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
              >
                Submit Message
              </button>
            </div>

            <div className="w-full md:w-1/2 px-3 pt-2">
              {formState? <div>Success! Thanks for the message!</div> : null}
            </div>
          </form>
        </div>

        <div className="pl-10">
          <i>Programmers! Want to Contribute?</i>
        </div>
        <div className="w-full md:w-1/2 pt-5 pl-10">
          <i className="fa fa-github-alt"></i>&nbsp;&nbsp;&nbsp;Take a
          look at the public gitHub repository&nbsp;
          <a
            href="https://github.com/ioo52987/doug-e-fish"
            target="_blank"
            rel="noopener noreferrer"
            className="text-mexican-orange font-bold"
          >
            here
          </a>
          .<i> v{process.env.REACT_APP_VERSION}</i>
        </div>
      </div>
    </>
  ); 
}

export default AboutThisSite;
