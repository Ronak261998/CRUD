import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [getUserData, setGetUserData] = useState([]);
  console.log(getUserData);
  async function getData() {
    const res = await fetch("/getdata", {
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
  }, []);

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
      getData();
    }
  }

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            Add User
          </NavLink>
        </div>

        <table class="table ">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getUserData.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.phonenumber}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success">View</button>
                      </NavLink>
                      <NavLink to={`edit/${element._id}`}>
                        <button className="btn btn-success">Update</button>
                      </NavLink>
                      <button
                        onClick={() => deleteUser(element._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
