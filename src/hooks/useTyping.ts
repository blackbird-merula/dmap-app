import { useEffect, useRef, useState } from 'react'

export const useTyping = (
	texts: string[],
	typeMs = 80,
	deleteMs = 30,
	pauseMs = 2000,
) => {
	const [placeholder, setPlaceholder] = useState<{
		value: string
		textIndex: number
		fwd: boolean
		delay: boolean
	}>({ value: '', textIndex: 0, fwd: true, delay: false })

	const timerRef = useRef<Timer | null>(null)

	useEffect(() => {
		const updatePlaceholder = () => {
			setPlaceholder((prev) => {
				let { value, textIndex, fwd, delay } = prev

				if (delay) {
					return { ...prev, delay: false }
				}

				const text = texts[textIndex]

				if (fwd) {
					if (value.length < text.length) {
						value = value + text.charAt(value.length)
					} else {
						return { ...prev, fwd: false, delay: true }
					}
				} else {
					if (value.length === 0) {
						const nextTextIndex = (textIndex + 1) % texts.length
						return {
							value: '',
							textIndex: nextTextIndex,
							fwd: true,
							delay: true,
						}
					}
					value = value.slice(0, -1)
				}

				return { value, textIndex, fwd, delay }
			})
		}

		const scheduleNextUpdate = () => {
			timerRef.current = setTimeout(
				() => {
					updatePlaceholder()
					scheduleNextUpdate()
				},
				placeholder.delay
					? placeholder.fwd
						? pauseMs / 2
						: pauseMs
					: placeholder.fwd
						? typeMs
						: deleteMs,
			)
		}

		scheduleNextUpdate()

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [texts, typeMs, pauseMs, deleteMs, placeholder.fwd, placeholder.delay])

	return placeholder.value
}
