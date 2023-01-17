import jwt from 'jsonwebtoken'


function generateToken(id){
    return jwt.sign({id},"HRMS",{
        expiresIn:"30d",
    });
}


export default generateToken;