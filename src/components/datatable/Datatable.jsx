import "./datatable.scss";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Swal from "sweetalert2";
import axios from "axios";
import { Menu, MenuItem } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import * as ExcelJS from "exceljs";

const Datatable = () => {
  const [userRows, setUserRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [downloadOption, setDownloadOption] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateForDownload, setSelectedDateForDownload] = useState(
    new Date()
  );
  const userColumns = [
    { field: "employeeCode", headerName: "Employee Code", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.firstName}
          </div>
        );
      },
    },
    { field: "lastName", headerName: "Last Name", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <div className={`cellWithStatus ${params.value.toLowerCase()}`}>
          {params.value}
        </div>
      ),
    },
    // Add more fields you want to display here
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
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

  // Filter user rows based on the selected filter
  const filteredUserRows = userRows.filter((user) => {
    if (filter === "") {
      return true; // Show all users
    } else {
      return user.status === filter; // Show only users with the selected status
    }
  });

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // Send a DELETE request to delete the user on the server
      await fetch(process.env.REACT_APP_API_URL + `/api/employee/${userId}`, {
        method: "DELETE",
      });

      // Remove the deleted user from the userRows state
      setUserRows((prevUserRows) =>
        prevUserRows.filter((user) => user.id !== userId)
      );

      Swal.fire("Deleted!", "The user has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire("Error", "An error occurred while deleting the user.", "error");
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const downloadExcel = (data, fileName) => {
    if (Array.isArray(data.employee)) {
      const selectedFields = [
        "employeeCode",
        "userName",
        "present",
        "workHours",
        "dailyWages",
      ];

      // Customize the header names
      const customHeaderNames = [
        "Employee Code",
        "Employee Name",
        "Attendance",
        "Work Hours",
        "Daily Wages",
      ];

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      //  Set the header row with custom names
      const headerRow = worksheet.addRow(customHeaderNames);
      headerRow.eachCell((cell) => {
        cell.font = { bold: true, size: 12 };
      });

      // Add data to the worksheet and adjust cell lengths
      data.employee.forEach((item) => {
        const rowData = selectedFields.map((field) => item[field]);
        const row = worksheet.addRow(rowData);

        // Adjust cell lengths
        selectedFields.forEach((field, colNumber) => {
          const column = worksheet.getColumn(colNumber + 1);
          const maxLength = Math.max(
            field.length,
            ...data.employee.map((item) => String(item[field]).length)
          );

          // Set minimum width based on the maximum length of the header and cell content
          column.width = maxLength + 5;
        });
      });

      // Create a buffer
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName || "data.xlsx";
        document.body.appendChild(a);

        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
      });
    } else {
      console.error('Invalid data format. Expected an array for "employee".');
    }
  };

  

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (option) => {
    setDownloadOption(option);

    try {
      // Fetch data from the server
      let endpoint = "";
      let formattedParam = "";
      let fileName = "download.xlsx";
      switch (option) {
        case "day":
          formattedParam = selectedDateForDownload.toISOString().split("T")[0];
          endpoint =
            process.env.REACT_APP_API_URL +
            `/api/employee/pastDateData/${formattedParam}`;
          fileName = `day_${formattedParam}.xlsx`;
          break;
        case "month":
          formattedParam = selectedDate.toISOString().split("T")[0].slice(0, 7);
          endpoint = `/api/monthData/${formattedParam}`;
          break;
        case "user":
          endpoint = "/api/userData";
          break;
        default:
          console.error("Invalid download option");
          return;
      }

      // Show loading spinner while fetching data
      Swal.fire({
        title: "Downloading...",
        text: "Please wait...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const response = await axios.get(endpoint);
      const data = response.data;

      // Close the loading spinner
      Swal.close();

      // For simplicity, you can log the data to the console
      console.log("Data for Excel:", data);

      // Simulate a download prompt
      Swal.fire({
        title: "Download Confirmation",
        text: "Do you want to download the Excel file?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, download it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await downloadExcel(data, fileName);

          // Show downloaded successfully
          Swal.fire({
            title: "Downloaded Successfully",
            text: `The file ${fileName} has been downloaded.`,
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error fetching data for download:", error);
      Swal.fire(
        "Error",
        "An error occurred while fetching data for download.",
        "error"
      );
    }

    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (date) => {
    // setSelectedDate(date);
    setSelectedDateForDownload(date);
  };

  useEffect(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/employee/all`
      );
      const data = await response.json();

      if (response.ok) {
        const rows = data.employee.map((user) => ({
          id: user._id,
          employeeCode: user.employeeCode,
          firstName: user.userName,
          lastName: user.lastName,
          status: user.status,
          image: user.image,
        }));

        // Filter rows based on search query
        const filteredRows = rows.filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setUserRows(filteredRows);
      } else {
        console.error("Error fetching data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [searchQuery]);

  return (
    <div className="datatable">
      <div className="statusHeader">
        <div className="filterContainer">
          <button
            className={`filterButton ${filter === "" ? "active" : ""}`}
            onClick={() => handleFilterChange("")}
          >
            All
          </button>
          <button
            className={`filterButton ${filter === "active" ? "active" : ""}`}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </button>
          <button
            className={`filterButton ${filter === "inActive" ? "active" : ""}`}
            onClick={() => handleFilterChange("inActive")}
          >
            Inactive
          </button>
        </div>
        <div className="downloadContainer">
          <Button
            variant="outlined"
            endIcon={<CloudDownloadIcon />}
            onClick={handleMenuClick}
          >
            Download
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              Day-wise
              <input
                type="date"
                value={selectedDateForDownload.toISOString().split("T")[0]}
                onChange={(e) =>
                  setSelectedDateForDownload(new Date(e.target.value))
                }
                style={{ marginLeft: "10px", marginRight: "-10px" }}
              />
              <Button
                variant="outlined"
                endIcon={<CloudDownloadIcon />}
                onClick={() => handleMenuItemClick("day")}
                style={{ border: "none" }}
              ></Button>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("month")}>
              Month-wise
              {/* Use the DatePicker for month-wise option */}
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  views={["year", "month"]}
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider> */}
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("user")}>
              User-wise
            </MenuItem>
          </Menu>
        </div>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchOutlinedIcon />
        </div>
      </div>
      <div className="datatableTitle">
        Add New User
        {/* <div className="download">
          <div className="downloadOptions">
            <label>
              <input
                type="radio"
                value="day"
                checked={downloadOption === "day"}
                onChange={() => setDownloadOption("day")}
              />
              Day-wise
            </label>
            <label>
              <input
                type="radio"
                value="month"
                checked={downloadOption === "month"}
                onChange={() => setDownloadOption("month")}
              />
              Month-wise
            </label>
            <label>
              <input
                type="radio"
                value="user"
                checked={downloadOption === "user"}
                onChange={() => setDownloadOption("user")}
              />
              User-wise
            </label>
          </div>
          <IconButton className="downloadButton" onClick={handleDownload}>
            <CloudDownloadIcon />
          </IconButton>
        </div> */}
        <Link to="/admin/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        // rows={userRows}
        rows={filteredUserRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
