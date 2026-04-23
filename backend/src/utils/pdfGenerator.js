const PDFDocument = require("pdfkit");

exports.generatePDF = (product, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");

  doc.text(`Product: ${product.name}`);
  doc.text(`Description: ${product.description}`);

  let total = 0;

  product.brands.forEach((b) => {
    doc.text(`Brand: ${b.name}`);
    doc.text(`Image: ${b.image}`);
    doc.text(`Price: ${b.price}`);
    total += b.price;
  });

  doc.text(`Total Price: ${total}`);

  doc.pipe(res);
  doc.end();
};
