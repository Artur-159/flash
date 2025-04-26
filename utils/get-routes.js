import { adminRoutes, guestRoutes, subRoutes } from "../router/page-routes";

const roleRoutes = {
  4: adminRoutes,
  3: adminRoutes,
  2: subRoutes,
};

export const getRoutes = (adminRole) => roleRoutes[adminRole] || guestRoutes;
