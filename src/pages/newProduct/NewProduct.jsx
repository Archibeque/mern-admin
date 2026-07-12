import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductFailure, addProductStart, addProductSuccess } from "../../features/counter/productRedux";
import { userRequest } from "../../requestMethods";
import "./newProduct.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(",").map((c) => c.trim()));
  };

  const handleFile = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image.");
    if (!inputs.title) return toast.error("Title is required.");

    setLoading(true);
    dispatch(addProductStart());
    try {
      // Send file + fields to backend; backend uploads to Supabase and returns the product with img URL
      const formData = new FormData();
      formData.append("image", file);
      Object.entries(inputs).forEach(([k, v]) => formData.append(k, v));
      cat.forEach((c) => formData.append("categories[]", c));

      const res = await userRequest.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addProductSuccess(res.data));
      toast.success("Product created!");
      navigate("/products");
    } catch {
      dispatch(addProductFailure());
      toast.error("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          {preview && (
            <img src={preview} alt="preview" className="addProductPreview" />
          )}
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="e.g. Floral Sundress"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Short description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="dresses, summer, casual"
            onChange={handleCat}
          />
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit" className="addProductButton" disabled={loading}>
          {loading ? "Uploading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
