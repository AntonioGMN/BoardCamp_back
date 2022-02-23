import express from "express";

const serve = express();

serve.listen(process.env.PORT, () => console.log("ouvindo"));
