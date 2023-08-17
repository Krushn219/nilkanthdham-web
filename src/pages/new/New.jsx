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
  const [formData, setFormData] = useState({
    image: "",
    employeeCode: "",
    username: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    status: "",
    adharNumber: "",
    contactNo: "",
    emergencyContactNo: "",
    bloodGroup: "",
    permanentAddress: "",
  });

  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (file) {
      formDataToSend.append("image", file);
    } 

    for (const key in formData) {
      if (key !== "image") { // Exclude the 'image' field from formDataToSend
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await fetch(process.env.REACT_APP_API_URL_LOCAL + `/api/employee/create`,{
        method: "POST",
        body: formDataToSend,
      })
      // await fetch(process.env.REACT_APP_API_URL + `/api/employee/create`, {
      //   method: "POST",
      //   body: formDataToSend,
      // });

      // Reset form fields or perform other actions after successful submission
      setFile("");
      setFormData({
        ...formData,
        image: "",
      });
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
                    value={formData[input.key]}
                    onChange={(e) => handleInputChange(input.key, e.target.value)}
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
