import React from 'react'
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";

const Like = () => {
    const addLike = (id_user, id_post) => {
    let data = {
        id_user,
        id_post
    }
    data = JSON.stringify(data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/api/post/createPost",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            console.log("Response succeeded!");
            setTitle("");
            setContent("");
            setTopic("");
            toast.success("Post créé");
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        })
    }
  return (
    <>
    <button type="button" className="btn btn-primary" onClick={addLike} >
    <AiTwotoneLike />
    </button>
    <p>{post.liked}</p>
    <button type="button" className="btn btn-primary" onClick={addDislike}>
    <AiTwotoneDislike />
    </button>
    </>
  )
}

export default Like