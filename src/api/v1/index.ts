import { Router } from "express";
import bodyParser from "body-parser";

const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

import cardRoutes from "./card/card";
router.use("/card", cardRoutes);

export default router;
