import Jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
       const token = req.headers.authorization.split(" ")[1];
       const isCustomAuth = token.length < 500;

       let decodeData;
       
       if(token && isCustomAuth){
        decodeData = Jwt.verify(token, 'test');

        req.userId = decodeData?.id;
       }else{
        decodeData = Jwt.decode(token);

        req.userId = decodeData?.sub;
       }
       next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;