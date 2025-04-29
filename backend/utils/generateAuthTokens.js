import jwt from "jsonwebtoken";

export default function (_id, email) {

    const ACCESS_TOKEN = jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
    const REFRESH_TOKEN = jwt.sign({ _id, email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });

    return { ACCESS_TOKEN, REFRESH_TOKEN };
}