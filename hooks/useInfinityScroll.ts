import { useEffect } from "react"

const isScrollToBottom = () => {

	const windowHeight =
		'innerHeight' in window
			? window.innerHeight
			: document.documentElement.offsetHeight
	const body = document.body
	const html = document.documentElement
	const docHeight = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight,
	)
	const windowBottom = windowHeight + window.pageYOffset
	if (windowBottom >= docHeight - 200) return true
	return false
}
 
export function useInfinityScroll(on_bottom: Function) {

	const handler = (e) => {
		isScrollToBottom() && on_bottom()
	}

	useEffect(() => {
		window.addEventListener('scroll', handler)
		return () => window.removeEventListener('scroll', handler)
	})
}