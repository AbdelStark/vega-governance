// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Proposals from "@/pages/Proposal/Proposals";
import Debug from "@/pages/Debug/Debug";
import Wallet from "@/pages/Wallet/Wallet";
import Settings from "@/pages/Settings/Settings";

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/proposals',
    component: DashboardLayout,
    children: [
      {
        path: 'proposals',
        name: 'proposals',
        components: {default: Proposals}
      },
      {
        path: 'wallet',
        name: 'wallet',
        components: {default: Wallet}
      },
      {
        path: 'settings',
        name: 'settings',
        components: {default: Settings}
      },
      {
        path: 'debug',
        name: 'debug',
        components: {default: Debug}
      },
    ]
  },
  {path: "*", component: NotFound},
];

export default routes;
