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
        route: "/checkout/confirmation",
        childRoutes: [
          {
            name: "Order Success",
            route: "/checkout/confirmation/success"
          },
          {
            name: "Order Failure",
            route: "/checkout/confirmation/error"
          }
        ]
      }
    ]
  }
];

const routes = [...unAuthenticatedRoutes, ...authenticatedRoutes];

export default routes;
