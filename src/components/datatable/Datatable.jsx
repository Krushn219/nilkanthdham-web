import "./datatable.scss";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Swal from "sweetalert2";

const Datatable = () => {
  const [userRows, setUserRows] = useState([]);
  const [filter, setFilter] = useState(""); // State to store the filter value
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(async () => {
    await fetch(process.env.REACT_APP_API_URL + `/api/employee/all`)
      .then((response) => response.json())
      .then((data) => {
        data = data.employee;

        const rows = data.map((user) => ({
          id: user._id,
          employeeCode: user.employeeCode,
          firstName: user.userName,
          lastName: user.lastName,
          status: user.status,
          image: user.image,
          // Map more fields you want to display here
        }));
        // Filter rows based on search query
        const filteredRows = rows.filter((user) =>
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setUserRows(filteredRows);
        // setUserRows(rows);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery]);

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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
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
        <Link to="/users/new" className="link">
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
