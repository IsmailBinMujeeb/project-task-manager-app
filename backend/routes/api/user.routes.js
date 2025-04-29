import { Router } from "express";
import { registerUserController, loginUserController, logoutUserController, refreshAccessTokenController, findUserProjectsController, findUserController } from "../../controllers/api/user.controllers.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authenticationMiddleware from "../../middlewares/authentication.middleware.js";

const router = Router();

router.post("/register", asyncHandler(registerUserController));
router.post("/login", asyncHandler(loginUserController));
router.post("/logout", asyncHandler(authenticationMiddleware), asyncHandler(logoutUserController));
router.post("/refresh-access-token", asyncHandler(refreshAccessTokenController));
router.get("/projects", asyncHandler(authenticationMiddleware), asyncHandler(findUserProjectsController));
router.get("/profile", asyncHandler(authenticationMiddleware), asyncHandler(findUserController));

export default router;