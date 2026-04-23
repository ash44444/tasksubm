const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/seller", require("./routes/seller.routes"));
app.use("/api/product", require("./routes/product.routes"));

app.use(require("./middleware/error.middleware"));

module.exports = app;
