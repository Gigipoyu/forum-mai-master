import { LikeDB } from "../databases/like.database.js";

const createLikePost = async (req,res) => {
    const {
      liked,
      disliked,
      id_post,
      id_user
    } = req.body

const response = await LikeDB.createLikePost(
    liked,
    disliked,
    id_post,
    id_user)


    const responseError = response.error;
    console.log(response);
    if (responseError) {
      return res.status(500).json({ message: responseError });
    }

const total = await LikeDB.totalLikePost(id_post)

    return res.status(200).json({ message: "Like ajouté", total: total });
}
const totalLikePost = async(req,res) => {
  const response = await LikeDB.totalLikePost(req.query.id);
  const result = response.result;
  const total = result[0].total
  return res.status(200).json({ message: "Requête OK", total : total });



}
const createLikeComment = async (req,res) => {
    const {
      liked,
      disliked,
      id_comment,
      id_user
    } = req.body

const response = await LikeDB.createLikeComment(
    liked,
    disliked,
    id_comment,
    id_user)


    const responseError = response.error;
    console.log(response);
    if (responseError) {
      return res.status(500).json({ message: responseError });
    }

const total = await LikeDB.totalLikeComment(id_comment)

    return res.status(200).json({ message: "Like ajouté", total: total });
}
  
  // Fonction pour afficher les likes
  const readLikeByUser = async (req, res) => {
    const response = await LikeDB.readLikeByUser(req.query.id_user);
    console.log(response);
    //const result = response.result;
  
    //const likes = {
    //    liked: result[0].liked, 
    //    
    //};
    return res.status(200).json({ message: "Requête OK", response });
  };
 
  const readLikeByUserByPost = async (req, res) => {
    const {id_user, id_post} = req.body
    const response = await LikeDB.readLikeByUserByPost(id_user, id_post);
    return res.status(200).json(response);
  }

  const readDislikeByUserByPost = async (req, res) => {
    const {id_user, id_post} = req.body
    const response = await LikeDB.readDislikeByUserByPost(id_user, id_post);
    return res.status(200).json(response);
  }

  export const LikeController = {
    createLikePost, 
    readLikeByUser, 
    createLikeComment,
    readLikeByUserByPost,
    readDislikeByUserByPost,
    totalLikePost
  }