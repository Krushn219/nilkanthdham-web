import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUserInputs } from "../../formSource"; // Import your inputs data
import Swal from "sweetalert2";
import { FormControl, MenuItem, Select } from "@mui/material";

const EditUserForm = ({ title }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
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
    status:""
  });

  useEffect(async () => {
    // Fetch user details from the server
    await fetch(process.env.REACT_APP_API_URL + `/api/employee/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const userDetail = data.employee;
        // Update the form data with user details
        setFormData({
          ...formData,
          ...userDetail,
        });
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  

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
      // If a new image is selected, append it to formDataToSend
      formDataToSend.append("image", file);
    }

    const updatedData = {}; // Create a new object to hold updated data

    for (const key in formData) {
      if (formData[key] !== "" && (!file || key !== "image")) {
        // Append only updated fields, excluding the image if no new image is selected
        updatedData[key] = formData[key];
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await fetch(
        process.env.REACT_APP_API_URL + `/api/employee/edit/${userId}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      // Show a success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User data has been updated successfully!",
      });

      // Reset form fields or perform other actions after successful submission
      setFile("");
      navigate(`/admin/${userId}`);
    } catch (error) {
      console.error("Error updating user:", error);

      // Show an error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating user data.",
      });
    }
  };

   // Function to handle the back button click
   const handleBackButtonClick = () => {
    navigate(`/admin/${userId}`);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top" style={{"justify-content":"space-between", alignItems:"center"}}>
          {/* <h1>{title}</h1> */}
          <h1>Edit Information</h1>
          <button onClick={handleBackButtonClick}>Back</button>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : formData.image
                  ? formData.image
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

              {editUserInputs.map((input) => (
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
                ): input.key === "status" ? (
                  <FormControl>
                  <Select
                    value={formData.status}
                    onChange={(e) =>
                      handleInputChange("status", e.target.value)
                    }
                  >
                    <MenuItem value="active">active</MenuItem>
                    <MenuItem value="inActive">inActive</MenuItem>
                  </Select>
                </FormControl>
                ):(
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
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
