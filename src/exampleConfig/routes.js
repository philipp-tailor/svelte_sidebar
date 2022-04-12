export const exampleRoutes = [
	{
		name: 'Playground',
		route: '/',
	},
	{
		name: 'Readme',
		route: '/readme',
		childRoutes: [
			{
				name: 'What it is',
				route: '/readme#what-it-is',
			},
			{
				name: 'Features',
				route: '/readme#features',
			},
			{
				name: 'Component props',
				route: '/readme#component-properties',
				childRoutes: [
					{
						name: 'The routes array',
						route: '/readme#the-routes-array',
					},
					{
						name: 'The theme property',
						route: '/readme#the-theme-property',
					},
				],
			},
			{
				name: 'Slots',
				route: '/readme#slots',
			},
			{
				name: 'License',
				route: '/readme#license',
			},
			{
				name: 'Contribution',
				route: '/readme#contribution',
			},
		],
	},
	{
		name: 'Example group',
		route: '/another-link-group',
		childRoutes: [
			{
				name: 'A not disabled link',
				route: '/another-link-group/enabled',
			},
			{
				name: 'A disabled link',
				route: '/another-link-group/disabled',
				disabled: true,
			},
		],
		collapseTree: true,
	},
	{
		name: 'Disabled example group',
		route: '/disabled',
		disabled: true,
		childRoutes: [
			{
				name: 'Sub-link 1',
				route: '/disabled/sub-link-1',
			},
			{
				name: 'Sub-link 2',
				route: '/disabled/sub-link-2',
			},
		],
	},
]

const routes = [...exampleRoutes]

export default routes
