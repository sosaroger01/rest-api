const validateAuthJWT = require("./validateAuthJWT");
const validatePermission = require("./validatePermission");
const validateRequest = require("./validateRequest");


module.exports={
    ...validateAuthJWT,
    ...validatePermission,
    ...validateRequest
}