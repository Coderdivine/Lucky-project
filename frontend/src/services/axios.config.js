import axios from "axios";

const adminConfig = JSON.parse(sessionStorage.getItem("admin-details-lucky"));
console.log({ adminConfig });

export const AxiosConnect = axios.create({
    baseURL:"http://localhost:5005",
    Authorization: adminConfig?.token
});