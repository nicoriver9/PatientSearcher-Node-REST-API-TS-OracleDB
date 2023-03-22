import {Router} from 'express';

import {     
  getPacienteByHc  
} from '../controllers/index.controller';

const router = Router();


router.post('/paciente', getPacienteByHc);


export default router;