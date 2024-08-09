import { execute } from '../src/Models/db_model.js';
import { config } from '../Config/index.js';
import Queries from '../src/Controllers/Queries.js'
const { Inserting_users } = Queries;


async function signup(req, res) {
    const { name, email, password } = req.body;
    let datetime = new Date().toLocaleString();
    const values = [name, email, password, datetime];

    try {
        const result = await execute(Inserting_users, values);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'User Created' });
        } else {
            res.status(500).json({ message: 'Error in creating user' });
        }
    } catch (error) {
        console.error('Error in creating user:', error);
        res.status(500).json({ message: 'Error in creating user' });
    }
}

export default signup;