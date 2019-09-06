export const unAuthenticatedRoutes = [
  {
    name: "Login",
    url: "/login"
  },
  {
    name: "Signup",
    url: "/signup"
  },
  {
    name: "Password Reset",
    url: "/password-reset"
  },
  {
    name: "Terms Of Service",
    url: "/terms-of-service"
  }
];

export const authenticatedRoutes = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Settings",
    url: "/settings",
    childRoutes: [
      {
        name: "User Settings",
        url: "/settings/user"
      },
      {
        name: "Organisation Settings",
        url: "/settings/org"
      }
    ]
  },
  {
    name: "Checkout",
    url: "/checkout",
    childRoutes: [
      {
        name: "Cart",
        url: "/checkout/cart"
      },
      {
        name: "Payment Details",
        url: "/checkout/payment"
      },
      {
        name: "Confirm",
        url: "/checkout/confirm",
        childRoutes: [
          {
            name: "Order Success",
            url: "/checkout/confirm/success"
          },
          {
            name: "Order Failure",
            url: "/checkout/confirm/error"
          }
        ]
      }
    ]
  }
];

const routes = [...unAuthenticatedRoutes, ...authenticatedRoutes];

export default routes;
