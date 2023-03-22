import {Router} from 'express';

import {  
  getToken   
} from '../controllers/index.controller';

const router = Router();

router.get('/',getToken);



export default router;