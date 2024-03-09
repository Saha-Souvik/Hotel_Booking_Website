import facebook from "../src/pages/images/facebook.png";
import twitter from "../src/pages/images/twitter.png";
import instagram from "../src/pages/images/instagram.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer text-white p-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to={'https://facebook.com'}>
            <img src={facebook} alt="Facebook" className="h-10" />
          </Link>
          <Link to={'https://twitter.com'}>
            <img src={twitter} alt="twitter" className="h-10" />
          </Link>
          <Link to={'https://instagram.com'}>
            <img src={instagram} alt="instagram" className="h-10" />
          </Link>
        </div>

        <div className="text-center font-mono">
          <p>Contact Us:</p>
          <p>Email: bookmyroom@gmail.com</p>
          <p>Phone: +919845127765</p>
        </div>
      </div>

      <div className="mt-4 text-center font-bold">
        <p>&copy; 2023 BookMyRoom. All rights reserved.</p>
      </div>
    </footer>
  );
}