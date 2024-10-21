import dotenv from "dotenv";
dotenv.config();

export const apiServerPort = parseInt(process.env.API_SERVER_PORT || "");

export const jwtAccessKey = process.env.JWT_ACCESS_KEY + "";
export const jwtPasswordModificationKey =
  process.env.JWT_PASSWORD_MODIFICATION_KEY + "";

export const clientAppUrl = process.env.CLIENT_APP_URL + "";