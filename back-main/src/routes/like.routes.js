import { LikeController } from "../controllers/like.controller.js";

import express from "express";

const initLikeRoutes = (app) => {
  const router = express.Router();
  router.post("/createLikePost", LikeController.createLikePost );
  router.post("/createLikeComment", LikeController.createLikeComment );
  router.get("/readLikeByUser", LikeController.readLikeByUser );
  router.get("/readLikeByUserByPost", LikeController.readLikeByUserByPost );
  router.get("/readDislikeByUserByPost", LikeController.readDislikeByUserByPost );
  router.get("/totalLikePost", LikeController.totalLikePost );


  app.use("/api/like", router);
};

export default initLikeRoutes;