import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const emptyVals = { name: "", category: "", price: "", qty: 0 };

export default function ProductForm({ editingProduct, onSave, onCancel }) {
  const [showImportModal, setShowImportModal] = useState(false);

  const { user } = useContext(AuthenticationContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: emptyVals });

  useEffect(() => {
    reset(editingProduct ? editingProduct : emptyVals);
  }, [editingProduct, reset]);

  const submit = (data) => {
    onSave({
      ...data,
      username: user?.username,
      price: parseFloat(data.price),
      qty: parseInt(data.qty),
    });

    reset(emptyVals);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="card card-body mb-4">
        <h5 className="card-title mb-3">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h5>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "Name is equired" })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          {/* Catefory */}
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
              {...register("category", { required: "Category is equired" })}
            />
            {errors.category && (
              <div className="invalid-feedback">{errors.category.message}</div>
            )}
          </div>

          {/* Price */}
          <div className="col-md-6">
            <label className="form-label">Price</label>
            <input
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              {...register("price", { required: "Price is equired" })}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>

          {/* Price */}
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <input
              className={`form-control ${errors.qty ? "is-invalid" : ""}`}
              {...register("qty", { required: "Quantity is equired" })}
            />
            {errors.qty && (
              <div className="invalid-feedback">{errors.qty.message}</div>
            )}
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingProduct ? "Update" : "Add"} Product
          </button>

          {editingProduct && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
