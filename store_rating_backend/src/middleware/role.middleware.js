const { request, response } = require("../app")

module.exports = (role) => {
    return (request,response,next) => {
        if(request.user.role != role)
            return response.status(403).json({ message: "Access Denied"});
        next();
    };
};