import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInputs } from "../../formSource"; // Import your inputs data

const New = ({ title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [employeeCode, setEmployeeCode] = useState(""); // Add this state for employeeCode
  const [userName, setUsername] = useState("");
  const [lastName, setLastname] = useState(""); // Change "surname" to "lastname"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); // Add this state for gender
  const [dateOfBirth, setDateOfBirth] = useState(""); // Add this state for dateOfBirth
  const [dateOfJoining, setDateOfJoining] = useState(""); // Add this state for dateOfJoining
  const [status, setStatus] = useState(""); // Add this state for status
  const [adharNumber, setAdharNumber] = useState(""); // Add this state for adharNumber
  const [contactNo, setContactNo] = useState(""); // Add this state for contactNo
  const [emergencyContactNo, setEmergencyContactNo] = useState(""); // Add this state for emergencyContactNo
  const [bloodGroup, setBloodGroup] = useState(""); // Add this state for bloodGroup
  const [panCardNo, setPanCardNo] = useState(""); // Add this state for bloodGroup
  const [permanentAddress, setPermanentAddress] = useState(""); // Add this state for permanentAddress


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", file);
    formDataToSend.append("employeeCode", employeeCode); // Append employeeCode
    formDataToSend.append("userName", userName);
    formDataToSend.append("lastName", lastName); // Change "surname" to "lastname"
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("gender", gender); // Append gender
    formDataToSend.append("dateOfBirth", dateOfBirth); // Append dateOfBirth
    formDataToSend.append("dateOfJoining", dateOfJoining); // Append dateOfJoining
    formDataToSend.append("status", status); // Append status
    formDataToSend.append("adharNumber", adharNumber); // Append adharNumber
    formDataToSend.append("contactNo", contactNo); // Append contactNo
    formDataToSend.append("emergencyContactNo", emergencyContactNo); // Append emergencyContactNo
    formDataToSend.append("bloodGroup", bloodGroup); // Append bloodGroup
    formDataToSend.append("panCardNo", panCardNo); // Append bloodGroup
    formDataToSend.append("permanentAddress", permanentAddress); 

    try {
      await fetch("http://localhost:4001/api/employee/create", {
        method: "POST",
        body: formDataToSend,
      });

      // Optionally, reset form fields or navigate to another page
      setFile("");
      setEmployeeCode("");
      setUsername("");
      setLastname("");
      setEmail("");
      setPassword("");
      setGender("");
      setDateOfBirth("");
      setDateOfJoining("");
      setStatus("");
      setAdharNumber("");
      setContactNo("");
      setEmergencyContactNo("");
      setBloodGroup("");
      setPanCardNo("");
      setPermanentAddress("");
      // Reset form fields or perform other actions after successful submission
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    value={
                      input.key === "employeeCode"
                        ? employeeCode
                        : input.key === "userName"
                        ? userName
                        : input.key === "lastName" // Change "surname" to "lastname"
                        ? lastName
                        : input.key === "email"
                        ? email
                        : input.key === "password"
                        ? password
                        : input.key === "gender"
                        ? gender
                        : input.key === "dateOfBirth"
                        ? dateOfBirth
                        : input.key === "dateOfJoining"
                        ? dateOfJoining
                        : input.key === "status"
                        ? status
                        : input.key === "adharNumber"
                        ? adharNumber
                        : input.key === "contactNo"
                        ? contactNo
                        : input.key === "emergencyContactNo"
                        ? emergencyContactNo
                        : input.key === "bloodGroup"
                        ? bloodGroup
                        : input.key === "panCardNo"
                        ? panCardNo
                        : input.key === "permanentAddress"
                        ? permanentAddress
                        : ""
                    }
                    onChange={(e) => {
                      if (input.key === "employeeCode") setEmployeeCode(e.target.value);
                      else if (input.key === "userName") setUsername(e.target.value);
                      else if (input.key === "lastName") setLastname(e.target.value); // Change "surname" to "lastname"
                      else if (input.key === "email") setEmail(e.target.value);
                      else if (input.key === "password") setPassword(e.target.value);
                      else if (input.key === "gender") setGender(e.target.value);
                      else if (input.key === "dateOfBirth") setDateOfBirth(e.target.value);
                      else if (input.key === "dateOfJoining") setDateOfJoining(e.target.value);
                      else if (input.key === "status") setStatus(e.target.value);
                      else if (input.key === "adharNumber") setAdharNumber(e.target.value);
                      else if (input.key === "contactNo") setContactNo(e.target.value);
                      else if (input.key === "emergencyContactNo") setEmergencyContactNo(e.target.value);
                      else if (input.key === "bloodGroup") setBloodGroup(e.target.value);
                      else if (input.key === "panCardNo") setPanCardNo(e.target.value);
                      else if (input.key === "permanentAddress") setPermanentAddress(e.target.value);
                    }}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;



import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInputs } from "../../formSource"; // Import your inputs data

const New2 = ({ title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [username, setUsername] = useState("");
  const [nameAndSurname, setNameAndSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", file);
    formDataToSend.append("username", username);
    formDataToSend.append("nameAndSurname", nameAndSurname);
    formDataToSend.append("email", email);
    formDataToSend.append("phone", phone);
    formDataToSend.append("password", password);
    formDataToSend.append("address", address);
    formDataToSend.append("country", country);

    try {
      await fetch("http://localhost:4001/api/employee/create", {
        method: "POST",
        body: formDataToSend,
      });

      // Optionally, reset form fields or navigate to another page
      setFile("");
      setUsername("");
      setNameAndSurname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAddress("");
      setCountry("");
      // Reset form fields or perform other actions after successful submission
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    value={
                      input.key === "username"
                        ? username
                        : input.key === "surname"
                        ? nameAndSurname
                        : input.key === "email"
                        ? email
                        : input.key === "phone"
                        ? phone
                        : input.key === "password"
                        ? password
                        : input.key === "address"
                        ? address
                        : country
                    }
                    onChange={(e) => {
                      if (input.key === "username")
                        setUsername(e.target.value);
                      else if (input.key === "surname")
                        setNameAndSurname(e.target.value);
                      else if (input.key === "email") setEmail(e.target.value);
                      else if (input.key === "phone") setPhone(e.target.value);
                      else if (input.key === "password")
                        setPassword(e.target.value);
                      else if (input.key === "address")
                        setAddress(e.target.value);
                      else if (input.key === "country")
                        setCountry(e.target.value);
                    }}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

 New2;




import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};
 Datatable;

