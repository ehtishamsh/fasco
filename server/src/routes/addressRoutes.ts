import { Router } from "express";
import {
  ALLADDRESS,
  CREATEADDRESS,
  DELETEADDRESS,
  GETSINGLEADDRESS,
  GETUSERADDRESS,
} from "../controllers/addressController";

const router = Router();

router.get("/address", ALLADDRESS);
router.get("/address/:id", GETSINGLEADDRESS);
router.get("/address/user/:id", GETUSERADDRESS);
router.post("/address/new", CREATEADDRESS);
router.delete("/address/delete", DELETEADDRESS);

export default router;
