import { execute } from '../src/Models/db_model.js';
import { config } from '../Config/index.js';
import jwt from 'jsonwebtoken';
import Queries from '../src/Controllers/Queries.js'
const { Checking_users} = Queries;

async function verify_token(req, res) {
    let token = req.body.token;
    token = token.slice(1, -1);
    jwt.verify(token, process.env.SUPER_SECRET_KEY, async (err, decoded) => {
        if (err) console.log(err);
        else {
            let values = [decoded.username, decoded.password];
            try {
                const queryResult = await execute(Checking_users, values);
                if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
                    res.json({ isValid: true });
                    console.log("Token Verified");
                } else {
                    res.status(401).json({ isValid: false });
                }
            } catch (error) {
                console.error('JWT auth failed:', error);
                res.status(500).json({ message: 'Error in JWT Auth' });
            }
        }
    })
}

export default verify_token ;

