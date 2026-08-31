import { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Swal from "sweetalert2";
import api from "../utils/api"; // import api!!!
import ShowCategorySums from "../components/ShowCatSums";

export default function Dashboard() {
    const [users, setUsers] = useState(null);
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [catSums, setCatSums] = useState(null);

    const { user } = useContext(AuthenticationContext);

    const fetchUsers = async () => {
      try {
        const users = await api.get("users");
        setUsers(users.data);
      } catch (error) {
      }
    };

    const sumProducts = (products) => {
        const sums = products.reduce((a, product) => {
            const category = product.category
            a[category] = (a[category] || 0) + 1
            return a
        }, {})   
        setCatSums(sums);
    }

    const loadProducts = async () => {
      try {
        if (user.userType === 'admin') {
            const res = await api.get(`/products`);
            setProducts(res.data)
            sumProducts(res.data);
        } else {
            const res = await api.get(`/products/${user?.username}/products`);
            setProducts(res.data);
            sumProducts(res.data)
        }
      } catch (error) {
        setErrors("Failed to load products");
      } 
    };

    useEffect(() => {
        loadProducts();
        fetchUsers();
    }, []);

    return (
        <div className="container-fluid py-4">
            <div className="row g-4">
                {/* One stat */}
                {user.userType === 'admin' && (
                    <>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <p className="text-muted small mb-1">Total Users</p>
                                            <h3 className="fw-bold mb-0">{ users ? users.length : 0}</h3>
                                        </div>
                                        <span className="badge bg-primary-subtle text-primary rounded-pill px-2 py-1">34</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* end one stat */}

                {/* One stat */}
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted small mb-1">Total Products</p>
                                    <h3 className="fw-bold mb-0">{products ? products.length : 0}</h3>
                                </div>
                                <span className="badge bg-primary-subtle text-primary rounded-pill px-2 py-1">34</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end one stat */}
                {catSums && <ShowCategorySums catSums={catSums} total={products.length}/>}
            </div>
        </div>
    )
}