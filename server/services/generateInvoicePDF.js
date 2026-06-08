const PDFDocument =
  require("pdfkit");

const generateInvoicePDF = (
  invoice,
  res
) => {

  const doc =
    new PDFDocument({
      margin: 50,
    });

  // RESPONSE HEADERS

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${invoice.invoiceNumber}.pdf`
  );

  doc.pipe(res);

  // BMTECH HEADER

  doc
    .fontSize(24)
    .fillColor("#0F172A")
    .text(
      "BMTECH Apartments",
      {
        align: "center",
      }
    );

  doc.moveDown();

  doc
    .fontSize(18)
    .fillColor("#10B981")
    .text(
      "RENT INVOICE",
      {
        align: "center",
      }
    );

  doc.moveDown(2);

  // INVOICE DETAILS

  doc
    .fontSize(12)
    .fillColor("black");

  doc.text(
    `Invoice Number: ${invoice.invoiceNumber}`
  );

  doc.text(
    `Tenant: ${invoice.tenant.fullName}`
  );

  doc.text(
    `Unit: ${invoice.tenant.unit.unitNumber}`
  );

  doc.text(
    `Due Date: ${new Date(
      invoice.dueDate
    ).toLocaleDateString()}`
  );

  doc.moveDown();

  // BILLING BREAKDOWN

  doc
    .fontSize(16)
    .fillColor("#0F172A")
    .text(
      "Billing Breakdown"
    );

  doc.moveDown();

  doc
    .fontSize(12)
    .fillColor("black");

  doc.text(
    `Rent Amount: KES ${invoice.rentAmount}`
  );

  doc.text(
    `Water Bill: KES ${invoice.waterBill}`
  );

  doc.text(
    `Electricity Bill: KES ${invoice.electricityBill}`
  );

  doc.text(
    `Garbage Fee: KES ${invoice.garbageFee}`
  );

  doc.text(
    `Penalty: KES ${invoice.penalty}`
  );

  doc.moveDown();

  // TOTALS

  doc
    .fontSize(14)
    .fillColor("#10B981");

  doc.text(
    `Total Amount: KES ${invoice.totalAmount}`
  );

  doc.text(
    `Paid Amount: KES ${invoice.paidAmount}`
  );

  doc.text(
    `Balance: KES ${invoice.balance}`
  );

  doc.moveDown(2);

  // FOOTER

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Thank you for choosing BMTECH Apartments",
      {
        align: "center",
      }
    );

  doc.end();
};

module.exports =
  generateInvoicePDF;


const generateReceiptPDF = (
  payment,
  res
) => {

  const doc =
    new PDFDocument({
      margin: 50,
    });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${payment.transactionCode}.pdf`
  );

  doc.pipe(res);

  // HEADER

  doc
    .fontSize(24)
    .fillColor("#10B981")
    .text(
      "BMTECH PAYMENT RECEIPT",
      {
        align: "center",
      }
    );

  doc.moveDown(2);

  // PAYMENT DETAILS

  doc
    .fontSize(12)
    .fillColor("black");

  doc.text(
    `Transaction Code: ${payment.transactionCode}`
  );

  doc.text(
    `Tenant: ${payment.tenant.fullName}`
  );

  doc.text(
    `Payment Method: ${payment.paymentMethod}`
  );

  doc.text(
    `Amount Paid: KES ${payment.amount}`
  );

  doc.text(
    `Date: ${new Date(
      payment.paymentDate
    ).toLocaleDateString()}`
  );

  doc.moveDown(2);

  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Payment received successfully.",
      {
        align: "center",
      }
    );

  doc.end();
};

module.exports =
  generateReceiptPDF;