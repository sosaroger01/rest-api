const validateAuthJWT = require("./validateAuthJWT");
const validatePermission = require("./validatePermission");
const validateRequest = require("./validateRequest");
const validateFile = require("./validateFile");


module.exports={
    ...validateAuthJWT,
    ...validatePermission,
    ...validateRequest,
    ...validateFile
}