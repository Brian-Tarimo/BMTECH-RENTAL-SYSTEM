const Invoice = require("../models/Invoice");

const Tenant = require("../models/Tenant");

const Unit = require("../models/Unit");

const Notification =
  require("../models/Notification");

const generateInvoicePDF =
  require("../services/generateInvoicePDF");

const generateInvoiceNumber = () => {

  return `INV-${Date.now()}`;

};

const createInvoice = async (
  req,
  res
) => {

  try {

    const {
      tenant,
      waterBill,
      electricityBill,
      garbageFee,
      penalty,
      dueDate,
    } = req.body;

    const tenantData =
      await Tenant.findById(tenant)
        .populate("unit");

    if (!tenantData) {

      return res.status(404).json({
        message: "Tenant not found",
      });

    }

    const rentAmount =
      tenantData.unit.monthlyRent;

    const totalAmount =
      rentAmount +
      Number(waterBill || 0) +
      Number(electricityBill || 0) +
      Number(garbageFee || 0) +
      Number(penalty || 0);

    const invoice =
      await Invoice.create({

        invoiceNumber:
          generateInvoiceNumber(),

        tenant,

        rentAmount,

        waterBill,

        electricityBill,

        garbageFee,

        penalty,

        totalAmount,

        balance: totalAmount,

        dueDate,

      });

    // CREATE NOTIFICATION

    await Notification.create({

      title:
        "New Invoice Generated",

      message:
        `Invoice ${invoice.invoiceNumber} has been generated.`,

      type: "Rent",

      recipientRole: "Tenant",

    });

    res.status(201).json(invoice);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getInvoices = async (
  req,
  res
) => {

  try {

    const invoices =
      await Invoice.find()
        .populate({
          path: "tenant",
          populate: {
            path: "unit",
          },
        });

    res.status(200).json(invoices);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const payInvoice = async (
  req,
  res
) => {

  try {

    const { amount } = req.body;

    const invoice =
      await Invoice.findById(
        req.params.id
      );

    if (!invoice) {

      return res.status(404).json({
        message: "Invoice not found",
      });

    }

    invoice.paidAmount +=
      Number(amount);

    invoice.balance =
      invoice.totalAmount -
      invoice.paidAmount;

    if (invoice.balance <= 0) {

      invoice.status = "Paid";

      invoice.balance = 0;

    } else {

      invoice.status = "Partial";

    }

    await invoice.save();

    res.status(200).json(invoice);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const downloadInvoicePDF =
  async (
    req,
    res
  ) => {

    try {

      const invoice =
        await Invoice.findById(
          req.params.id
        ).populate({
          path: "tenant",
          populate: {
            path: "unit",
          },
        });

      if (!invoice) {

        return res.status(404).json({
          message:
            "Invoice not found",
        });

      }

      generateInvoicePDF(
        invoice,
        res
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

module.exports = {
  createInvoice,
  getInvoices,
  payInvoice,
  downloadInvoicePDF,
};