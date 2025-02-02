import { Link } from "react-router-dom";
import "./404.css";
import Logo from '../../assets/logo-cardly.png'

const NotFoundPage = ({ error, username }) => {
    const API_URL = import.meta.env.VITE_API_URL 
    const Login = () => {
        window.location.href = `${API_URL}/auth/google`;
      }
  return (
    <div className="not-found-container">
      <img src={Logo} className="not-found-logo" alt="" />
      <p className="error-message">
        { `The page you’re looking for doesn’t exist :(`}
      </p>
      <p className="sub-message">
        Want this to be your username?
      </p>
      <div className="button-group">
        <Link to="/" className="error-link">
          Go Home
        </Link>
        <button onClick={Login} className="create-link">Claim {username}</button>
      </div>
      <Link  to="/" className="footer-link">
              <div className="footer-container">
        <span style={{
          
          
          
         
          
        }} className="footer-text">Powered by</span>
        
          <img className='cardly-link-logo' src={Logo} alt="Cardly Logo" />
       
      </div>
      
      </Link>
    </div>
  );
};

export default NotFoundPage;
