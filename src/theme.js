export const primary = lightness => ({ theme: { hue, isDark } }) =>
	`hsl(${hue}, 50%, ${isDark ? lightness + 10 : lightness}%)`
