const { z } = require("zod");

//  Create Seller Schema
exports.sellerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string(),
  country: z.string(),
  state: z.string(),
  skills: z.array(z.string()),
  password: z.string().min(6),
});

//  Login Schema (NEW)
exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
