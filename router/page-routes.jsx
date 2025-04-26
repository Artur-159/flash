import { lazy } from "react";

const Profile = lazy(() => import("../pages/profile"));
const Balance = lazy(() => import("../pages/balance"));
const Dashboard = lazy(() => import("../pages/dashboard"));
const Transaction = lazy(() => import("../pages/transaction"));
const Message = lazy(() => import("../pages/messages"));
const Registration = lazy(() => import("../pages/auth/registration"));
const Login = lazy(() => import("../pages/auth/login"));
const ForgotPassword = lazy(() => import("../pages/auth/forgot-password"));
const ResetPassword = lazy(() => import("../pages/auth/reset-password"));
const Branches = lazy(() => import("../pages/branches"));
const MyCars = lazy(() => import("../pages/my-cars"));
const Friends = lazy(() => import("../pages/friends"));
const AuthPage = lazy(() => import("../pages/auth"));

export const individualRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "/icons/home_icon.svg",
    element: <Dashboard />,
  },
  {
    name: "My Cars",
    path: "/vehicles",
    icon: "/icons/transport_icon.svg",
    element: <MyCars />,
  },
  {
    name: "Transaction",
    path: "/transactions",
    icon: "/icons/transactions_icon.svg",
    element: <Transaction />,
  },
  {
    name: "messages",
    path: "/messages",
    icon: "/icons/messages_icon.svg",
    element: <Message />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "/icons/setting_icon.svg",
    element: <Profile />,
  },
  {
    name: "Balance",
    path: "/my-balance",
    icon: "/icons/money_icon.svg",
    element: <Balance />,
  },
  {
    name: "Friends",
    path: "/friends",
    icon: "/icons/frends_icon.svg",
    element: <Friends />,
  },
  {
    name: "Մեր լցակայանները",
    path: "/stations",
    icon: "/icons/frends_icon.svg",
    element: <Branches />,
  },
];

export const companyRoutes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "/icons/home_icon.svg",
    element: <Dashboard />,
  },
  {
    name: "My Cars",
    path: "/vehicles",
    icon: "/icons/transport_icon.svg",
    element: <MyCars />,
  },
  {
    name: "Transaction",
    path: "/transactions",
    icon: "/icons/transactions_icon.svg",
    element: <Transaction />,
  },
  {
    name: "messages",
    path: "/messages",
    icon: "/icons/messages_icon.svg",
    element: <Message />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "/icons/setting_icon.svg",
    element: <Profile />,
  },
  {
    name: "Balance",
    path: "/my-balance",
    icon: "/icons/money_icon.svg",
    element: <Balance />,
  },
  {
    name: "Friends",
    path: "/friends",
    icon: "/icons/frends_icon.svg",
    element: <Friends />,
  },
  {
    name: "Մեր լցակայանները",
    path: "/stations",
    icon: "/icons/frends_icon.svg",
    element: <Branches />,
  },
];

export const guestRoutes = [
  {
    path: "/auth",
    name: "Մուտք",
    element: <AuthPage />,
    children: [
      {
        index: true,
        name: "Մուտք",
        element: <Login />,
      },
      {
        path: "register",
        name: "Գրանցում",
        element: <Registration />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        name: "reset-password",
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];
