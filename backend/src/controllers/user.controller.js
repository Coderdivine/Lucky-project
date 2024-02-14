const response = require("../utils/response");
const UserService = require("../services/user.service");
const CustomError = require("../utils/custom-error");

class UserContoller {

    async register(req, res) {
        const result = await UserService.regsiter(req.body);
        res.status(200).send(response("User registered.", result));
    }


    
}

module.exports = new UserContoller();
