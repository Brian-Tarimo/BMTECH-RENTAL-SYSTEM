const PDFDocument =
  require("pdfkit");

const generateReceiptPDF = (
  payment,
  res
) => {

  const doc =
    new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt-${payment._id}.pdf`
  );

  doc.pipe(res);

  // TITLE

  doc
    .fontSize(24)
    .text(
      "BMTECH RENTAL RECEIPT",
      {
        align: "center",
      }
    );

  doc.moveDown();

  // RECEIPT DETAILS

  doc
    .fontSize(14)
    .text(
      `Receipt ID: ${payment._id}`
    );

  doc.text(
    `Tenant: ${
      payment.tenant?.fullName ||
      "N/A"
    }`
  );

  doc.text(
    `Amount Paid: KES ${payment.amount}`
  );

  doc.text(
    `Payment Method: ${payment.paymentMethod}`
  );

  doc.text(
    `Payment Date: ${new Date(
      payment.paymentDate
    ).toLocaleDateString()}`
  );

  doc.moveDown();

  doc
    .fontSize(16)
    .text(
      "Thank you for your payment.",
      {
        align: "center",
      }
    );

  doc.end();

};

module.exports =
  generateReceiptPDF;