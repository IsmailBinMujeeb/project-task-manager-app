import ApiResponse from "./ApiResponse.js";

export default (fn) => async (req, res, next) => {

    try {
        await fn(req, res, next);
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, error.message || "Internal Server Error", [], error.errors));
    }
}