import ProductForm from '../components/ProductForm'
import ProductTable from "../components/ProductTable";
import BulkAddForm from "../components/BulkAddForm";
import api from "../utils/api";
import Swal from "sweetalert2";
import { useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const [showImportModal, setShowImportModal] = useState(false);

  const { user } = useContext(AuthenticationContext);

 const loadProducts = async () => {
   try {
     if (user.userType === "admin") {
       const res = await api.get(`/products`);
       setProducts(res.data);
     } else {
       const res = await api.get(`/products/${user?.username}/products`);
       setProducts(res.data);
     }
   } catch (error) {
     setErrors("Failed to load products");
   }
 };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingProduct) {
        const productUpdate = await api.put("products", data);
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProduct._id
              ? { ...productUpdate.data, ...data }
              : p,
          ),
        );

        setEditingProduct(null);
      } else {
        const insert = await api.post("products", data);
        setProducts((prev) => [insert.data, ...prev]);
      }
    } catch (error) {
      setError("Failed to save product info");
    }
  };

  const confirmDel = (product) => {
    Swal.fire({
      title: `Delete ${product.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) handleDelete(product._id);
    });
  };

  const handleDelete = async (id) => {
    const del = await api.delete(`products/${id}`);
    setProducts((prev) => prev.filter((product) => product._id !== id));
    if (editingProduct?._id == id) setEditingProduct(null);
  };

  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <h1>Products</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <ProductForm
        editingProduct={editingProduct}
        onSave={handleSave}
        onCancel={() => setEditingProduct(null)}
      />

      <div className="mb-3 d-flex gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowImportModal(true)}
        >
          Upload from JSON file
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={confirmDel}
      />

      <div
        className={`modal ${showImportModal ? "d-block" : ""}`}
        style={{
          display: showImportModal ? "block" : "none",
          background: showImportModal ? "rgba(0,0,0,0.5)" : "transparent",
        }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Bulk import</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowImportModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <BulkAddForm
                onImportSuccess={() => {
                  setShowImportModal(false);
                  loadProducts();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
