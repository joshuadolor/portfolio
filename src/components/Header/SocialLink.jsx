const SocialLink = ({ icon, link, label }) => {
  return (
    <a className="text-4xl hover:text-[#f2c542]" href={link}>
      {icon}
    </a>
  );
};

export default SocialLink;
