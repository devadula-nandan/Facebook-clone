import {useState,  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/reducers/userSlice";
import { selectPosts, createPost } from "../redux/reducers/postsSlice";
import { Link, useNavigate } from 'react-router-dom';

function PostForm({ setPosts }) {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const posts = useSelector(selectPosts);

    const navigate = useNavigate();
    
    return (
        <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-md mt-6 mb-6">
            <form className="space-y-4">
                <div>
                    <input type="text"
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value })
                        }}
                        value={formData.title || ""}
                        placeholder="Post title" className="w-full input input-bordered input-primary" />
                </div>
                <div>
                    <textarea className="textarea textarea-primary w-full text-base" placeholder="Post Text"
                        value={formData.body || ""}
                        onChange={(e) => {
                            setFormData({ ...formData, body: e.target.value })
                        }}
                    ></textarea>
                </div>
                {formData.postImg && (
                    <div>
                        <img src={URL.createObjectURL(formData.postImg)} alt="img" className="w-full" />
                    </div>
                )}
                <div className="flex">
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full"
                        onChange={(e) => {
                            setFormData({ ...formData, postImg: e.target.files[0] })
                        }}
                    />
                    <button className={"btn btn-primary ml-3 " + (posts.isLoading ? "loader-primary" : "")}
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch(createPost({ ...formData }))
                            setFormData({})
                        }}
                    >Post</button>
                </div>
            </form>
        </div>
    )
}
export default PostForm