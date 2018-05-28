
import { Comunicados } from './../views/components/Comunicados';
import DetalheComunicado from './../views/components/DetalheComunicado';

var indexRoutes = [
  { path: "/detalhes/:id", name: "Detalhes", component: DetalheComunicado },
  { path: "/", name: "Comunicados", component: Comunicados }
];

export default indexRoutes;