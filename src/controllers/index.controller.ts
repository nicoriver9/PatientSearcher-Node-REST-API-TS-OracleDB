import { Request, Response, NextFunction } from 'express';
import { TokenValidation } from '../libs/verifyToken';
const poolOracleDb = require('oracledb');

const {    
    connectionOraclePacConfig
    } = require('../database');

import {signinValidation} from '../libs/validators'
import { createToken } from './auth';


export const getToken = async (req:Request, res:Response) =>{ 

    try {
        
        const {
            user,
            password
        } = req.body;  

        if (await signinValidation(user, password)){

            if (!req.header('token')){

                const token = await createToken(user);
                return res.header('token',token).json({                
                    token
                });
            }
            else
            {return res.status(200).json({
                msg: "The token has been generated. Try with header token or clean it."
            });}
        }
        else {
              
        return res.status(401).json({
            "Message" : "Error en el usuario o contraseña"            
            });
        }


    } catch (error) {
        console.log(error);
    }

   
}            
export const getPacienteByHc = async (req: Request, res: Response): Promise<Response> => {

    const {
        user ,
        password, 
        hc,
        dni,
    } = req.body;    

try {
    
    if (await signinValidation(user, password)){

        if (!req.header('token')){

            const token = await createToken(user);
            return res.header('token',token).json({token});
        }
        else
        {

            //setInterval(function() { async(req: Request,res: Response): Promise<Response>=>{
                
            if(TokenValidation(req,res)){

                const connectionOraclePac = await poolOracleDb.getConnection(connectionOraclePacConfig);
 
                const resultPac = await connectionOraclePac.execute(
                    `SELECT 
                        numero_historia_clinica ,
                        apellido1 ,
                        apellido2 , 
                        nombres,
                        FECHA_NACIMIENTO, 
                        numero_documento  
                    FROM PACIENTE
                    WHERE 
                    numero_historia_clinica = :hc
                    or numero_documento     = :dni`,
                    [
                        hc,
                        dni
                    ],   
                    { outFormat: poolOracleDb.OBJECT }
                    );                   
        
                    
                    if(resultPac.rows[0].FECHA_NACIMIENTO != undefined) 
                    { 
                        resultPac.rows.map((e:any)=>{
                            e.FECHA_NACIMIENTO = new Date (resultPac.rows[0].FECHA_NACIMIENTO).toISOString().split('T')[0];

                        });
                    }
 
                    if(resultPac.rows.length >0){                       
                        return res.status(200).json({                
                            "Datos del paciente" :  resultPac.rows,
                            });                            
                    }else {                       
                        return res.status(200).json({                
                            "Mensaje" : `Sin resultados para la hc: ${hc}.`
                            });
                    }
             }else{
                 return res.status(400).send('Invalid Token');
             } 
            //}},30000);

        }


    }else {
        
        return res.status(401).json({
            "Message" : "Error en el usuario o contraseña"            
            });
    }

   } catch (error) {
       console.log(error);
       return res.status(500).json('Internal Server error');
   }


};

