
const routes = [
  {
    path: '/',
    redirect: {path: '/onboarding'},
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: 'onboarding', 
        name: 'Onboarding',
        component: () => import('pages/intro/WelcomePage.vue')
      },
      { 
        path: 'choosing', 
        name: 'Choosing',
        component: () => import('pages/intro/ChoosingPage.vue')
      },
      { 
        path: 'login', 
        name: 'Login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      { 
        path: 'verify', 
        name: 'Verify',
        component: () => import('pages/auth/VerifyPage.vue')
      },
      { 
        path: 'register', 
        name: 'Register',
        component: () => import('pages/auth/RegisterPage.vue')
      },
      { 
        path: 'emenu/homepage', 
        name: 'Homepage',
        component: () => import('pages/menu/HomePage.vue')
      },
      { 
        path: 'emenu/recomended', 
        name: 'Recomended',
        component: () => import('pages/menu/RecomendedPage.vue')
      },
      { 
        path: 'emenu/search', 
        name: 'Search',
        component: () => import('pages/search/SearchPage.vue')
      },
      { 
        path: 'emenu/product/:id', 
        name: 'CategoryProductDetail',
        component: () => import('pages/product/ProductDetailPage.vue')
      },
      // { 
      //   path: 'emenu/productPackage/:id', 
      //   name: 'CategoryProductPackageDetail',
      //   component: () => import('pages/product/ProductPackagePage.vue')
      // },
      { 
        path: '/successAtc', 
        name: 'SuccessAtcPage',
        component: () => import('pages/product/SuccessAtcPage.vue')
      },
      { 
        path: 'emenu/voucher', 
        name: 'VoucherListPage',
        component: () => import('pages/voucher/VoucherListPage.vue')
      },
      { 
        path: 'emenu/voucher/redeem/validate', 
        name: 'VoucherRedeemValidatePage',
        component: () => import('pages/voucher/VoucherRedeemValidatePage.vue')
      },
      { 
        path: 'emenu/voucher/redeem/success', 
        name: 'VoucherSuccessRedeemPage',
        component: () => import('pages/voucher/VoucherSuccessRedeemPage.vue')
      },
      { 
        path: 'emenu/cart', 
        name: 'CartPage',
        component: () => import('pages/checkout/CartPage.vue')
      },
      { 
        path: 'emenu/checkout/success', 
        name: 'SuccessPage',
        component: () => import('pages/checkout/SuccessPage.vue')
      },
      { 
        path: 'emenu/cart/voucher', 
        name: 'CartVoucherPage',
        component: () => import('pages/voucher/CartVoucherListPage.vue')
      },
      { 
        path: 'emenu/cart/myVoucher', 
        name: 'CartMyVoucherPage',
        component: () => import('pages/voucher/CartMyVoucherPage.vue')
      },
      { 
        path: 'user/membership', 
        name: 'UserMembership',
        component: () => import('pages/membership/DetailMembershipPage.vue')
      },
      { 
        path: 'user/membership/voucher', 
        name: 'UserMembershipVoucher',
        component: () => import('pages/membership/MyVoucherMembershipPage.vue')
      },
      { 
        path: 'user/membership/profile', 
        name: 'UserProfileMembership',
        component: () => import('pages/membership/UserProfilePage.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
