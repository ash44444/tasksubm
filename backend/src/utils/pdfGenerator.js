const PDFDocument = require("pdfkit");

exports.generatePDF = (product, res) => {
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  // Product Info
  doc.fontSize(16).text(`Product Name: ${product.name}`);
  doc.moveDown();
  doc.text(`Description: ${product.description}`);
  doc.moveDown();

  // Brands + Total
  let total = 0;

  doc.text("Brands:");
  doc.moveDown();

  product.brands.forEach((b, index) => {
    doc.text(`${index + 1}. Brand Name: ${b.name}`);
    doc.text(`   Image: ${b.image}`);
    doc.text(`   Price: ₹${b.price}`);
    doc.moveDown();

    total += b.price; // total calculation
  });

  //  Total Price
  doc.moveDown();
  doc.fontSize(14).text(`Total Price: ₹${total}`);

  doc.end();
};
