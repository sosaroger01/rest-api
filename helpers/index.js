const googleVerify= require("./googleVerify");
const jwt= require("./jwt");
const rules= require("./rules");
const upload= require("./upload");

module.exports={
    ...googleVerify,
    ...jwt,
    ...rules,
    ...upload
}