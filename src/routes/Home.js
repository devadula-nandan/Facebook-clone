import axios from "axios";
import { useState, useEffect } from "react";
const baseUrl = "http://express-env-1.eba-vk9m3qaj.ap-south-1.elasticbeanstalk.com";
function Home() {
    const [imgSrc, setImgSrc] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadFile = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("folder", "images");
            const response = await axios.post(`${baseUrl}/upload`, formData);
            setImgSrc(response.data.url);
        } catch (error) {
            console.error(error);
        }
    };

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [posts, setPosts] = useState([]);

    useEffect(() => { }, []);

    const getAllPosts = async () => {
        let config = {
            method: "get",
            url: baseUrl + "/posts/all",
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        try {
            const response = await axios(config);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserPosts = async () => {
        let config = {
            method: "get",
            url: baseUrl + "/posts",
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        try {
            const response = await axios(config);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createPost = async () => {
        let config = {
            method: "post",
            url: baseUrl + "/posts",
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                title: "a test post",
                body: "a test body",
            },
        };

        try {
            const response = await axios(config);
            setPosts([...posts, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    const login = async () => {
        let config = {
            method: "post",
            url: baseUrl + "/users/login",
            data: {
                email: "user1@gmail.com",
                password: "pass1",
            },
        };

        try {
            const response = await axios(config);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
        } catch (error) {
            console.log(error);
        }
    };

    const signup = async () => {
        let config = {
            method: "post",
            url: baseUrl + "/users",
            data: {
                username: "user1",
                email: "user1@gmail.com",
                password: "pass1",
            },
        };

        try {
            const response = await axios(config);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <div className="container mx-auto px-3">
            <h1>Home</h1>
            <p className="mb-4 break-words">token: {token}</p>
            {!token && (
                <>
                    <button type="button"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto mb-3" onClick={() => { signup(); }} > signup </button>
                    <br></br>
                </>
            )}

            {!token && (
                <>
                    <button type="button"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto mb-3" onClick={() => { login(); }}> login </button>
                    <br></br>
                </>
            )}

            {token && (
                <>
                    <button type="button"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto mb-3" onClick={() => { getUserPosts(); }}> getUserPosts </button>
                    <br></br>
                    <button type="button"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto mb-3" onClick={() => { getAllPosts(); }}> getAllPosts </button>
                    <br></br>
                    <button type="button"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto mb-3" onClick={() => { createPost(); }}> createPost </button>
                    <br></br>
                    <div>
                        <input type="file" onChange={handleFileInput} />
                        <button onClick={handleUploadFile}>Upload</button>
                    </div>
                    <br></br>
                    {imgSrc && (
                        <img src={imgSrc} alt="img" />
                    )}
                </>
            )}

            {token && (
                <>
                    <button type="button"
                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto mb-3" onClick={() => { logout(); }}> logout </button>
                    <br></br>
                </>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map((post) => {
                    return (
                        <a className="rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8" href="/posts/1" key={post.id} >
                            <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600 float-right" >
                                4.3
                            </span>
                            <div className="pt-4 text-gray-500">
                                <svg className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                    ></path>
                                </svg>
                                <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                                    {post.title}
                                </h3>
                                <p className="mt-2 text-sm">
                                    {post.body}
                                </p>
                            </div>

                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
