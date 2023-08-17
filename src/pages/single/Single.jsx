import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Single = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null); // State to store the user details

  // User Details
  useEffect(async() => {
    // await fetch(process.env.REACT_APP_API_URL_LOCAL + `api/employee/${userId}`)
    await fetch(process.env.REACT_APP_API_URL + `/api/employee/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const userDetail = data.employee;
        setUser(userDetail);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Link
                to={`/users/edit/${userId}`}
                style={{ textDecoration: "none" }}
              >
                Edit
              </Link>
            </div>
            <h1 className="title">Information</h1>
            {/* Render user details */}
            {user && (
              <div className="item">
                <img src={user.image} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{`${user.userName} ${user.lastName}`}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Employee Code:</span>
                    <span className="itemValue">{user.employeeCode}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{user.contactNo}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Emaergency Phone:</span>
                    <span className="itemValue">{user.emergencyContactNo}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{user.presentAddress}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Gender:</span>
                    <span className="itemValue">{user.gender}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Blood Group:</span>
                    <span className="itemValue">{user.bloodGroup}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Birth Date:</span>
                    <span className="itemValue">{user.dateOfBirth}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Joining Date:</span>
                    <span className="itemValue">{user.dateOfJoining}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Status:</span>
                    <span className="itemValue">{user.status}</span>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default Single;
