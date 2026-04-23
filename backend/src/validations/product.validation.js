const { z } = require("zod");

exports.productSchema = z.object({
  name: z.string(),
  description: z.string(),
  brands: z
    .array(
      z.object({
        name: z.string(),
        detail: z.string(),
        image: z.string(),
        price: z.number().positive(),
      }),
    )
    .min(1),
});
