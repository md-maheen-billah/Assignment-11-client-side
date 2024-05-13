import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import "../Footer/footer.css";
import logoN from "../../assets/logo.png";
const Footer = () => {
  return (
    <div>
      <footer className="footer foote footer-center p-4 bg-goldenM text-text-greenM">
        <aside>
          <h2 className="flex text-greenM items-center font-medium text-2xl gap-2">
            Savor Oasis <img className="h-6" src={logoN} alt="" />
          </h2>
          <p>Contact Information - md.maheen.billah.97@gmail.com</p>
          <p>Copyright © 2024 - All right reserved by Md. Maheen Billah</p>
          <div className="text-xl mt-2 text-greenM flex items-center gap-4">
            <a href="https://www.facebook.com/md.maheen.billah.97/">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/md-maheen-billah/">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/md.maheen.billah">
              <FaInstagram />
            </a>
          </div>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
