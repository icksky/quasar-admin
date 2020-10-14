/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { boot } from 'quasar/wrappers'
import { LoadingBar, Notify } from 'quasar'

import settings from 'src/settings'
import { UserModule } from 'store/user'
import { PermissionModule } from 'store/permission'
import { APPModule } from 'store/app'

export default boot(({ router }) => {
  router.beforeEach(async (to, _, next) => {
    // Start progress bar
    LoadingBar.start()

    APPModule.SET_ACTIVE_MENU(to.fullPath)

    // Determine whether the user has logged in
    if (UserModule.token) {
      if (to.path === '/login') {
        // If is logged in, redirect to the home page
        next({ path: '/' })
        LoadingBar.stop()
      } else {
        // Check whether the user has obtained his permission roles
        if (!UserModule.name) {
          try {
            // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
            await UserModule.GetUserInfo()
            await PermissionModule.GenerateRoutes()
            router.addRoutes(PermissionModule.dynamicRoutes)
            next()
          } catch (err) {
            // Remove token and redirect to login page
            UserModule.ResetLogin()
            Notify.create({
              message: err.message || 'Has Error',
              onDismiss: () => {
                next(`/login?redirect=${to.path}`)
                LoadingBar.stop()
              },
              timeout: 3000,
            })
          }
        } else {
          next()
        }
      }
    } else {
      // Has no token
      if (to.meta && to.meta.whitelist) {
        // In the free login whitelist, go directly
        next()
      } else {
        // Other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        LoadingBar.stop()
      }
    }
  })

  router.afterEach((to) => {
    // Finish progress bar
    LoadingBar.stop()

    // set page title
    const subtitle: string | undefined = to.meta?.title
    document.title = `${subtitle ? `${subtitle} - ` : ''}${settings.title}`
  })
})
