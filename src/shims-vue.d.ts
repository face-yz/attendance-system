declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  import VueRouter, { Route } from 'vue-router';
  import { ElMessage } from 'element-ui/types/message';
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $message: ElMessage;
  }
}