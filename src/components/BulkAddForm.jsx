import { useState, useContext } from "react";
import api from "../utils/api";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const REQUIRED_FIELDS = ["name", "category", "price", "qty"];

export default function BulkAddForm ({ onImportSuccess }) {
    const [file, setFile] = useState(null);
    const [validationErrors, setValidationError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [parsedProducts, setParsedProducts] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const validateFile = (products) => {
        const errors = [];

        if (!Array.isArray(products)) {
            errors.push("JSON must contain an array of products");
            return errors;
        }

        products.forEach((product, index) => {
            // validate that each product has the required properties
            REQUIRED_FIELDS.forEach((field) => {
                if (!(field in product)) {
                    errors.push(`Row ${index + 1}: Missing a required field "${field}"`);
                }
            });

            if (product.name && typeof product.name !== "string") {
                errors.push(`Row ${index + 1}: "name" must be a string`)
            }

            if (product.category && typeof product.category !== "string") {
                errors.push(`Row ${index + 1}: "category" must be a string`)
            }

            if (product.price !== undefined && isNaN(parseFloat(product.price))) {
                errors.push(`Row ${index + 1}: "price" must be a valid number`)
            }

            if (product.price !== undefined && isNaN(parseFloat(product.qty))) {
                errors.push(`Row ${index + 1}: "quantity" must be a valid number`)
            }

            if (product.name ==="" || product.category === "") {
                errors.push(`Row ${index + 1}: "name" and "category" cannot be empty`);
            }
        })

        return errors;
    }

    const handleCancel = () => {
        setFile(null);
        setValidationError([])
        setIsLoading(false)
        setParsedProducts(null)
        document.querySelector("#fileInput").value = "";
    }

    // collect and prepare file for processing
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setValidationError([]);
        setParsedProducts(null);
    }

    const handleParse = async () => {
        if (!file) {
            setValidationError(["Select a file to continue"])
            return;
        }

        try {
            const fileContent = await file.text();
            const fileJSON = JSON.parse(fileContent);

            const errors = validateFile(fileJSON);

            if (errors.length > 0) {
                setValidationError(errors);
                setParsedProducts(null);
            } else {
                setParsedProducts(fileJSON);
                setValidationError([]);
                Swal.fire({
                    icon: 'success',
                    text: `${fileJSON.length} products are ready for import`,
                    timer: 2000,
                });
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                setValidationError(["Invalid JSON format: " + error.message])
            } else {
                setValidationError(["Failed to read file: " + error.message])
            }
        }
    }

    const handleUpload = async () => {
      if (!parsedProducts || parsedProducts.length === 0) {
        return;
      }

      setIsLoading(true);
      try {
        const upload = await api.post("/products/bulk", {
            username: user?.username, 
            parsedProducts
        });

        Swal.fire({
          icon: "success",
          text: `${upload.data.length} products were inserted`,
          timer: 2000,
        });

        setFile(null);
        setParsedProducts(null);
        setValidationError([])

        document.getElementById("fileInput").value = "";

        if (onImportSuccess) onImportSuccess();

      } catch (error) {
        console.log(error)
        Swal.fire({
          icon: "error",
          text: `Failed to upload products`,
          timer: 2000,
        });
      } finally {
        setIsLoading(false)
      }
    };

    return (
        <div className="card card-body mb-4 bg-light">
            <h5 className="card-title mb-3">Import from File</h5>

            <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">Select JSON file</label>
                <input 
                    type="file" 
                    id="fileInput"
                    accept=".json"
                    className="form-control"
                    onChange={handleFileChange}
                    disabled={isLoading}
                />
                <small className="text-muted d-block mt-1">
                    Expected format: Array of objects with fields: name, category, price, quantity
                </small>
            </div>

            {validationErrors.length && (
                <div className="alert alert-danger mb-3">
                    <strong>Validation errors:</strong>
                    <ul className="mb-0 mt-2">
                        {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {parsedProducts && (
                <div className="alert alert-info mb-3">
                    <strong>Preview:</strong> {parsedProducts.length} products are ready
                    <div className="mt-2" style={{ maxHeight: "200px", overflowY: "auto"}}>
                        <small>
                            <table className="table table-sm table-borderless mb-0">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parsedProducts.slice(0, 3).map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>{product.price}</td>
                                            <td>{product.qty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </small>
                    </div>
                </div>
            )}

            <div className="d-flex gap-2">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleParse}
                    disabled={!file || isLoading}>
                        Validate
                </button>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUpload}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
                                Importing...
                            </span>
                        </>
                    ): ("Import products")}
                </button>

                <button type="button" className="btn btn-outline-danger"
                    onClick={handleCancel}
                    disabled={isLoading || !file}
                >
                    Cancel
                </button>

            </div>

        </div>
    )
}