export const exampleRoutes = [
	{
		name: 'Home',
		route: '/'
	},
	{
		name: 'Settings',
		route: '/settings',
		childRoutes: [
			{
				name: 'User Settings',
				route: '/settings/user'
			},
			{
				name: 'Organisation Settings (Team Management & Billing)',
				route: '/settings/org'
			}
		]
	},
	{
		name: 'Products',
		route: '/products',
		disabled: true,
		childRoutes: [
			{
				name: 'Comparison',
				route: '/products/compare'
			},
			{
				name: 'Wishlist',
				route: '/products/wishlist'
			}
		]
	},
	{
		name: 'Checkout',
		route: '/checkout',
		childRoutes: [
			{
				name: 'Cart',
				route: '/checkout/cart'
			},
			{
				name: 'Payment Details',
				route: '/checkout/payment'
			},
			{
				name: 'Confirm',
				route: '/checkout/confirmation',
				childRoutes: [
					{
						name: 'Order Success',
						route: '/checkout/confirmation/success'
					},
					{
						name: 'Order Failure',
						route: '/checkout/confirmation/error',
						disabled: true
					}
				]
			}
		]
	},
	{
		name: 'Admin',
		route: '/admin',
		disabled: true
	}
]

const routes = [...exampleRoutes]

export default routes
