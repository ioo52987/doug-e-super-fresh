import { EnvelopeIcon, CodeBracketIcon } from "@heroicons/react/24/solid";
function AboutThisSite() {
  return (
    <>
      <div className="border border-solid ml-2 mr-2 mt-3 mb-5 md:ml-10 md:mr-10 md:mt-5 md:pb-5 rounded bg-white shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)]">
        <div className="p-5">
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
              <br></br>
              <br>
              </br><i>Enjoy! &nbsp;&nbsp;Property is theft!</i>
              <br></br>
              <br></br>
              <EnvelopeIcon className="h-6 w-6" />
              &nbsp;&nbsp;&nbsp;If you have an suggestions for making this a
              more effective or fun tool please shoot us a message at{" "}
              <i className="text-mexican-orange font-bold">
                &nbsp;doug.e.fishNN@gmail.com
              </i>
              .<br></br>
              <br></br>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:px-3">
            <CodeBracketIcon className="h-6 w-6"/>Take a look at
            the public gitHub repository&nbsp;
            <a
              href="https://github.com/ioo52987/doug-e-super-fresh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mexican-orange font-bold"
            >
              here
            </a>
            .<i> v{process.env.REACT_APP_VERSION}</i>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutThisSite;
