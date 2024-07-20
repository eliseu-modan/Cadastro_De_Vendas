import {
  UserOutlined,
  PlusCircleOutlined,
  IdcardOutlined,
  UnorderedListOutlined,
  DashboardOutlined 
} from "@ant-design/icons";
import { TasksList } from "../pages/Dashboard";
import { productsCreate } from "../pages/products";
import { productsList } from "../pages/products";
import {RegisterSales} from "../pages/Sales"
import {ListSales} from "../pages/Sales"


import { LoginPage, ErrorPage, UsersPage } from "../pages";
import { formatRoutes } from "./utils";
import CustomLayout from "../layouts/Custom";
import {
  ROUTE_PRIVATE_ROOT_PATH,
  ROUTE_PUBLIC_ROOT_PATH,
  ERROR_PAGES,
} from "./constants";
import { ScheduleOutlined } from "@ant-design/icons";
import { CheckOutlined } from "@ant-design/icons";

const routes = formatRoutes([
  //Public routes
  {
    path: ROUTE_PUBLIC_ROOT_PATH,
    exact: true,
    layout: "custom",
    layoutComponent: CustomLayout,
    component: LoginPage,
    page: { title: "Entrar" },
  },

  {
    path: ROUTE_PRIVATE_ROOT_PATH,
    exact: true,
    component: TasksList,
    layout: "private",
    page: { title: "Dashboard" },
    menu: {
      title: "Dashboard",
      icon: DashboardOutlined,
      insideSubmenu: {
        title: "Meu Dashboard",
        icon: DashboardOutlined,
      },
    },
  },
  {
    path: "/Tarefas-Concluidas",
    exact: true,
    component: productsCreate,
    layout: "private",
    page: { title: "Cadastrar Produto" },
    menu: {
      title: "Cadastrar Produto",
      icon: PlusCircleOutlined ,
    },
  },
  {
    path: "/Listar-Produtos",
    exact: true,
    component: productsList,
    layout: "private",
    page: { title: "Listar Produtos" },
    menu: {
      title: "Listar Produtos",
      icon: UnorderedListOutlined,
    },
  },
  {
    path: "/Tarefas-Permanentes",
    exact: true,
    layout: "private",
    component: RegisterSales,
    page: { title: "Registrar Vendas" },
    menu: {
      title: "Registrar Vendas",
      icon: PlusCircleOutlined,
    },
  },
  {
    path: "/Registrar-Vendas",
    exact: true,
    layout: "private",
    component: ListSales,
    page: { title: "Vendas Efetuadas" },
    menu: {
      title: "Listar Vendas",
      icon: UnorderedListOutlined,
    },
  },

  {
    path: "/usuarios",
    exact: true,
    layout: "private",
    component: UsersPage,
    page: { title: "Usuarios" },
    menu: { icon: UserOutlined, title: "Usuarios" },
    layoutContentStyle: { overflowY: "auto" },
  },
  // Routes errors
  {
    path: ERROR_PAGES[403],
    exact: true,
    layout: "custom",
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: "403",
      subTitle: "Desculpe! Você não tem permissão para ver essa página.",
      status: 403,
    },
  },
  {
    path: ERROR_PAGES[500],
    layout: "custom",
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: "500",
      subTitle: "Eita! Algo de errado não está certo.",
      status: 500,
    },
  },
  {
    path: ERROR_PAGES[404],
    layout: "custom",
    layoutComponent: CustomLayout,
    component: ErrorPage,
    page: {
      title: "404",
      subTitle: "Ops! A página solicitada não existe.",
      status: 404,
    },
  },
]);

export default routes;
