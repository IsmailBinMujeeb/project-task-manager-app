import { Router } from "express";
import { creatTaskController, findTaskController, markAsCompletedController, updateTaskController, deleteTaskController } from "../../controllers/api/task.controllers.js";
import authenticationMiddleware from "../../middlewares/authentication.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";

const router = Router();

router.post("/create/:projectId", asyncHandler(authenticationMiddleware), asyncHandler(creatTaskController));
router.post("/mark-as-completed/:id", asyncHandler(authenticationMiddleware), asyncHandler(markAsCompletedController));
router.get("/find/:id", asyncHandler(authenticationMiddleware), asyncHandler(findTaskController));
router.put("/update/:id", asyncHandler(authenticationMiddleware), asyncHandler(updateTaskController));
router.delete("/delete/:id", asyncHandler(authenticationMiddleware), asyncHandler(deleteTaskController));

export default router;