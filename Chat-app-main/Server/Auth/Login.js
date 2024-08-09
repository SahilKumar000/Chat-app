import { execute } from '../src/Models/db_model.js';
import generateToken from '../src/Controllers/control.js'
import { config } from '../Config/index.js';
import Queries from '../src/Controllers/Queries.js'
const { Checking_users, Updating_Users} = Queries;

async function login(req, res) {
    const { name, password } = req.body;
    const values1 = [name, password];
    try {
        const queryResult = await execute(Checking_users, values1);
        if (queryResult.rows.length > 0 && queryResult.rows[0].exists === true) {
            let token = generateToken({
                'name': name,
                'password': password
            }); // for token
            let datetime = new Date().toLocaleString();
            const values2 = [token, datetime, name, password];
            const result = await execute(Updating_Users, values2);
            res.status(200).json({ message: 'Login successful', token: token });
        } else {
            res.status(401).json({ message: 'Login Failed' });
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Error in login' });
    }
};

export default login;
