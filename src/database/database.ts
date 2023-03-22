import dotenv from 'dotenv';
dotenv.config();


module.exports =  {
connectionOracleConfig:  
    {
        user          : process.env.ORACLE_DB_ROLES_USER,
        password      : process.env.ORACLE_DB_ROLES_PASSWORD,
        connectString : process.env.ORACLE_DB_ROLES_DB
    },   

connectionOraclePacConfig:
    {
        user          : process.env.ORACLE_DB_PAC_USER,
        password      : process.env.ORACLE_DB_PAC_PASSWORD,
        connectString : process.env.ORACLE_DB_PAC_DB
    }    
}