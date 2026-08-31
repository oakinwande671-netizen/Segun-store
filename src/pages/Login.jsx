import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../contexts/AuthenticationContext'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useContext(AuthenticationContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (username && password) {
            try {
                await login(username, password);
                navigate('/dashboard');
            } catch (error) {
                console.log(error);
                setError("Failed to login");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Username and password are required");
            return;
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh', backgroundColor: "#f5f5f5" }}
        >
            <div className="card" style={{ width: '400px' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Gabdola Superstore</h3>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                            />
                        </div>

                        <button className="btn btn-outline-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login;