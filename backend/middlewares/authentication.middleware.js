import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js";

export default async (req, _, next) => {

    const { ACCESS_TOKEN } = req.cookies;

    if (!ACCESS_TOKEN) throw new ApiError(401, "Unautherized");

    const decodedToken = jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) throw new ApiError(403, "Access token is expired");

    const user = await userModel.findById(decodedToken._id);

    if (!user) throw new ApiError(404, "User not found");

    req.user = { _id: user._id, email: user.email };
    
    next();
}