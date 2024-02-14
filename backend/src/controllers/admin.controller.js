const response = require("../utils/response");
const AdminService = require("../services/admin.service");
const CustomError = require("../utils/custom-error");

class AdminController {

    async login(req, res) {
        const result = await AdminService.login(req.body);
        res.status(200).send(response("User Logged In", result));
    }

    async register(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await AdminService.register(req.body);
        if(!result) throw new CustomError("Registration failed",500);
        res.status(201).send(response("Registration completed",result));
    }

    async verifyregistrationPin(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await AdminService.VerifyEmailCode(req.body);
        res.status(201).send(response("Verification Completed",result));

    }

    async resendVerificationCode(req,res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await AdminService.resendVerificationPin(req.body);
        res.status(201).send(response("Verification pin sent",result));

    }

    async sendForgotPasswordCode(req, res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await AdminService.forgotPasswordReset(req.body);
        res.status(201).send(response("Verification pin sent",result));
 
    }

    async resendForgotPasswordCode(req, res){
        if(!req.body) throw new CustomError("No request body",404);
        const result = await AdminService.resendForgotPasswordMail(req.body);
        res.status(201).send(response("Verification pin sent",result));
 
    }

    async verifyForgotPasswordPin(req, res){
        if(!req.body) throw new CustomError("No request body",404);
        if(!req.body.password) throw new CustomError("New password is required");
        const result = await AdminService.verifyforgotPasswordEmailCode(req.body);
        res.status(201).send(response("Verification Completed",result));
 
    }

    async updateAdminProfile(req, res) {
        const result = await AdminService.update(req.admin_id,req.body);
        res.status(200).send(response("Profile updated", result));
    }

    async allAdmins(req, res) {
        const result = await AdminService.allAdmins();
        res.status(200).send(response("All Admins", result));
    }

    async allPools(req, res) {
        const result = await AdminService.allPools();
        res.status(200).send(response("All Pools", result));
    }

    async createPool(req, res) {
        // { admin_id, title, description, state }
        const result = await AdminService.createPool(req.body);
        res.status(200).send(response("Pool created", result));
    }

    async getAdminPools(req, res) {
        const result = await AdminService.getAdminPools(req.params.admin_id);
        res.status(200).send(response("All Pools", result));
    }

    async getPools(req, res) {
        const result = await AdminService.getPools(req.body.state);
        res.status(200).send(response("All Pools", result));
    }

    async getPool(req, res) {
        const result = await AdminService.getPool(req.params.pool_id);
        res.status(200).send(response("Pool details", result));
    }

    async poolRegisterer(req, res) {
        const result = await AdminService.poolRegisterer(req.params.pool_id);
        res.status(200).send(response("Pool sensor", result));
    }

}

module.exports = new AdminController();
