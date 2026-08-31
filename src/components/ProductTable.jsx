export default function ProductTable({ products, onEdit, onDelete }) {
    if (!products.length) {
        return <p className="text-muted">No products added yet</p>
    }

    return (
        <table className="table table-striped align-middle">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>In stock</th>
                    <th>Qty in stock</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.isInstock ? "Yes" : "No"}</td>
                        <td>{product.qty}</td>
                        <td className="text-end">
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(product)}>Modify</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(product)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}