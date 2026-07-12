import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../features/counter/apiCalls";
import { toast } from "react-toastify";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const isFetching = useSelector((state) => state.product.isFetching);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, dispatch);
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => (
        <div className="productListItem">
          <img className="productListImg" src={params.row.img} alt="" />
          {params.row.title}
        </div>
      ),
    },
    { field: "inStock", headerName: "Stock", width: 120 },
    { field: "price", headerName: "Price", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => (
        <>
          <Link to={"/product/" + params.row._id}>
            <button className="productListEdit">Edit</button>
          </Link>
          <DeleteOutlineIcon
            className="productListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="productList">
      <div className="productListHeader">
        <h2>Products</h2>
        <Link to="/newproduct">
          <button className="productListCreate">Add New</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        loading={isFetching}
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
