import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInputs } from "../../formSource"; 
import Swal from "sweetalert2";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const New = ({ title }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    dateOfJoining: "",
    userName: "",
    lastName: "",
    permanentAddress: "",
    contactNo: "",
    gender: "Male",
    dateOfBirth: "",
    adharNumber: "",
    panCardNo: "",
    bankname: "",
    accountno: "",
    ifsc: "",
    emergencyContactNo: "",
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
      if (key !== "image") {
        // Exclude the 'image' field from formDataToSend
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/employee/create`, {
        method: "POST",
        body: formDataToSend,
      });

      if(response.ok){
        // Show a success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User has been created successfully!",
      });
      }
      else{
        // Show a error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.error,
      });
      }
    
      // Reset form fields 
      setFile("");
      setFormData({
        ...formData,
        image: "",
      });
      navigate("/admin/list");
    } catch (error) {
      console.error("Error creating user:", error);

      // Show an error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the user.",
      });
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
                  {input.key === "gender" ? ( 
                    <FormControl>
                      <Select
                        defaultValue="Male"
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  ) : input.key === "dateOfJoining" ||
                    input.key === "dateOfBirth" ? (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={formData[input.key]}
                        onChange={(date) => handleInputChange(input.key, date)}
                        renderInput={(params) => <TextField {...params} />}
                        // label={input.label}
                        className="date-picker-modify"
                      />
                    </LocalizationProvider>
                  ) : (
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      value={formData[input.key]}
                      onChange={(e) =>
                        handleInputChange(input.key, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
