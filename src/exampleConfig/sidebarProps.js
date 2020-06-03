import { exampleRoutes } from './routes'
import { isDarkMode } from '../utils/detectDarkMode'

export const exampleSidebarProps = Object.freeze({
	routes: exampleRoutes,
	open: window.innerWidth > 950,
	theme: {
		backgroundColor_linkActive: '#F4442E',
		backgroundColor_nav: isDarkMode ? '#1E1E1E' : '#003649',
		color_link: '#F7F7F2',
		color_linkHover: '#FCA311',
		fontSize: '1rem',
		maxWidth_nav: '20vw',
		minWidth_nav: '320px',
		opacity_linkDisabled: '0.5',
		opacity_linkInactive: '0.75',
	},
})

export default exampleSidebarProps
