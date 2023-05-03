import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, signUp, resetError } from "../redux/reducers/userSlice";
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
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
                            <span className="text-base label-text">Choose your avatar</span>

                        </label>
                        <div className="flex">
                            <input type="file" className="file-input file-input-bordered file-input-primary w-full"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        avatar: e.target.files[0]
                                    })
                                }}
                            />
                            {formData.avatar && (
                                <div className="avatar pl-3">
                                    <div className="w-24 rounded">
                                        <img src={typeof(formData?.avatar) === "string" ? formData?.avatar : URL.createObjectURL(formData?.avatar)} alt="" />
                                    </div>
                                </div>
                            )}

                            {!formData.avatar && (
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
                                setFormData({
                                    ...formData,
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
                                setFormData({
                                    ...formData,
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
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }}
                            placeholder="Enter Password"
                            className="w-full input input-bordered input-primary" />
                    </div>
                    <div>
                        <button className={"btn btn-primary " + (user.isLoading ? "loader-primary" : "")}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(signUp(formData));
                            }}
                        >Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup