import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams("");

  const navigate = useNavigate("");

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

  async function getData() {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();
    console.log(responseData);

    if (res.status === 422 || !responseData) {
      console.log("error");
    } else {
      setData(responseData);
      console.log("get data");
    }
  }

  useEffect(() => {
    getData();
  });

  async function updateUser(e) {
    e.preventDefault();

    const { name, email, phonenumber } = data;

    const updatedResponse = await fetch(`/updateuser/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        phonenumber,
      }),
    });

    const data2 = await updatedResponse.json();

    if (updatedResponse.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert("data added");
      navigate("/");
    }
  }
  return (
    <div>
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
            type="submit"
            onClick={updateUser}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
