const { v4: uuidv4 } = require('uuid');
const path=require("path");


const uploadFile = ({files,folder='',extensions=[".png",".jpg",".jpeg",".gif"]})=>{

    return new Promise((resolve,reject)=>{
        const {archivo} = files;
        const extension=(path.extname(archivo.name)).toLowerCase();
    
        if( !extensions.includes(extension) ){
           return reject(`Extensión de archivo no válida, las extensiones permitidas son: ${extensions}`);
        }
    
        const nameTmp=`${uuidv4()}${extension}`;
    
        const uploadPath =path.join( __dirname , '../uploads/', folder , nameTmp);
    
        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
            }
        
            resolve(nameTmp);
        });
    });
}

module.exports={
    uploadFile
}