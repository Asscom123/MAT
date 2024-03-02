import FrameComponent from "./components/FrameComponent";
import "./Login.css";
import Image1 from './assets/Image1.png';
import HP from './assets/HP.jpg'

const Login = () => {
  return (
    <div className="login">
      <main className="image-2-parent">
        <img className="image-2-icon" alt="" src={HP} />
        <section className="frame-child" />
      </main>
      <div className="rectangle-parent">
        <div className="frame-item" />
        <img
          className="image-1-icon"
          loading="eager"
          alt=""
          src={Image1}
        />
        <div className="frame-wrapper">
          <FrameComponent />
        </div>
      </div>
    </div>
  );
};

export default Login;