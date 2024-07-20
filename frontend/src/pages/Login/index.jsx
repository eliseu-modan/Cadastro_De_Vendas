import { Card } from "antd";
import { LoginForm } from "../../components/Login";
import "../../assets/styles/global.css";
import Logo from "../../assets/images/logo.png"
const Login = () => {
  return (
    <div className="login-container"
    >
      <img
        src={Logo}
        alt="Task"
        style={{
          position: "absolute",
          width: "99.9%",
          left: "0%",
          top: "0%",
          height: "119.6%",
          opacity: "100%",
          margin:"1px",
        }}
        />
      <Card
        className="login-card"
        style={{
          position: "absolute",
          width: "30%",
          height: "30.78%",
          top: "60%",
          background: "#d4d9d8",
          left: "65.8%",
          opacity: "77%",
          
        }}
      >
        <h3 style={{ color: "#000000" }}>Login - Sistema de Vendas </h3>
        <LoginForm />
      </Card>
    </div>
  );
};

export default Login;
