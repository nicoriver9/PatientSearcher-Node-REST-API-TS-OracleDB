const poolOracleDb = require('oracledb');
import * as helpers from "./helpers.js";


const {
    connectionOracleConfig    
    } = require('../database');


export const signinValidation = async (userlogin: string, password: string) => {
   
  const connectionOracle = await poolOracleDb.getConnection(connectionOracleConfig);

    const resultUser = await connectionOracle.execute(
    `SELECT 
          user_id, 
          userlogin,
          PASSWD 
     FROM S_USER
     WHERE userlogin = :userlogin`,
    [userlogin],  // bind value for :id
  );

  let userDb = resultUser.rows[0][1];
  let passwordDb = resultUser.rows[0][2];

  if(userlogin === userDb){
   

    const validPassword = await helpers.matchPassword(
      password,
      passwordDb
    );

    return validPassword;  
  }

  return false;
    
};