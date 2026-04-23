const { z } = require("zod");

exports.sellerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string(),
  country: z.string(),
  state: z.string(),
  skills: z.array(z.string()),
  password: z.string().min(6),
});
