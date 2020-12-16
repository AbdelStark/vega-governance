// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Proposals from "@/pages/Proposal/Proposals";

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
    ]
  },
  {path: "*", component: NotFound},
];

export default routes;
