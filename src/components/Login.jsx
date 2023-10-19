import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI } from "../apis/AuthApi";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let res = await LoginAPI(email,password);
      toast.success("Signed In to Linkedin!");

      localStorage.setItem("userEmail", res.user.email);
      
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Not Registered?{' '}<Link to={'/signup'}>SignUp</Link></p>
    </div>
  );
};

export default Login;
