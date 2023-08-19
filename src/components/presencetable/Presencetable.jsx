import "./presencetable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { presenceColumns, presenceRows } from "../../datatablesource";
import Swal from "sweetalert2";

const Presencetable = () => {
  const [presenceData, setPresenceData] = useState([]);
  const [workHours, setWorkHours] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFutureDate, setIsFutureDate] = useState(false);

  const presenceColumns = [
    { field: "employeeCode", headerName: "Employee Code", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.employeeName}
          </div>
        );
      },
    },
    {
      field: "present",
      headerName: "Present Status",
      width: 160,
      //   editable:true,
      renderCell: (params) => (
        <div
          className={`cellWithStatus ${
            params.row.present ? "active" : "inactive"
          }`}
        >
          <label className="checkboxLabel">
            <input
              type="checkbox"
              checked={params.row.present}
              onChange={(e) =>
                handlePresenceChange(params.id, "present", e.target.checked)
              }
            />
            {params.row.present ? "Present" : "Absent"}
          </label>
        </div>
      ),
    },
    {
      field: "workHours",
      headerName: "Work Hours",
      width: 130,
      renderCell: (params) => (
        <div className="workHoursCell">
          <label>
            <input
              type="number"
              value={params.row.workHours}
              onChange={(e) =>
                handlePresenceChange(params.id, "workHours", e.target.value)
              }
              disabled={!params.row.present}
            />
          </label>
        </div>
      ),
    },
    // Add more fields you want to display here
  ];

  useEffect(() => {
    fetchEmployeeData();
  }, [selectedDate]);

  const fetchEmployeeData = async () => {
    setLoading(true);
    setError(null);

    const today = new Date();
    const selectedDateValue = new Date(selectedDate);

    if (selectedDateValue > today) {
      // Selected date is in the future
      setPresenceData([]);
      setLoading(false);
      setIsFutureDate(true);
      return;
    }

    let apiEndpoint = `/api/employee/pastDateData/${
      selectedDateValue.toISOString().split("T")[0]
    }`;

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + apiEndpoint);

      if (response.ok) {
        const data = await response.json();
        const employeeData = data.employee;

        if (employeeData.length === 0) {
          // If no data available, fetch all employees
          const allResponse = await fetch(
            process.env.REACT_APP_API_URL + `/api/employee/all`
          );

          if (allResponse.ok) {
            const allData = await allResponse.json();
            const allEmployeeData = allData.employee;
            const transformedData = allEmployeeData.map((employee) => ({
              id: employee._id,
              employeeName: `${employee.userName}`,
              employeeCode: employee.employeeCode,
              present: false,
              workHours: "",
              date: selectedDateValue.toISOString().split("T")[0],
              image: employee.image,
            }));
            setPresenceData(transformedData);
            setLoading(false);
            setIsFutureDate(false);
          } else {
            setError("Error fetching all employee data");
            setLoading(false);
          }
        } else {
          const transformedData = employeeData.map((employee) => ({
            id: employee._id,
            employeeName: `${employee.userName}`,
            employeeCode: employee.employeeCode,
            present: employee.present,
            workHours: employee.workHours,
            date: selectedDateValue.toISOString().split("T")[0],
            image: employee.image,
          }));
          setPresenceData(transformedData);
          setLoading(false);
          setIsFutureDate(false);
        }
      } else {
        setError("Error fetching employee data");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setError("Error fetching employee data");
      setLoading(false);
    }
  };

  const handlePresenceChange = (id, field, value) => {
    // Update presenceData based on the changed value
    const updatedPresenceData = presenceData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );

    setPresenceData(updatedPresenceData);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetEditableFields = () => {
    const resetData = presenceData.map((row) => ({
      ...row,
      workHours: "",
      present: false, // Set it to the default value (e.g., false for "Absent")
    }));
    setPresenceData(resetData);
  };

  const handleSaveData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if there are any present users without work hours
      const hasMissingHours = presenceData.some(
        (row) => row.present && !row.workHours
      );

      // Transform the data and ensure that absent users have work hours of 0
      const updatedData = presenceData.map((row) => ({
        ...row,
        workHours: row.present ? row.workHours || "0" : "0",
      }));

      if (hasMissingHours) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please enter 'Work Hours' for all 'Present' employees.",
        });
      } else {
        const response = await fetch(
          process.env.REACT_APP_API_URL + `/api/employeePresence/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ presenceData: updatedData }),
          }
        );

        const responseData = await response.json();
        console.log("Response:", responseData);

        // Reset editable fields after a successful response
        resetEditableFields();

        setLoading(false);

        // Show a success SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data saved successfully!",
          timer: 1500, // Automatically close after 1.5 seconds
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Error saving data");
      setLoading(false);

      // Show an error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while saving data.",
      });
    }
  };

  return (
    <div className="employeePresence">
      <div className="datatable">
        <div className="datePickerContainer">
          <label>Select Date: </label>
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
          />
        </div>
        {isFutureDate ? (
          <div className="errorMessage">
            Selected date is in the future. Please select a date in the past or
            today.
          </div>
        ) : (
          <DataGrid
            rows={presenceData}
            columns={presenceColumns}
            //   pageSize={9}
            checkboxSelection
            components={{
              Toolbar: () => (
                <div className="toolbar">
                  <button
                    onClick={handleSaveData}
                    disabled={loading}
                    className="saveButton"
                  >
                    {loading ? "Saving..." : "Save Data"}
                  </button>
                </div>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Presencetable;
