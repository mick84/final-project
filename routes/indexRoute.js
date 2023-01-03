import { Router } from "express";
import { userRouter } from "./userRouter.js";
import { adminRouter } from "./adminRouter.js";
import { carRouter } from "./carRouter.js";
import { sellerRouter } from "./sellerRouter.js";

const indexRoute = Router();
indexRoute.use("/user", userRouter);
indexRoute.use("/admin", adminRouter);
indexRoute.use("/boughtcar", carRouter);
indexRoute.use("/seller", sellerRouter);
export default indexRoute;
