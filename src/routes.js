export const unAuthenticatedRoutes = [
  {
    name: "Login",
    route: "/login"
  },
  {
    name: "Signup",
    route: "/signup"
  },
  {
    name: "Password Reset",
    route: "/password-reset"
  },
  {
    name: "Terms Of Service",
    route: "/terms-of-service"
  }
];

export const authenticatedRoutes = [
  {
    name: "Home",
    route: "/"
  },
  {
    name: "Settings",
    route: "/settings",
    childRoutes: [
      {
        name: "User Settings",
        route: "/settings/user"
      },
      {
        name: "Organisation Settings",
        route: "/settings/org"
      }
    ]
  },
  {
    name: "Checkout",
    route: "/checkout",
    childRoutes: [
      {
        name: "Cart",
        route: "/checkout/cart"
      },
      {
        name: "Payment Details",
        route: "/checkout/payment"
      },
      {
        name: "Confirm",
        route: "/checkout/confirm",
        childRoutes: [
          {
            name: "Order Success",
            route: "/checkout/confirm/success"
          },
          {
            name: "Order Failure",
            route: "/checkout/confirm/error"
          }
        ]
      }
    ]
  }
];

const routes = [...unAuthenticatedRoutes, ...authenticatedRoutes];

export default routes;
