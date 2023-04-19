import { useState } from "react";
import axios from "axios";

const apiUrl =  process.env.REACT_APP_API_URL || "http://localhost:9000";
function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [formError, setFormError] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        let config = {
            method: "post",
            url: `${apiUrl}/users/login`,
            data: loginData,
        };
        try {
            const response = await axios(config);
            setFormError({})
            setIsLoading(false);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            window.location.href = "/";
        }
        catch (error) {
            setIsLoading(false);
            if (error.response.data === "Incorrect password") {
                setFormError({
                    ...formError,
                    password: "Incorrect password"
                });
            }
            else if (error.response.data === "User not found") {
                setFormError({
                    ...formError,
                    email: "User not found"
                });
            }
            console.log(error.response.data);
        }
    }

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
                                setFormError({
                                    ...formError,
                                    email: ""
                                })
                            }}
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value
                                })
                            }}
                            placeholder="Email Address" className={"w-full input input-bordered input-primary " + (formError.email ? "input-error" : "input-primary")} />
                        <p className="text-xs text-error">{formError.email}</p>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password"
                            onFocus={(e) => {
                                setFormError({
                                    ...formError,
                                    password: ""
                                })
                            }}
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value
                                })
                            }}
                            placeholder="Enter Password"
                            className={"w-full input input-bordered " + (formError.password ? "input-error" : "input-primary")} />
                        <p className="text-xs text-red-400">{formError.password}</p>
                    </div>
                    <div className=" text-end">
                        <a href="#" className="text-xs text-gray-600 hover:underline hover:text-primary">Forget Password?</a>
                    </div>
                    <a href="/signup" className="text text-gray-600 hover:underline hover:text-primary">Don't have an account? Signup</a>
                    <div>
                        <button className={"btn btn-primary " + (isLoading ? "loader-primary" : "")}
                            onClick={handleSubmit}
                        >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login