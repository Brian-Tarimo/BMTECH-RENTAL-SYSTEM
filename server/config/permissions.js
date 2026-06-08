const permissions = {

    // TENANTS
    view_own_rent: "view_own_rent",
    pay_rent: "pay_rent",
    submit_maintenance: "submit_maintenance",
  
    // BILLING
    create_invoice: "create_invoice",
    view_invoices: "view_invoices",
    delete_invoice: "delete_invoice",
  
    // PAYMENTS
    record_payment: "record_payment",
    view_payments: "view_payments",
  
    // TENANT MANAGEMENT
    approve_tenant: "approve_tenant",
    reject_tenant: "reject_tenant",
  
    // USERS
    create_staff: "create_staff",
    view_users: "view_users",
    update_user_status: "update_user_status",
  
    // APARTMENTS
    create_unit: "create_unit",
    edit_unit: "edit_unit",
    delete_unit: "delete_unit",
  
    // REPORTS
    view_reports: "view_reports",
  
    // MAINTENANCE
    assign_maintenance: "assign_maintenance",
    update_maintenance: "update_maintenance"
  
  };
  
  module.exports = permissions;