/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import * as singleSpa from 'single-spa';
import Reducer from "./src/redux/Reducer";
import 'zone.js';

function showWhenAnyOf(routes) {
  return function (location) {
    return routes.some((route) => location.pathname === route);
  };
}

function showWhenPrefix(routes) {
  return function (location) {
    return routes.some((route) => location.pathname.startsWith(route));
  };
}

function showExcept(routes) {
  return function (location) {
    return routes.every((route) => location.pathname !== route);
  };
}

singleSpa.registerApplication(
  'mf-root',
  () => import("@00jfb00/mf-root"),
  () => true,
  { Reducer }
);

singleSpa.registerApplication(
  '@mf/people',
  () => import("@00jfb00/mf-people"),
  showWhenPrefix(['/people']),
  { Reducer }
);

singleSpa.registerApplication(
  '@00jfb00/planets',
  () => import("@00jfb00/mf-planets"),
  showWhenPrefix(['/planets']),
  { Reducer },
);
//
//
// function registerApplications() {
//   singleSpa.registerApplication({
//     name: "@mf/people",
//     app: () => import("../people/dist/mf-people"),
//     activeWhen: "/people",
//     customProps: { Reducer },
//   });
//
//   singleSpa.registerApplication({
//     name: "@00jfb00/planets",
//     app: () => import("@00jfb00/planets/dist/mf-planets"),
//     activeWhen: "/planets",
//     customProps: { Reducer },
//   });
// }
//
// singleSpa.registerApplication({
//   name: "@mf/root",
//   app: () => import("../root/dist/mf-root"),
//   activeWhen: "/",
//   customProps: { Reducer },
// });
//
// registerApplications();

singleSpa.start();
