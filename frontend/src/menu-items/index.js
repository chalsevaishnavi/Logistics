// import dashboard from './dashboard';
import { dashboard, customer, quotes, shipment, vendor, staff, reports, superadmin } from './dashboard';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,customer, quotes, shipment, vendor, staff, reports],
  SuperAdminItems: [superadmin]

};

export default menuItems;
