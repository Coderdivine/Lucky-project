import { AxiosConnect } from "./axios.config";

export class AdminAuth {

    async register(data){
        const { data: response } = await AxiosConnect.post("/admin/register", data);
        console.log({ response });
        if(!response){
            alert("Not data returned. Please try again later.");
            return response;
        }else{
            alert("Registration completed.");
            return response;
        }
    }

    async login({ email, password }){
        const { data: response } = await AxiosConnect.post("/admin/login", { email, password });
        if(!response){
            alert("Not data returned. Please try again later.");
            return response;
        }else{
            alert("Login completed.");
            return response;

        }
    }

    async getAdminPools(admin_id) {
        const { data } = await AxiosConnect.get(`/admin/admin-pools/${admin_id}`);
        if(data){
            console.log({ AllPools: data });
            return data;
        } else {
            return data;
        }
    }

    async getPools(state) {
        const { data } = await AxiosConnect.post(`/admin/get-pools`, { state });
        console.log({ AllPoolsByState: data });
        if(data){
            console.log({ AllPools: data });
            return data;
        } else {
            return data;
        }
    }

    async getPool(pool_id) {
        const { data } = await AxiosConnect.get(`/admin/pool/${pool_id}`);
        if(data){
            console.log({ getPool: data });
            return data;
        } else {
            return data;
        }
    }

    async createPool(data) {
        const { data: response } = await AxiosConnect.post(`/admin/create-pool/`, data);
        if(response){
            console.log({ createdPool: response });
            return response;
        } else {
            return response;
        }
    }
    
    async registerer(pool_id) {
        const { data } = await AxiosConnect.get(`/admin/registerer/${pool_id}`);
        if(data){
            console.log({ registerer: data });
            return data;
        } else {
            return data;
        }
    }
}   

