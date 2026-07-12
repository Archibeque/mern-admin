import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userRequest } from "../../requestMethods";

const FALLBACK_AVATAR =
  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await userRequest.get("/users");
        setUsers(res.data);
      } catch {
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted.");
    } catch {
      toast.error("Failed to delete user.");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
        <div className="userListUser">
          <img
            className="userListImg"
            src={params.row.img || FALLBACK_AVATAR}
            alt=""
          />
          {params.row.username}
        </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => (
        <>
          <Link to={"/user/" + params.row._id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutlineIcon
            className="userListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="userList">
      <div className="userListHeader">
        <h2>Users</h2>
        <Link to="/newUser">
          <button className="userListCreate">Add New</button>
        </Link>
      </div>
      <DataGrid
        rows={users}
        loading={loading}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        autoHeight
      />
    </div>
  );
}
