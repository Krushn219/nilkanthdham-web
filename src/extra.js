// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userInputs } from "../../formSource"; // Import your inputs data

// const New = ({ title }) => {
//   const navigate = useNavigate();
//   const [file, setFile] = useState("");
//   const [employeeCode, setEmployeeCode] = useState(""); // Add this state for employeeCode
//   const [userName, setUsername] = useState("");
//   const [lastName, setLastname] = useState(""); // Change "surname" to "lastname"
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [gender, setGender] = useState(""); // Add this state for gender
//   const [dateOfBirth, setDateOfBirth] = useState(""); // Add this state for dateOfBirth
//   const [dateOfJoining, setDateOfJoining] = useState(""); // Add this state for dateOfJoining
//   const [status, setStatus] = useState(""); // Add this state for status
//   const [adharNumber, setAdharNumber] = useState(""); // Add this state for adharNumber
//   const [contactNo, setContactNo] = useState(""); // Add this state for contactNo
//   const [emergencyContactNo, setEmergencyContactNo] = useState(""); // Add this state for emergencyContactNo
//   const [bloodGroup, setBloodGroup] = useState(""); // Add this state for bloodGroup
//   const [panCardNo, setPanCardNo] = useState(""); // Add this state for bloodGroup
//   const [permanentAddress, setPermanentAddress] = useState(""); // Add this state for permanentAddress


//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("image", file);
//     formDataToSend.append("employeeCode", employeeCode); // Append employeeCode
//     formDataToSend.append("userName", userName);
//     formDataToSend.append("lastName", lastName); // Change "surname" to "lastname"
//     formDataToSend.append("email", email);
//     formDataToSend.append("password", password);
//     formDataToSend.append("gender", gender); // Append gender
//     formDataToSend.append("dateOfBirth", dateOfBirth); // Append dateOfBirth
//     formDataToSend.append("dateOfJoining", dateOfJoining); // Append dateOfJoining
//     formDataToSend.append("status", status); // Append status
//     formDataToSend.append("adharNumber", adharNumber); // Append adharNumber
//     formDataToSend.append("contactNo", contactNo); // Append contactNo
//     formDataToSend.append("emergencyContactNo", emergencyContactNo); // Append emergencyContactNo
//     formDataToSend.append("bloodGroup", bloodGroup); // Append bloodGroup
//     formDataToSend.append("panCardNo", panCardNo); // Append bloodGroup
//     formDataToSend.append("permanentAddress", permanentAddress); 

//     try {
//       await fetch("http://localhost:4001/api/employee/create", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       // Optionally, reset form fields or navigate to another page
//       setFile("");
//       setEmployeeCode("");
//       setUsername("");
//       setLastname("");
//       setEmail("");
//       setPassword("");
//       setGender("");
//       setDateOfBirth("");
//       setDateOfJoining("");
//       setStatus("");
//       setAdharNumber("");
//       setContactNo("");
//       setEmergencyContactNo("");
//       setBloodGroup("");
//       setPanCardNo("");
//       setPermanentAddress("");
//       // Reset form fields or perform other actions after successful submission
//       navigate("/users");
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               {userInputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input
//                     type={input.type}
//                     placeholder={input.placeholder}
//                     value={
//                       input.key === "employeeCode"
//                         ? employeeCode
//                         : input.key === "userName"
//                         ? userName
//                         : input.key === "lastName" // Change "surname" to "lastname"
//                         ? lastName
//                         : input.key === "email"
//                         ? email
//                         : input.key === "password"
//                         ? password
//                         : input.key === "gender"
//                         ? gender
//                         : input.key === "dateOfBirth"
//                         ? dateOfBirth
//                         : input.key === "dateOfJoining"
//                         ? dateOfJoining
//                         : input.key === "status"
//                         ? status
//                         : input.key === "adharNumber"
//                         ? adharNumber
//                         : input.key === "contactNo"
//                         ? contactNo
//                         : input.key === "emergencyContactNo"
//                         ? emergencyContactNo
//                         : input.key === "bloodGroup"
//                         ? bloodGroup
//                         : input.key === "panCardNo"
//                         ? panCardNo
//                         : input.key === "permanentAddress"
//                         ? permanentAddress
//                         : ""
//                     }
//                     onChange={(e) => {
//                       if (input.key === "employeeCode") setEmployeeCode(e.target.value);
//                       else if (input.key === "userName") setUsername(e.target.value);
//                       else if (input.key === "lastName") setLastname(e.target.value); // Change "surname" to "lastname"
//                       else if (input.key === "email") setEmail(e.target.value);
//                       else if (input.key === "password") setPassword(e.target.value);
//                       else if (input.key === "gender") setGender(e.target.value);
//                       else if (input.key === "dateOfBirth") setDateOfBirth(e.target.value);
//                       else if (input.key === "dateOfJoining") setDateOfJoining(e.target.value);
//                       else if (input.key === "status") setStatus(e.target.value);
//                       else if (input.key === "adharNumber") setAdharNumber(e.target.value);
//                       else if (input.key === "contactNo") setContactNo(e.target.value);
//                       else if (input.key === "emergencyContactNo") setEmergencyContactNo(e.target.value);
//                       else if (input.key === "bloodGroup") setBloodGroup(e.target.value);
//                       else if (input.key === "panCardNo") setPanCardNo(e.target.value);
//                       else if (input.key === "permanentAddress") setPermanentAddress(e.target.value);
//                     }}
//                   />
//                 </div>
//               ))}
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default New;



// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { userInputs } from "../../formSource"; // Import your inputs data

// const New2 = ({ title }) => {
//   const navigate = useNavigate();
//   const [file, setFile] = useState("");
//   const [username, setUsername] = useState("");
//   const [nameAndSurname, setNameAndSurname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [country, setCountry] = useState("");

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("image", file);
//     formDataToSend.append("username", username);
//     formDataToSend.append("nameAndSurname", nameAndSurname);
//     formDataToSend.append("email", email);
//     formDataToSend.append("phone", phone);
//     formDataToSend.append("password", password);
//     formDataToSend.append("address", address);
//     formDataToSend.append("country", country);

//     try {
//       await fetch("http://localhost:4001/api/employee/create", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       // Optionally, reset form fields or navigate to another page
//       setFile("");
//       setUsername("");
//       setNameAndSurname("");
//       setEmail("");
//       setPhone("");
//       setPassword("");
//       setAddress("");
//       setCountry("");
//       // Reset form fields or perform other actions after successful submission
//       navigate("/users");
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               {userInputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input
//                     type={input.type}
//                     placeholder={input.placeholder}
//                     value={
//                       input.key === "username"
//                         ? username
//                         : input.key === "surname"
//                         ? nameAndSurname
//                         : input.key === "email"
//                         ? email
//                         : input.key === "phone"
//                         ? phone
//                         : input.key === "password"
//                         ? password
//                         : input.key === "address"
//                         ? address
//                         : country
//                     }
//                     onChange={(e) => {
//                       if (input.key === "username")
//                         setUsername(e.target.value);
//                       else if (input.key === "surname")
//                         setNameAndSurname(e.target.value);
//                       else if (input.key === "email") setEmail(e.target.value);
//                       else if (input.key === "phone") setPhone(e.target.value);
//                       else if (input.key === "password")
//                         setPassword(e.target.value);
//                       else if (input.key === "address")
//                         setAddress(e.target.value);
//                       else if (input.key === "country")
//                         setCountry(e.target.value);
//                     }}
//                   />
//                 </div>
//               ))}
//               <button type="submit">Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//  New2;




// import "./datatable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Datatable = () => {
//   const [data, setData] = useState(userRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             <div
//               className="deleteButton"
//               onClick={() => handleDelete(params.row.id)}
//             >
//               Delete
//             </div>
//           </div>
//         );
//       },
//     },
//   ];
//   return (
//     <div className="datatable">
//       <div className="datatableTitle">
//         Add New User
//         <Link to="/users/new" className="link">
//           Add New
//         </Link>
//       </div>
//       <DataGrid
//         className="datagrid"
//         rows={data}
//         columns={userColumns.concat(actionColumn)}
//         pageSize={9}
//         rowsPerPageOptions={[9]}
//         checkboxSelection
//       />
//     </div>
//   );
// };
//  Datatable;


// //  19-8-2023
// import "./presencetable.scss";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useState, useEffect } from "react";
// import { presenceColumns, presenceRows } from "../../datatablesource";

// const Presencetable = () => {
//   const [presenceData, setPresenceData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const presenceColumns = [
//     { field: "employeeCode", headerName: "Employee Code", width: 150 },
//     {
//       field: "user",
//       headerName: "User",
//       width: 230,
//       renderCell: (params) => {
//         return (
//           <div className="cellWithImg">
//             <img className="cellImg" src={params.row.image} alt="avatar" />
//             {params.row.employeeName}
//           </div>
//         );
//       },
//     },
//     {
//       field: "present",
//       headerName: "Present Status",
//       width: 160,
//     //   renderCell: (params) => (
//     //     <div
//     //       className={`cellWithStatus ${
//     //         params.row.present ? "active" : "inactive"
//     //       }`}
//     //     >
//     //       <label className="checkboxLabel">
//     //         <input
//     //           type="checkbox"
//     //           checked={params.row.present}
//     //           onChange={(e) =>
//     //             handlePresenceChange(params.id, "present", e.target.checked)
//     //           }
//     //         />
//     //         {params.row.present ? "Present" : "Absent"}
//     //       </label>
//     //     </div>
//     //   ),
//     },
//     {
//       field: "workHours",
//       headerName: "Work Hours",
//       width: 130,
//     },
//     // Add more fields you want to display here
//   ];

//   useEffect(() => {
//     fetchEmployeeData();
//   }, []);

//   const fetchEmployeeData = () => {
//     setLoading(true);
//     setError(null);

//     fetch("http://localhost:4001/api/employee/all")
//       .then((response) => response.json())
//       .then((data) => {
//         const employeeData = data.employee;
//         const transformedData = employeeData.map((employee) => ({
//           id: employee._id,
//           employeeName: `${employee.userName} ${employee.lastName}`,
//           employeeCode: employee.employeeCode,
//           present: false,
//           workHours: "",
//           date: selectedDate.toISOString().split("T")[0],
//           image: employee.image,
//         }));

//         setPresenceData(transformedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching employee data:", error);
//         setError("Error fetching employee data");
//         setLoading(false);
//       });
//   };

//     const handlePresenceChange = (id, field, value) => {
//       // Update presenceData based on the changed value
//       const updatedPresenceData = presenceData.map((row) =>
//         row.id === id ? { ...row, [field]: value } : row
//       );
//       console.log("updatedPresenceData+++",updatedPresenceData)
//       setPresenceData(updatedPresenceData);
//     };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };


//   const handleSaveData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const updatedData = presenceData.map((row) => {
//         if (row.present) {
//           return { ...row, workHours: row.workHours || "0" };
//         } else {
//           return { ...row, present: false, workHours: "0" };
//         }
//       });

//       const changedData = updatedData.filter(
//         (row) =>
//           row.present !== false ||
//           row.present !== false ||
//           (row.workHours !== "" && row.workHours !== "0")
//       );

//       const response = await fetch(
//         process.env.REACT_APP_API_URL + `/api/employeePresence/create`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ presenceData: changedData }),
//         }
//       );

//       const responseData = await response.json();
//       console.log("Response:", responseData);

//       setLoading(false);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       setError("Error saving data");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="employeePresence">
//       <div className="datatable">
//         <div className="datePickerContainer">
//           <label>Select Date: </label>
//           <input
//             type="date"
//             value={selectedDate.toISOString().split("T")[0]}
//             onChange={(e) => handleDateChange(new Date(e.target.value))}
//           />
//         </div>
//         <DataGrid
//           rows={presenceData}
//           columns={presenceColumns.map((column) => ({
//             ...column,
//             editable:
//               column.field === "present" || column.field === "workHours",
//           }))}
//           pageSize={10}
//           checkboxSelection
//           components={{
//             Toolbar: () => (
//               <div className="toolbar">
//                 <button
//                   onClick={handleSaveData}
//                   disabled={loading}
//                   className="saveButton"
//                 >
//                   {loading ? "Saving..." : "Save Data"}
//                 </button>
//               </div>
//             ),
//           }}
//           onEditCell={(params) => {
//             console.log("Edit Cell Params:", params);
//             handlePresenceChange(params.id, params.field, params.props.value);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Presencetable;

 //   const fetchEmployeeData = async () => {
  //     setLoading(true);
  //     setError(null);

  //     const today = new Date();
  //     const selectedDateValue = new Date(selectedDate);

  //     try {
  //       const response = await fetch(
  //         process.env.REACT_APP_API_URL +
  //           `/api/employee/all?date=${
  //             selectedDateValue.toISOString().split("T")[0]
  //           }`
  //       );
  //       const data = await response.json();
  //       const employeeData = data.employee;

  //       const transformedData = employeeData.map((employee) => ({
  //         id: employee._id,
  //         employeeName: `${employee.userName} ${employee.lastName}`,
  //         employeeCode: employee.employeeCode,
  //         present: false,
  //         workHours: "",
  //         date: selectedDateValue.toISOString().split("T")[0],
  //         image: employee.image,
  //       }));

  //       setPresenceData(transformedData);
  //       setLoading(false);
  //       setIsFutureDate(false);
  //     } catch (error) {
  //       console.error("Error fetching employee data:", error);
  //       setError("Error fetching employee data");
  //       setLoading(false);
  //     }
  //   };
  // const fetchEmployeeData = async () => {
  //   setLoading(true);
  //   setError(null);

  //   const today = new Date();
  //   const selectedDateValue = new Date(selectedDate);

  //   if (selectedDateValue <= today) {
  //     // Fetch data and render when the selected date is today or in the past
  //     await fetch(
  //       process.env.REACT_APP_API_URL +
  //         `/api/employee/pastDateData/${
  //           selectedDateValue.toISOString().split("T")[0]
  //         }`
  //     )
  //       .then((response) => response.json())
  //       .then(async (data) => {
  //         if (data.employee.length == 0) {
  //           // Fetch data and render when the selected date is in the past
  //           await fetch(process.env.REACT_APP_API_URL + `/api/employee/all`)
  //             .then((response) => response.json())
  //             .then((data) => {
  //               const employeeData = data.employee;
  //               const transformedData = employeeData.map((employee) => ({
  //                 id: employee._id,
  //                 employeeName: `${employee.userName}`,
  //                 employeeCode: employee.employeeCode,
  //                 present: employee.present,
  //                 workHours: employee.workHours,
  //                 date: selectedDateValue.toISOString().split("T")[0],
  //                 image: employee.image,
  //               }));
  //               setPresenceData(transformedData);
  //               setLoading(false);
  //               setIsFutureDate(false);
  //             });
  //         } else {
  //           const employeeData = data.employee;
  //           const transformedData = employeeData.map((employee) => ({
  //             id: employee._id,
  //             employeeName: `${employee.userName}`,
  //             employeeCode: employee.employeeCode,
  //             present: employee.present,
  //             workHours: employee.workHours,
  //             date: selectedDateValue.toISOString().split("T")[0],
  //             image: employee.image,
  //           }));

  //           setPresenceData(transformedData);
  //           setLoading(false);
  //           setIsFutureDate(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching employee data:", error);
  //         setError("Error fetching employee data");
  //         setLoading(false);
  //       });
  //   } else {
  //     setPresenceData([]); // Clear the presenceData
  //     setLoading(false);
  //     setIsFutureDate(true);
  //   }
  // };


