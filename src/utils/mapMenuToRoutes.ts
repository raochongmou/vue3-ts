import { IBreadcrumbs } from "@/base-ui";
import { RouteRecordRaw } from "vue-router";

let firstMenu = "";

export function mapMenuToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles:any = import.meta.glob('../router/**/!(index.ts)', { eager: true, import: 'default' });
  
  for (const path in routeFiles) {
    allRoutes.push(routeFiles[path]);
  }
  _recurseGetRoute(allRoutes, userMenu, routes);
  return routes;
}
function _recurseGetRoute (allRoutes: any[], userMenu: any[], routes: RouteRecordRaw[]) {
  for(let menu of userMenu) {
    if(menu.type === 2) {
      const route = allRoutes.find(route => route.path === menu.url);
      if(route) routes.push(route);
      if(!firstMenu) {
        firstMenu = menu.url;
      }
    } else {
      _recurseGetRoute(allRoutes, menu.children, routes);
    }
  }
};

function getBreadcrumbs(userMenu: any[], menuPath: string): any {
  let breadcrumb: IBreadcrumbs[] = [];
  getMenuToMap(userMenu, menuPath, breadcrumb);
  return breadcrumb;
}

function getMenuToMap(userMenu: any[], menuPath: string, breadcrumbs?: IBreadcrumbs[]): any {
  for(const menu of userMenu) {
    if(menu.type === 1) {
      const defaultValue = getMenuToMap(menu.children??[], menuPath);
      if(defaultValue) {
        breadcrumbs?.push({
          path: menu.url,
          name: menu.name
        });
        breadcrumbs?.push({
          path: defaultValue.url,
          name: defaultValue.name
        })
        return defaultValue;
      }
    } else if(menu.type === 2 && menu.url === menuPath) {
      return menu;
    }
  }
}

export function getPermissionMap(userMenu: any[]): string[] {
  const permissions: any[] = [];
  function recurrence(menu: any[]) {
    for(const item of menu) {
      if(item.type === 1 || item.type === 2) {
        recurrence(item.children??[]);
      } else if(item.type === 3) {
        permissions.push(item.permission);
      }
    }
  }
  recurrence(userMenu);
  return permissions;
}

export { getMenuToMap, getBreadcrumbs, firstMenu };