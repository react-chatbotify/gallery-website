import { Link, useNavigate } from "react-router-dom";

import { handleLogin } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { SiteConfig } from "../constants/SiteConfig";
import logo from "../assets/images/logo.png";

/**
 * Greets user as they visit the home (landing) page.
 */
const HomePage = () => {
  // used to render different text if user is logged in
  const { isLoggedIn, userData } = useAuth();

  // handles navigation
  const navigate = useNavigate();

  return (
    <div className="relative bg-black text-white min-h-screen flex">
      <div className="md:w-1/2 flex flex-col justify-center items-center p-10 fade-down">
        <h1
          id="title"
          className="text-6xl font-bold text-center leading-tight mb-4"
        >
          Welcome to <br className="md:hidden" /> {SiteConfig.siteName}
        </h1>
        {isLoggedIn ? (
          <p id="subtitle" className="text-lg text-center mb-8">
            It&apos;s good to see you, {userData?.name}!
          </p>
        ) : (
          <p id="subtitle" className="text-lg text-center mb-8">
            Browse, rate and share themes for your chatbot today!
          </p>
        )}
        <div className="flex justify-center">
          {!isLoggedIn && (
            <button
              type="button"
              className="bg-white text-black px-6 py-3 rounded-md mr-4
								hover:bg-blue-500 transition-colors duration-300"
              onClick={() => {
                handleLogin("/themes");
              }}
            >
              Login
            </button>
          )}
          <button
            type="button"
            className="border border-white px-6 py-3 rounded-md
							hover:bg-purple-800 transition-colors duration-300"
            onClick={() => navigate("/themes")}
          >
            Browse Themes
          </button>
        </div>
        {/* todo: add logos to link to documentation, github, discord etc */}

        <div className="mt-5 w-40 h-16 flex items-center flex-row gap-4 justify-center">
          <Link to="https://github.com/tjtanjin/react-chatbotify">
            <svg
              className="fill-white w-8 hover:fill-blue-500 transition-colors duration-300"
              width="35px"
              height="35px"
              viewBox="0 0 24.00 24.00"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#fff"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M9.29183 21V18.4407L9.3255 16.6219C9.36595 16.0561 9.58639 15.5228 9.94907
										15.11C9.95438 15.1039 9.95972 15.0979 9.9651 15.0919C9.9791 15.0763 9.96988
										15.0511 9.94907 15.0485V15.0485C7.52554 14.746 5.0005 13.7227 5.0005
										9.26749C4.9847 8.17021 5.3427 7.10648 6.00437 6.27215C6.02752 6.24297
										6.05103 6.21406 6.07492 6.18545V6.18545C6.10601 6.1482 6.11618 6.09772 6.10194
										6.05134C6.10107 6.04853 6.10021 6.04571 6.09935 6.04289C6.0832 5.9899 6.06804
										5.93666 6.05388 5.88321C5.81065 4.96474 5.86295 3.98363 6.20527 3.09818C6.20779
										3.09164 6.21034 3.08511 6.2129 3.07858C6.22568 3.04599 6.25251 3.02108 6.28698
										3.01493V3.01493C6.50189 2.97661 7.37036 2.92534 9.03298 4.07346C9.08473 4.10919
										9.13724 4.14609 9.19053 4.18418V4.18418C9.22901	4.21168 9.27794 4.22011 9.32344
										4.20716C9.32487 4.20675 9.32631 4.20634 9.32774 4.20593C9.41699 4.18056 9.50648
										4.15649 9.59617 4.1337C11.1766 3.73226 12.8234 3.73226 14.4038 4.1337C14.4889
										4.1553 14.5737 4.17807 14.6584 4.20199C14.6602 4.20252 14.6621 4.20304 14.6639
										4.20356C14.7174 4.21872 14.7749 4.20882 14.8202 4.17653V4.17653C14.8698 4.14114
										14.9187 4.10679 14.967 4.07346C16.6257 2.92776 17.4894 2.9764 17.7053
										3.01469V3.01469C17.7404 3.02092 17.7678 3.04628 17.781 3.07946C17.7827 3.08373
										17.7843 3.08799 17.786 3.09226C18.1341 3.97811 18.1894 4.96214 17.946
										5.88321C17.9315 5.93811 17.9159 5.9928 17.8993 6.04723V6.04723C17.8843
										6.09618 17.8951 6.14942 17.9278 6.18875C17.9289 6.18998 17.9299 6.19121 17.9309
										6.19245C17.9528 6.21877 17.9744 6.24534 17.9956 6.27215C18.6573 7.10648 19.0153
										8.17021 18.9995 9.26749C18.9995 13.747 16.4565 14.7435 14.0214
										15.015V15.015C14.0073 15.0165 14.001 15.0334 14.0105 15.0439C14.0141 15.0479
										14.0178 15.0519 14.0214 15.0559C14.2671 15.3296 14.4577 15.6544 14.5811
										16.0103C14.7101 16.3824	14.7626 16.7797 14.7351 17.1754V21"
                  stroke="#323232"
                  strokeWidth="0.8640000000000001"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M4 17C4.36915 17.0523 4.72159 17.1883 5.03065 17.3975C5.3397 17.6068 5.59726
										17.8838 5.7838 18.2078C5.94231 18.4962 6.15601 18.7504 6.41264 18.9557C6.66927
										19.161 6.96379 19.3135 7.27929 19.4043C7.59478 19.4952 7.92504 19.5226 8.25112
										19.485C8.5772 19.4475 8.89268 19.3457 9.17946 19.1855"
                  stroke="#323232"
                  strokeWidth="0.8640000000000001"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </Link>

          <Link to="https://discord.gg/6R4DK4G5Zh">
            <svg
              className=" fill-white w-8 hover:fill-blue-500 transition-colors duration-300"
              fill="#000000"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529
									1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274
									0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061
									2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0
									1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0
									.137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785
									16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988
									0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001
									1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047
									1.798-2.047	1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"
                />
              </g>
            </svg>
          </Link>

          <Link to="https://react-chatbotify.com/docs/introduction/quickstart">
            <svg
              className=" fill-white w-8 hover:fill-blue-500 transition-colors duration-300"
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929
										3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523
										19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
                  stroke="#200E32"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />{" "}
                <path
                  d="M20 8H15V3"
                  stroke="#200E32"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M7.5 13H7V17H7.5C8.60457 17 9.5 16.1046 9.5 15C9.5 13.8954 8.60457 13 7.5 13Z"
                  stroke="#200E32"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M17.5 13L17 13C16.4477 13 16 13.4477 16 14V16C16 16.5523
										16.4477 17 17 17H17.5"
                  stroke="#200E32"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M11.5 14C11.5 13.4477 11.9477 13 12.5 13H13C13.5523 13 14
										13.4477 14 14V16C14 16.5523 13.5523 17 13 17H12.5C11.9477
										17 11.5 16.5523 11.5 16V14Z"
                  stroke="#200E32"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </Link>
        </div>
      </div>

      <div
        className="md:w-1/2 absolute top-0 bottom-0 right-0
					opacity-40 bg-no-repeat bg-cover bg-center animate-bob"
        style={{ backgroundSize: "70%", backgroundImage: `url(${logo})` }}
      />
    </div>
  );
};

export default HomePage;
