import { Router } from "express";
import { createProjectController, findProjectController, updateProjectController, deleteProjectController } from "../../controllers/api/project.controllers.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authenticationMiddleware from "../../middlewares/authentication.middleware.js";

const router = Router();

router.post("/create", asyncHandler(authenticationMiddleware), asyncHandler(createProjectController))
router.get("/projects/:id", asyncHandler(authenticationMiddleware), asyncHandler(findProjectController))
router.put("/projects/:id", asyncHandler(authenticationMiddleware), asyncHandler(updateProjectController))
router.delete("/projects/:id", asyncHandler(authenticationMiddleware), asyncHandler(deleteProjectController))

export default router;