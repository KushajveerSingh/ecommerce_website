import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Kushaj All right reserved</p>
      <p className="icons">
        <a href="https://github.com/KushajveerSingh">
          <AiFillGithub />
        </a>
        <a href="https://twitter.com/Kkushaj">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
};

export default Footer;
