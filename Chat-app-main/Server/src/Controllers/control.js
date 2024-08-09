import jwt from "jsonwebtoken";
import { config } from '../../Config/index.js';

const generateToken = (values) => {
    const token = jwt.sign({
        username: values.name,
        password: values.password,
    }, process.env.SUPER_SECRET_KEY);
    
    return token;
};


export default generateToken;
