import { useState } from "react";
import axios from "axios";

const apiUrl =  process.env.REACT_APP_API_URL || "http://localhost:9000";
function PostForm({ setPosts }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const createPost = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("destination", "images/posts");
            formData.append("file", selectedFile);
            const { data: { url: postImg } } = await axios.post(`${apiUrl}/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const { data } = await axios.post(`${apiUrl}/posts`, {
                title,
                body,
                postImg
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setIsLoading(false);
            setPosts(prevState => [...prevState, {
                ...data,
                User: JSON.parse(localStorage.getItem("user")),
            }]);
            setTitle("");
            setBody("");
            setSelectedFile(null)
        } catch (error) {
            setIsLoading(false);
            alert(error.message);
            console.log(error);
        }
    };



    return (
        <div className="w-full p-6 m-auto bg-base-200 rounded-md shadow-md mt-6 mb-6">
            <form className="space-y-4">
                <div>
                    <input type="text"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        value={title}
                        placeholder="Post title" className="w-full input input-bordered input-primary" />
                </div>
                <div>
                    <textarea className="textarea textarea-primary w-full text-base" placeholder="Post Text"
                        value={body}
                        onChange={(e) => {
                            setBody(e.target.value)
                        }}
                    ></textarea>
                </div>
                {selectedFile && (
                    <div>
                        <img src={URL.createObjectURL(selectedFile)} alt="img" className="w-full" />
                    </div>
                )}
                <div className="flex">
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full"
                        onChange={(e) => {
                            setSelectedFile(e.target.files[0])
                        }}
                    />
                    <button className={"btn btn-primary ml-3 " + (isLoading ? "loader-primary" : "")}
                        onClick={(e) => {
                            createPost(e);
                        }}
                    >Post</button>
                </div>
            </form>
        </div>
    )
}
export default PostForm