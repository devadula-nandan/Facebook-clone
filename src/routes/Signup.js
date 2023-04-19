import { useState } from "react";
import axios from "axios";

const apiUrl =  process.env.REACT_APP_API_URL || "http://localhost:9000";
function Signup() {
    const [loginData, setLoginData] = useState({})
    const [selectedFile, setSelectedFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("destination", "images/avatars");
            formData.append("file", selectedFile);
            const { data: { url: avatar } } = await axios.post(`${apiUrl}/upload`, formData);

            const { data } = await axios.post(`${apiUrl}/users`, {
                ...loginData,
                avatar
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };


    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden px-2">
            <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-primary">Facebook</h1>
                <form className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Choose your avatar</span>

                        </label>
                        <div className="flex">
                            <input type="file" className="file-input file-input-bordered file-input-primary w-full"
                                onChange={(e) => {
                                    setSelectedFile(e.target.files[0])
                                }}
                            />
                            {selectedFile && (
                                <div className="avatar pl-3">
                                    <div className="w-24 rounded">
                                        <img src={URL.createObjectURL(selectedFile)} alt="avatar" />
                                    </div>
                                </div>
                            )}
                            {!selectedFile && (
                                <div className="avatar placeholder pl-3">
                                    <div className="bg-neutral-focus text-neutral-content rounded w-24">
                                        <span className="text-3xl">K</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text"
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    username: e.target.value
                                })
                            }}
                            placeholder="Username" className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input type="text"
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    email: e.target.value
                                })
                            }}
                            placeholder="Email Address" className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password"
                            onChange={(e) => {
                                setLoginData({
                                    ...loginData,
                                    password: e.target.value
                                })
                            }}
                            placeholder="Enter Password"
                            className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <button className={"btn btn-primary " + (isLoading ? "loader-primary" : "")}
                            onClick={handleSubmit}
                        >Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup