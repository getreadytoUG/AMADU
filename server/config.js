import dotenv from "dotenv";
dotenv.config()

function required(key, defaultValue = undefined){
    const value = process.env[key] || defaultValue;
    if (value == null){
        throw new Error(`key${key} is undefined`);
    }
    return value;
} 

export const config = {
    api: {
        apiKey: required("API_KEY"),
        junKey: required("JUN_API")
    },
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800)),
      },
      bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
      },
      host: {
        // port: parseInt(required('HOST_PORT', 8080)),
        port: parseInt(required('HOST_PORT', 3000))
      },
      db: {
        host: required('DB_HOST'),
        port: parseInt(required('DB_PORT', 3306)),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD')
      }
}