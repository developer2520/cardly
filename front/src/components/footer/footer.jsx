import { FaGithub, FaTelegram, FaGlobe } from "react-icons/fa";
import "./footer.css";
import Logo from './../../assets/logo-cardly.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__left">
           <div className="footer__logo">
<img className="logo" src={Logo} alt="" />
<h1 className="footerLogoText">Cardly</h1>
           </div>
            <p className="footer__tagline">Create your profile card </p>
          </div>
          
          <div className="footer__right">
            <div className="footer__links">
              <div className="footer__links-group">
                <h3 className="footer__group-title">Legal</h3>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
              <div className="footer__links-group">
                <h3 className="footer__group-title">Company</h3>
                <a href="#">Contact</a>
                <a href="#">About</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__social">
            <a target="blank" href="https://cardly.uz" aria-label="Website">
              <FaGlobe />
            </a>
            <a target="blank" href="https://t.me/cardlyuz" aria-label="Telegram">
              <FaTelegram />
            </a>
            <a target="blank" href="https://github.com/developer2520/cardly" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
          <p className="footer__copyright">
            © {new Date().getFullYear()} Cardly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;