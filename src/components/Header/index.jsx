import Navbar from "../NavBar";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import SocialLink from "./SocialLink";
const socials = [
  {
    icon: <FaFacebook />,
    link: "https://www.facebook.com/joshuadolor",
    label: "facebook",
  },
  {
    icon: <FaGithub />,
    link: "https://github.com/joshuadolor",
    label: "github",
  },
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/joshuadolor/",
    label: "linkedin",
  },
  {
    icon: <FaWhatsapp />,
    link: "https://api.whatsapp.com/send?phone=34673452825",
    label: "whatsapp",
  },
];
const HeaderComponent = () => {
  return (
    <header className="lg:fixed md:fixed w-full lg:w-[500px] md:w-[500px] lg:h-[100%] md:h-[100%] flex flex-col gap-2  pb-3 lg:pb-20 md:pb-20 p-10 md:p-20 lg:p-20">
      <h1 className="font-bold text-5xl text-white">Joshua Dolor</h1>
      <h2 className="text-white text-2xl">Web Engineer</h2>
      <div className="py-2">
        <a
          className="rounded-xl  bg-[#f2c542] text-gray-700 hover:shadow-md hover:outline text-sm py-2 px-4"
          href="./JoshuaDolor.pdf"
          download
        >
          Download CV
        </a>
      </div>

      <Navbar />
      <div className="gap-2 flex">
        {socials.map((item) => (
          <SocialLink {...item} key={item.label} />
        ))}
      </div>
      <div className="mt-1 text-white">
        <a href="tel:+34673452825" className="hover:text-[#f2c542]">
          +34 673 452 825
        </a>
      </div>
      <div className="text-white">
        <a
          href="mailto:dev.joshuadolor@gmail.com"
          className="hover:text-[#f2c542]"
        >
          dev.joshuadolor@gmail.com
        </a>
      </div>
    </header>
  );
};

export default HeaderComponent;
