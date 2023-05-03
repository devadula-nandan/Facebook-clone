import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, resetError } from "../redux/reducers/userSlice";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({});

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.token) {
            navigate('/');
        }
    }, [user.token, navigate]);

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden px-2">
            <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-primary">Facebook</h1>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input type="text"
                            onFocus={(e) => {
                                user.error === "User not found" && dispatch(resetError());
                            }}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }}
                            placeholder="Email Address" className={"w-full input input-bordered input-primary " + (user.error === "User not found" ? "input-error" : "input-primary")} />
                        <p className="text-xs text-error">{user.error === "User not found" ? "User not found" : ""}</p>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password"
                            onFocus={(e) => {
                                user.error === "Incorrect password" && dispatch(resetError());
                            }}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }}
                            placeholder="Enter Password"
                            className={"w-full input input-bordered " + (user.error === "Incorrect password" ? "input-error" : "input-primary")} />
                        <p className="text-xs text-error">{user.error === "Incorrect password" ? "Incorrect password" : ""}</p>
                    </div>
                    <div className=" text-end">
                        <Link to="/" className="text-xs text-gray-600 hover:underline hover:text-primary">Forget Password?</Link>
                    </div>
                    <Link to="/signup" className="text text-gray-600 hover:underline hover:text-primary">Don't have an account? Signup</Link>
                    <div>
                        <button className={"btn btn-primary " + (user.isLoading ? "loader-primary" : "")}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(login(formData));
                            }}
                        >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login