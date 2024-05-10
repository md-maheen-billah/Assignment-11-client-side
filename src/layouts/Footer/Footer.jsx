import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import "../Footer/footer.css";
const Footer = () => {
  return (
    <div>
      <footer className="footer foote footer-center p-4 bg-[#1e1b4b] text-[#fff4ed]">
        <aside>
          <h2 className="flex items-center text-2xl gap-2">
            Canvas <span className="text-[#f9a06f]">Isle</span>{" "}
            <FaPaintBrush className="text-[#f9a06f]" />
          </h2>
          <p>Contact Information - md.maheen.billah.97@gmail.com</p>
          <p>Copyright © 2024 - All right reserved by Md. Maheen Billah</p>
          <div className="text-xl mt-2 flex items-center gap-4">
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
