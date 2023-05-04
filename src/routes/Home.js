import {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/reducers/userSlice";
import { selectPosts, getAllPosts,deletePost } from "../redux/reducers/postsSlice";
import { Link, useNavigate } from 'react-router-dom';
import PostForm from "../components/postForm";

function getETA(createdAt) {
    const createdAtDate = new Date(createdAt);
    const elapsedTimeMs = Date.now() - createdAtDate.getTime();
    const seconds = Math.floor(elapsedTimeMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d`;
    }
    if (hours > 0) {
        return `${hours % 24}h`;
    }
    if (minutes > 0) {
        return `${minutes % 60}m`;
    }
    return `${seconds % 60}s`;
}
function Home() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const posts = useSelector(selectPosts);

    const navigate = useNavigate();
    console.log(posts);
    useEffect(() => {
       
        if (user.token) {
            dispatch(getAllPosts());
        } else {
            navigate("/login");
        }
    }, [user.token, dispatch, navigate]);

    return (

        localStorage.getItem("token") && (
            <div className="container mx-auto px-1 md:px-3">
                <div className="grid grid-cols-4 gap-4 relative">
                    <div className="col-span-1">
                        <div className="sticky top-16">
                            hi
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-2">
                        <PostForm />
                        {posts.data.map((post) => {
                            return (
                                <div className="card card-compact w-full bg-base-200 shadow-xl mb-5" key={post.id}>
                                    <div className="card-body">
                                        <div className=" flex">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
                                                    <img src={post.User.avatar} alt="" />
                                                </div>
                                            </div>
                                            {/* <div className="avatar placeholder">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                                    <span>MX</span>
                                                </div>
                                            </div> */}
                                            <div className="ml-4 inline-block">
                                                <h2 className="text-lg mb-0 font-semibold">{post.User.username}</h2>
                                                <p>{getETA(post.createdAt)}</p>
                                            </div>
                                            <div className="dropdown dropdown-end ml-auto -z-0">
                                                <label tabIndex={0} className="btn btn-ghost hover:bg-black/5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots text-primary" viewBox="0 0 16 16">
                                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                    </svg>
                                                </label>
                                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
                                                    {JSON.parse(localStorage.getItem("user")).id === post.User.id && (
                                                        <li> <a className={posts.isLoading ? "loader-secondary before:!mr-0" : ""} onClick={() => {
                                                            dispatch(deletePost(post.id));
                                                        }}>delete</a> </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <figure><img src={post.postImg} alt="Post" className="w-full" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{post.title}</h2>
                                        <p>{post.body}</p>
                                        {/* <div className="card-actions justify-end">
                                            <button className="btn btn-primary">Buy Now</button>
                                        </div> */}
                                    </div>
                                </div>

                            );
                        })}
                        {
                            posts.skeleton && (
                                <div className="card card-compact w-full bg-base-200 shadow-xl mb-5">
                                    <div className="card-body animate-pulse">
                                        <div className=" flex">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full">
                                                    <div className="w-12 bg-base-300 h-12 rounded-full "></div>
                                                </div>
                                            </div>
                                            {/* <div className="avatar placeholder">
                                                <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                                    <span>MX</span>
                                                </div>
                                            </div> */}
                                            <div className="ml-4 inline-block">
                                                <div className="w-24 bg-base-300 h-5 rounded-md mb-2"></div>
                                                <div className="w-36 bg-base-300 h-5 rounded-md "></div>
                                            </div>
                                            <div className="dropdown dropdown-end ml-auto -z-0">
                                                <label tabIndex={0} className="btn btn-ghost hover:bg-black/5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots text-primary" viewBox="0 0 16 16">
                                                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                                    </svg>
                                                </label>

                                            </div>
                                        </div>

                                    </div>
                                    <figure><div className="bg-base-300 w-full h-64 animate-pulse"></div></figure>
                                    <div className="card-body animate-pulse">
                                        <div className="bg-base-300 h-5 rounded-md mb-2"></div>
                                        <div className="bg-base-300 h-5 rounded-md mb-2"></div>
                                        <div className="bg-base-300 h-5 rounded-md mb-2"></div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="col-span-1">
                        <div className="sticky top-16">
                            hi
                        </div>
                    </div>
                </div>
            </div>
        )

    );
}

export default Home;
