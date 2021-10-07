const {response} = require("express");


const get=(req, res=response) => {

    const {page=1,limit=10}=req.query;

    res.json({
        "msg":"method get - controller",
        page,
        limit
    })
}

const store=(req, res=response) => {

    const {name,age}=req.body;
    res.json({
        "msg":"method post - controller",
        name,
        age
    })
}

const update=(req, res=response) => {

    const {id}= req.params;

    res.json({
        "msg":"method put - controller",
        id
    })
}

const destroy=(req, res=response) => {
    res.json({
        "msg":"method delete - controller"
    })
}


module.exports={
    get,
    store,
    update,
    destroy
}