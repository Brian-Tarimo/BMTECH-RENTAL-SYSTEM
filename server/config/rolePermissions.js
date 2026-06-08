const permissions = require("./permissions");

const rolePermissions = {

  "Super Admin": Object.values(permissions),

  "Landlord": [
    permissions.view_reports,
    permissions.view_invoices,
    permissions.approve_tenant,
    permissions.reject_tenant,
    permissions.create_unit,
    permissions.edit_unit,
    permissions.view_users
  ],

  "Accountant": [
    permissions.create_invoice,
    permissions.view_invoices,
    permissions.record_payment,
    permissions.view_payments
  ],

  "Caretaker": [
    permissions.view_users,
    permissions.assign_maintenance,
    permissions.update_maintenance
  ],

  "Tenant": [
    permissions.view_own_rent,
    permissions.pay_rent,
    permissions.submit_maintenance
  ]

};

module.exports = rolePermissions;