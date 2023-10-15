import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Common/loginstyle.css"

function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  let navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();
    var input = document.getElementById("pswd").value;
    var em = document.getElementById("em").value;
    em = em.trim();
    input = input.trim();

    if (input.length < 8) {
      alert("Password should consist atleast 8 chracters");
    } else if (!input.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) {
      alert(
        "Password should contain a simple letter,a capital letter,a number and a special character"
      );
    } else if (!em.match(/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/)) {
      alert("Email invalid");
    } else if (!fullname || !email || !password || !repassword) {
      alert("Fields can't be empty");
    } else if (password !== repassword) {
      alert("Password Mismatch");
    } else {
      await axios
        .post("http://localhost:8070/admin/addad", {
          fullname,
          email,
          password,
        })
        .then((res) => {
          if (res.data === "Taken") {
            alert("User already available provide another email address ");
          } else alert("Inserted new Admin");
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <body className="my-custom-background">
    <div >
                    <div className="container-cus">

                      <form method="post">
                      <div class = "login-box">
                      <h1 class = "login-box-h2">
                        Admin Sign Up
                      </h1>
                        <div className="user-box label">
                          <label>Full Name :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="text"
                            placeholder="Type your full name"
                            onChange={(e) => {
                              setFullname(e.target.value);
                            }}
                          />
                        </div>

                        <div className="user-box label">
                          <label>Email :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="email"
                            id="em"
                            placeholder="Type your email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>

                        <div className="user-box label">
                          <label>Password :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="password"
                            id="pswd"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>

                        <div className="user-box label">
                          <label>Re-Type Password :</label>
                          <br />
                          <br />
                          <input
                            className="user-box input"
                            type="password"
                            placeholder="Type your password"
                            onChange={(e) => {
                              setRePassword(e.target.value);
                            }}
                          />
                        </div>

                        <div className="subBtn">
                          <input
                            type="submit"
                            className="btnLogin"
                            onClick={sendData}
                            value="Create Account"
                          ></input>
                        </div>

                          <a
                            className="cus-a"
                            href="/login"
                          >
                            Already Have an account?
                          </a>
                       
                        </div>
                      </form>
                    </div>
                  </div>
                  </body>
  );
}

export default SignUp;
