export default class ApiResponse {

    constructor(statusCode = 200, message = "ok", data = [], errors = []) {

        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400;
        this.errors = errors
    }

    static UserResponse(statusCode = 200, message = "ok", data = [], errors = []) {

        const userData = { _id: data._id, email: data.email, name: data.name }
        return new ApiResponse(200, "ok", userData);
    }
}