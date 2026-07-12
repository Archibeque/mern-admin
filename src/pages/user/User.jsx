import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userRequest } from "../../requestMethods";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublishIcon from "@mui/icons-material/Publish";
import "./user.css";

const FALLBACK_AVATAR =
  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userRequest.get(`/users/${userId}`);
        setUser(res.data);
        setForm({
          username: res.data.username || "",
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
        });
        setPreview(res.data.img || null);
      } catch {
        toast.error("Failed to load user.");
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (file) {
        // Send file to backend — backend uploads to Supabase and returns updated user with img URL
        const formData = new FormData();
        formData.append("image", file);
        Object.entries(form).forEach(([k, v]) => formData.append(k, v));
        res = await userRequest.put(`/users/${userId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await userRequest.put(`/users/${userId}`, form);
      }
      setUser(res.data);
      toast.success("User updated!");
    } catch {
      toast.error("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="user"><p>Loading...</p></div>;

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img || FALLBACK_AVATAR}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user.role || "User"}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone || "—"}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address || "—"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleUpdate}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={preview || user.img || FALLBACK_AVATAR}
                  alt=""
                />
                <label htmlFor="userFile">
                  <PublishIcon className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="userFile"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFile}
                />
              </div>
              <button
                type="submit"
                className="userUpdateButton"
                disabled={loading}
              >
                {loading ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
