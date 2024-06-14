import { Link } from 'react-router-dom';
import botAvatar from '../assets/images/bot_avatar.png';
import Opensource from '../assets/images/Opensource.svg';
import Community from '../assets/images/Community.svg';
import themes from '../assets/images/themes.svg';
import sophisticated from '../assets/images/empowered_adaptability.png';

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-black text-slate-200">
      <div className="p-4 fade-down">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex w-full h-52 justify-center items-center">
            <h1 className=" sm:text-4xl flex items-center gap-4 flex-col text-xl sm:flex-row">
              <img src={botAvatar} alt="" className="sm:w-20 sm:h-20 w-40 h-40 rounded-full" />
              React ChatBotify Theme Gallery
            </h1>
            <div className="sm:w-[40rem] sm:h-[40rem] top-0 bg-[#42b0c5] opacity-5 absolute blur-2xl rounded-full w-40 h-40"></div>
          </div>
          <h1 className="text-lg md:text-2xl md:font-semibold text-center py-4 text-[#42b0c5]">What is it?</h1>
          <p className="text-center py-2">
            React ChatBotify is an open-source library designed to make chatbot development accessible and efficient.
            Whether you're a seasoned developer or just starting out, our intuitive platform and extensive themes
            streamline the process, allowing you to focus on crafting exceptional user experiences.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col h-[28rem] px-3">
              <div className="h-1/2 w-full flex items-center justify-center">
                <img className=" h-[70%]" src={themes} alt="" />
              </div>
              <div className="w-full h-1/2">
                <h1 className="text-center py-4 font-semibold text-lg text-[#42b0c5]">A World of Themes</h1>
                <p className=" text-center">
                  Explore a vibrant marketplace of chatbot themes created by our talented developer community. Find
                  themes for various purposes, from simple FAQ bots to complex conversational interfaces.
                </p>
              </div>
            </div>

            <div className="flex flex-col h-[28rem] px-3">
              <div className="h-1/2 w-full flex items-center justify-center">
                <img className=" h-[70%]" src={Opensource} alt="" />
              </div>
              <div className="w-full h-1/2">
                <h1 className="text-center py-4 font-semibold text-lg text-[#42b0c5]">Open source and extensible</h1>
                <p className=" text-center">
                  Built with open-source principles, React ChatBotify empowers you to customize and extend your
                  chatbot's functionalities. Our themes provide a strong foundation, and the open-source nature allows
                  you to tailor them to your specific needs.
                </p>
              </div>
            </div>

            <div className="flex flex-col h-[28rem] px-3">
              <div className="h-1/2 w-full flex items-center justify-center">
                <img className=" h-[70%]" src={sophisticated} alt="" />
              </div>
              <div className="w-full h-1/2">
                <h1 className="text-center py-4 font-semibold text-lg text-[#42b0c5]">From basic to sophisticated</h1>
                <p className=" text-center">
                  Our theme selection caters for a wide range of requirements. Find themes perfect for straightforward
                  interactions or dive into themes that enable intricate conversational flows.
                </p>
              </div>
            </div>

            <div className="flex flex-col h-[28rem] px-3">
              <div className="h-1/2 w-full flex items-center justify-center">
                <img className=" h-[70%]" src={Community} alt="" />
              </div>
              <div className="w-full h-1/2">
                <h1 className="text-center py-4 font-semibold text-lg text-[#42b0c5]">Inspired by the Community</h1>
                <p className=" text-center">
                  Get inspired by a thriving community of developers showcasing their creations. Browse our community
                  showcases to spark your imagination and discover the pontential of React ChatBotify themes.
                </p>
              </div>
            </div>
          </div>

          <div className=" flex flex-row gap-4 justify-around text-sm sm:text-base">
            <Link to={`/themes`}>
              <button className="p-2  bg-[#42b0c5] rounded">Browse Themes Now</button>
            </Link>

            <Link to={`https://discord.gg/zMw3nCnw`}>
              <button className="p-2  bg-[#42b0c5] rounded flex items-center gap-2">
                {/* <svg className=" fill-white w-8" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 0 0-4.573 0 11.583 11.583 0 0 0-.535-1.097 16.274 16.274 0 0 0-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 0 0 5.061 2.593 12.65 12.65 0 0 0 1.084-1.785 10.689 10.689 0 0 1-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"></path></g></svg> */}
                Join our Discord Forum
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
