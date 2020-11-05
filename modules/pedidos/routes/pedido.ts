import * as express from "express";
import { pedidoSchema } from "../schemas/pedido";


const router = express.Router();

router.get('/pedido', async (req, res, next) => {

    pedidoSchema.find(function(err, pedido) {
        if (err){
      return err;
    } 
        res.send(pedido);
    });
});

router.get("/pedidoId/:id", async (req, res) => {
  let idPedido = req.params.id;
  try {
    let pedidos = await pedidoSchema.findById(idPedido);
    res.send(pedidos);
  } catch (err) {
    throw err;
  }
});



router.post('/pedido', async (req, res, next) => {
  const pedido = await new pedidoSchema(req.body);
  pedido.save((err, pedido) => {
      try{
          res.json(pedido);
      } catch (err){
          return err;
      }
});
  
});


router.put("/pedido/:_id", async (req, res, next) => {
  try {
    const pedido = await pedidoSchema.findByIdAndUpdate(req.params._id, req.body);
    res.send(pedido)
  } catch (err) {
    throw err;
  }
});


router.delete('/pedido/:_id', async (req, res, next) => {
let pedido = await pedidoSchema.findByIdAndRemove(req.params._id, (err, pedido) => {
      
      try {
          console.log('Pedido Borrado: ', pedido);
      }   catch (err) {
          throw err;
      }
});
});

export = router;