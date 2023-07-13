import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams("");

  const [getUserData, setGetUserData] = useState([]);

  const navigate = useNavigate("");

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
      setGetUserData(responseData);
      console.log("get data");
    }
  }

  useEffect(() => {
    getData();
  });
  async function deleteUser(id) {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await res2.json();
    console.log(deleteData);

    if (res2.status === 422 || !deleteData) {
      console.log("error");
    } else {
      console.log("get data");
      navigate("/");
    }
  }

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getUserData._id}`}>
              {" "}
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>
            <button
              className="btn btn-danger"
              onClick={() => deleteUser(getUserData._id)}
            >
              <DeleteOutlineIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{getUserData.name}</span>
              </h3>

              <p className="mt-3">
                <MailOutlineIcon />
                Email: <span>{getUserData.email}</span>
              </p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneAndroidIcon />
                mobile: <span>+91 {getUserData.phonenumber}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
