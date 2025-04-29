import projectModel from "../../models/project.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createProjectController = async (req, res) => {

    const { title, description } = req.body;
    const projectCount = await projectModel.countDocuments({ owner: req.user?._id })

    if (projectCount >= 4) throw new ApiError(401, "user project limit over")

    const project = await projectModel.create({
        title,
        description,
        owner: req.user?._id,
    });

    if (!project) throw new ApiError(403, "Project creation failed");

    res.status(201).json(new ApiResponse(201, "project created", project));
}

export const findProjectController = async (req, res) => {

    const { id } = req.params;

    if (!id) throw new ApiError(400, "project id was not provided")

    const project = await projectModel.findOne({ _id: id, owner: req.user?._id }).populate("tasks");

    if (!project) throw new ApiError(404, "project not found");

    res.status(200).json(new ApiResponse(200, "project found", project))
}

export const updateProjectController = async (req, res) => {

    const { id } = req.params;
    const { title, description } = req.body

    if (!id || !title || !description) throw new ApiError(400, "Project ID, title, and description are required");

    const project = await projectModel.findOneAndUpdate({_id: id, owner: req.user?._id}, {
        title,
        description,
    }, { new: true });

    if (!project) throw new ApiError(404, "Project not found");

    res.status(200).json(new ApiResponse(200, "project found", project));
}

export const deleteProjectController = async (req, res) => {

    const { id } = req.params;

    if (!id) throw new ApiError(400, "project id is missing");

    const project = await projectModel.findOneAndDelete({_id: id, owner: req.user?._id});

    res.status(200).json(new ApiResponse(200, "project deleted successfully", project))
}