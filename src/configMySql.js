const dotenv = require('dotenv')
dotenv.config();

const db_client = process.env.DB_CLIENT_SQL || "mysql2"
const db_host = process.env.DB_HOST_SQL || "containers-us-west-127.railway.app"
const db_port = Number(process.env.DB_PORT_SQL) || 7116
const db_user = process.env.DB_USER_SQL || "root"
const db_name = process.env.DB_NAME_SQL || "bd_productos"
const db_password = process.env.DB_PASSWORD || "FfhzmE5hfqHBO9lEB1vj"

const connection = {
    client: `${db_client}`,
    connection: {
        host:`${db_host}`,
        port: `${db_port}`,
        user: `${db_user}`,
        database: `${db_name}`,
        password: `${db_password}`,
    },
};


module.exports = connection;