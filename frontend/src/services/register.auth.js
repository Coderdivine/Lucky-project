import { AxiosConnect } from "./axios.config";

export class RegisterAuth {

    async RegisterToPool(data) {
        const { data: response } = await AxiosConnect.post("/user/register", data);
        if(!response){
            alert("Unable to register. Try again later.");
        } else {
            alert("Registration successful.");
        }
    }
}