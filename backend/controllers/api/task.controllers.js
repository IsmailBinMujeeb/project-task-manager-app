import taskModel from "../../models/task.model.js";
import projectModel from "../../models/project.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const creatTaskController = async (req, res) => {

    const { title, description } = req.body;
    const { projectId } = req.params;

    if (!projectId) throw new ApiError(400, "project id is missing");
    if (!title || !description) throw new ApiError(400, "title or description is missing");

    const project = await projectModel.findOne({ _id: projectId, owner: req.user?._id });

    if (!project) throw new ApiError(404, "Project not found");

    const task = await taskModel.create({
        title,
        description,
        projectId,
    });

    if (!task) throw new ApiError(403, "Task creation failed");

    project.tasks.push(task);
    await project.save();

    res.status(201).json(new ApiResponse(201, "task created", task))
}

export const findTaskController = async (req, res) => {

    const { id } = req.params;

    if (!id) throw new ApiError(400, "id is missing");

    const task = await taskModel.findById(id);

    if (!task) throw new ApiError(404, "task not found")

    res.status(200).json(new ApiResponse(200, "task found", task))
}

export const markAsCompletedController = async (req, res) => {

    const {id} = req.params;

    if (!id) throw new ApiError(400, "id is missing");

    const task = await taskModel.findById(id);

    if (!task) throw new ApiError(404, "task not found");

    const project = await projectModel.findOne({ _id: task.projectId, owner: req.user?._id });

    if (!project) throw new ApiError(401, "Unautherize to mark as complete");

    task.status = "Completed";
    await task.save();

    res.status(200).json(new ApiResponse(200, "marked as completed", task))
}

export const updateTaskController = async (req, res) => {

    const { id } = req.params;
    const { title, description } = req.body;

    if (!id || !title || !description) throw new ApiError(400, "Id, title or description is missing");

    const task = await taskModel.findById(id);
    if (!task) throw new ApiError(404, "Task not found");

    // Check if the logged in user is the owner of project
    const project = await projectModel.findOne({ _id: task.projectId, owner: req.user?._id });
    if (!project) throw new ApiError(401, "Unauthorized to modify this task");

    // update the task
    task.title = title;
    task.description = description;
    await task.save()

    res.status(200).json(new ApiResponse(200, "task found", task));
}

export const deleteTaskController = async (req, res) => {

    const { id } = req.params;

    if (!id) throw new ApiError(400, "id is missing");

    const task = await taskModel.findById(id);
    if (!task) throw new ApiError(404, "task not found");

    const project = await projectModel.findOne({ _id: task.projectId, owner: req.user?._id });
    if (!project) throw new ApiError(401, "Unauterized to delete task")

    project.tasks = project.tasks.filter(taskId => taskId.toString() != id);
    await project.save();

    await task.deleteOne();

    res.status(200).json(new ApiResponse(200, "task deleted", task))
}