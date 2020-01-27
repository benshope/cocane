export const primary = lightness => ({ theme: { hue, isDark } }) =>
	`hsl(${hue}, 50%, ${isDark ? lightness - 20 : lightness}%)`

// TODO use the slight opposite of primary to tint this?
export const mono = lightness => ({ theme: { isDark } }) =>
	`hsl(0, 0%, ${isDark ? 100 - lightness : lightness}%)`

// TODO: could use other color terms here?
// perhaps this should be color accessibility aware? using d3?
