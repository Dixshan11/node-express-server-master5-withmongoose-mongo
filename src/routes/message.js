import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
 
const router = Router();
 
  // router.get('/', (req, res) => {
    //   return res.send(Object.values(req.context.models.messages));
    // });
    
    // router.get('/:messageId', (req, res) => {
    //   return res.send(req.context.models.messages[req.params.messageId]);
    // });
    
    // router.post('/', (req, res) => {
    //   const id = uuidv4();
    //   const message = {
    //     id,
    //     text: req.body.text,
    //     userId: req.context.me.id,
    //   };
    
    //   req.context.models.messages[id] = message;
    
    //   return res.send(message);
    // });
    
    // router.delete('/:messageId', (req, res) => {
    //   const {
    //     [req.params.messageId]: message,
    //     ...otherMessages
    //   } = req.context.models.messages;
    
    //   req.context.models.messages = otherMessages;
    
    //   return res.send(message);
  // });
    


 
router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.find();
  return res.send(messages);
});
 
router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId,
  );
  return res.send(message);
});
 
router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    user: req.context.me.id,
  });
 
  return res.send(message);
});
 
router.delete('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId,
  );
 
  if (message) {
    await message.remove();
  }
 
  return res.send(message);
});

export default router;