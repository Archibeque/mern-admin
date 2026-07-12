import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProductFailure, updateProductStart, updateProductSuccess } from "../../features/counter/productRedux";
import { userRequest } from "../../requestMethods";
import PublishIcon from "@mui/icons-material/Publish";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );

  const [inputs, setInputs] = useState({
    title: product?.title || "",
    desc: product?.desc || "",
    price: product?.price || "",
    inStock: product?.inStock ?? true,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(product?.img || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateProductStart());
    try {
      let res;
      if (file) {
        // Send file to backend — backend uploads to Supabase and returns updated product with img URL
        const formData = new FormData();
        formData.append("image", file);
        Object.entries(inputs).forEach(([k, v]) => formData.append(k, String(v)));
        res = await userRequest.put(`/products/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await userRequest.put(`/products/${productId}`, inputs);
      }
      dispatch(updateProductSuccess({ id: productId, product: res.data }));
      toast.success("Product updated!");
    } catch {
      dispatch(updateProductFailure());
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product?.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleUpdate}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              name="desc"
              type="text"
              value={inputs.desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              name="price"
              type="text"
              value={inputs.price}
              onChange={handleChange}
            />
            <label>In Stock</label>
            <select name="inStock" value={inputs.inStock} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={preview || product?.img}
                alt=""
                className="productUploadImg"
              />
              <label htmlFor="productFile">
                <PublishIcon className="productUploadIcon" />
              </label>
              <input
                type="file"
                id="productFile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFile}
              />
            </div>
            <button type="submit" className="productButton" disabled={loading}>
              {loading ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
