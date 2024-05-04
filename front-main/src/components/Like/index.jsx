import  { useState, useEffect  } from "react";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import axios from "axios";

const Like = (props) => {
  const id_user = props.id_user;
  const id_post = props.id_post;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);
  const [totalLike, setTotalLike] = useState();
;
  const handleClickLike = () => {
    setLiked(true);
    getTotalLike(id_post)
    if ((liked=== false && disliked === false ) || disliked === true ) {
    setDisLiked(false)
    addLike(id_user,id_post);
    }
  };

  const handleClickDisLike = () => {
    setDisLiked(true);
    if (liked === true) {
      setLiked(false);
      deleteLike(id_user,id_post);
      addDisLike(id_user,id_post);
    }
  };

  const deleteLike = (id_user, id_post) => {

    let data = {
      id_user,
      id_post,
    };

    data = JSON.stringify(data);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/like/deleteLikePost",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios.request(config).then((response) => {
      if (response.status === 200) {
        console.log("like deleted")
      }
    });
  }

const getTotalLike =(id_post) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/like/totalLikePost/${id_post}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response)
      setTotalLike(response.data.total);
    })
    .catch((error) => {
      console.log(error);
    });
}

  const addLike = (id_user, id_post) => {
    const liked = 1;
    const disliked = 0;

    let data = {
      id_user,
      id_post,
      liked ,
      disliked
    };

    data = JSON.stringify(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/like/createLikePost",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios.request(config).then((response) => {
      if (response.status === 200) {
        console.log("like added")
      }
    });
  };

  const addDisLike = (id_user, id_post) => {
    const liked = 0;
    const disliked = 1;

    let data = {
      id_user,
      id_post,
      liked,
      disliked
      
    };
    data = JSON.stringify(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/like/createDisLikePost",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios.request(config).then((response) => {
      if (response.status === 200) {
        console.log("dislike added")
      }
    });
  };

  useEffect(() => {
    getTotalLike(id_post)
  }, []);

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleClickLike}>
        {liked ? (
          <AiTwotoneLike style={{ color: "red" }} />
        ) : (
          <AiTwotoneLike style={{ color: "black" }} />
        )}
      </button>
      <p>{totalLike}</p>
      <button type="button" className="btn btn-primary" onClick={handleClickDisLike}>
        {disliked ? (
          <AiTwotoneDislike style={{ color: "red" }} />
        ) : (
          <AiTwotoneDislike style={{ color: "black" }} />
        )}
      </button>
    </>
  );
};

export default Like;
