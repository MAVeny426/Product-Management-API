import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const secretkey=process.env.secretkey;

const authenticate=(req,res,next)=> 
{
    const cookies= req.headers.cookie
    const cookie=cookies.split(';');
    for(let cooki of cookie)
    {
        const [name,token]= cooki.trim().split('=');
        if(name=='authToken')
        {
            const verified= jwt.verify(token,secretkey);
            req.userName=verified.UserName;
            req.role=verified.role;
            break;
        }
    }
    next();
}
export {authenticate};