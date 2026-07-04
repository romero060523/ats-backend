import express from "express";
import cors from "cors";
import { env } from "@infrastructure/config/env";
import apiRouter from "@presentation/http/routes";
import { errorHandler } from "@presentation/http/middlewares/errorHandler";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", apiRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${env.PORT}`);
});
