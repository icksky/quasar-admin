import Vue from 'vue'
import Vuex from 'vuex'

import { UserState } from 'store/user'
import { PermissionState } from 'store/permission'
import { APPState } from 'store/app'

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  user: UserState,
  permission: PermissionState,
  app: APPState,
}

Vue.use(Vuex)

export default new Vuex.Store<StateInterface>({
  // enable strict mode (adds overhead!)
  // for dev mode only
  // strict: !!process.env.DEV,
})
