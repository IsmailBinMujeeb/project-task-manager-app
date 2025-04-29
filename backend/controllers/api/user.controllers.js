import userModel from "../../models/user.model.js";
import generateAuthTokens from "../../utils/generateAuthTokens.js";
import jwt from "jsonwebtoken"
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import projectModel from "../../models/project.model.js";

export const registerUserController = async (req, res) => {

    const { email, password, name, country } = req.body;

    if (!email || !password || !name || !country) throw new ApiError(400, "missing credentials");

    const isUserExist = await userModel.findOne({ email }); // Find the user with same email already exist

    if (isUserExist) throw new ApiError(409, "user with this email already exist"); // if user with email exist throw error

    const user = await userModel.create({
        email,
        name,
        password,
        country,
    });

    if (!user) throw new ApiError(402, "User creation failed"); // If user created successfully

    const { ACCESS_TOKEN, REFRESH_TOKEN } = generateAuthTokens(user._id, user.email); // Generate Access and refresh token

    // Store Access and Refresh tokens in Cookies

    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 15 // 15 minutes
    });

    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    user.refreshToken = REFRESH_TOKEN;
    await user.save()

    res.status(201).json(ApiResponse.UserResponse(201, "User registered successfully", user))
}

export const loginUserController = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) throw new ApiError(400, "missing credentials");

    const user = await userModel.findOne({ email });

    if (!user) throw new ApiError(404, "invalid credentials");

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) throw new ApiError(404, "invalid credentials");

    const { ACCESS_TOKEN, REFRESH_TOKEN } = generateAuthTokens(user._id, user.email);

    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 15,
    });

    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    user.refreshToken = REFRESH_TOKEN;
    await user.save();

    res.status(200).json(ApiResponse.UserResponse(200, "User login successfully", user));
}

export const logoutUserController = async (req, res) => {

    const { _id } = req.user;

    const user = await userModel.findByIdAndUpdate(_id, {
        $set: {
            refreshToken: '',
        }
    }, { new: true });

    if (!user) throw new ApiError(404, "invalid credentials");

    res.clearCookie("ACCESS_TOKEN");
    res.clearCookie("REFRESH_TOKEN");

    res.status(200).json(ApiResponse.UserResponse(200, "user logout", {}))

}

export const refreshAccessTokenController = async (req, res) => {

    const { REFRESH_TOKEN: INCOMMING_REFRESH_TOKEN } = req.cookies;

    if (!INCOMMING_REFRESH_TOKEN) throw new ApiError(401, "Unauthorized");

    const decodedToken = jwt.verify(INCOMMING_REFRESH_TOKEN, process.env.REFRESH_TOKEN_SECRET);

    if (!decodedToken) throw new ApiError(400, "refresh token expired");

    const user = await userModel.findById(decodedToken._id);

    if (!user) throw new ApiError(404, "user not found");
    if (user.refreshToken != INCOMMING_REFRESH_TOKEN) throw new ApiError(403, "invalid refresh token")

    const { ACCESS_TOKEN, REFRESH_TOKEN } = generateAuthTokens(user._id, user.email);

    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 15 });
    res.cookie("REFRESH_TOKEN", REFRESH_TOKEN, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

    res.status(200).json(ApiResponse.UserResponse(200, "refreshed access token", {}))
}

export const findUserProjectsController = async (req, res) => {

    const projects = await projectModel.find({ owner: req.user?._id }).populate("owner");

    res.status(200).json(new ApiResponse(200, "projects found", projects))
}

export const findUserController = async (req, res) => {

    const user = await userModel.findById(req.user?._id);

    if (!user) throw new ApiError(404, "user not found");

    res.status(200).json(ApiResponse.UserResponse(200, "user found", user))
}