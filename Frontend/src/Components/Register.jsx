import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });

  function handleData(e) {
    const { name, value } = e.target;
    setData((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  }

  async function handleUserData(e) {
    e.preventDefault();

    const { name, email, phonenumber } = data;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        phonenumber,
      }),
    });

    const responseData = await res.json();
    console.log(responseData);

    if (res.status === 422 || !responseData) {
      alert("error");
      console.log("error");
    } else {
      alert("data added");
      console.log("add added");
    }
  }

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>

      <form className="mt-4">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            onChange={handleData}
            value={data.name}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={data.email}
            onChange={handleData}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            name="phonenumber"
            value={data.phonenumber}
            onChange={handleData}
          />
        </div>

        <button
          onClick={handleUserData}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
