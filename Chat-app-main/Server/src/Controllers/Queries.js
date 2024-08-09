const Checking_users = `SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 AND password_hash = $2);`;

const Updating_Users = `UPDATE users 
SET refresh_token=$1, refresh_token_time=$2 
WHERE username = $3 AND password_hash = $4;`;

const Inserting_users = ` INSERT INTO users
(username, email, password_hash,date_created,modifiy_date)
VALUES ($1, $2, $3, $4, $4);`;

export default { Checking_users, Updating_Users, Inserting_users };