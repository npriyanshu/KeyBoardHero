import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAPI } from "../apis/AuthApi";
import toast from "react-hot-toast";
import {  postMistakes, postUserData } from "../apis/FireStroreAPI";
import { getUniqueId } from "../helpers/getUniqueId";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await RegisterAPI(email,password);
      toast.success("Account Created!");

      postUserData({
        name:name,
        email:email,
        userId:getUniqueId(),
      })

      postMistakes(
        {
          email:email,
          mistakenLetters:{},
          userId:getUniqueId(),
        }
      )
  
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName",name);

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create Your Account");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>Already a User? {' '}<Link to={'/login'}>Login</Link></p>
      
    </div>
  );
};

export default Signup;
