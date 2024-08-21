import { extendTheme } from "@chakra-ui/react";

export const CATEGORIES = [
	"Produce",
	"Meats",
	"Dairy",
	"Snacks",
	"Pantry",
	"Condiments",
	"Grains",
	"Beverages",
	"Pet",
	"Household",
	"Misc",
]; // can parse this from CSV later
export const GOOGLE_CLIENT_ID =
	"289499878407-akklk2rfpu0vs4md5m6o4ffoemsjpp2s.apps.googleusercontent.com";
export const INVENTORY_ITEM_AMOUNTS = ["High", "Low", "Medium", "Out"];
export const MAIN_COLOR = "#b09d92";
export const MAIN_COLOR_BACKGROUND = "#252525";
export const MAIN_COLOR_DARK = "#3c3632";
export const MAIN_COLOR_LIGHT = "#eae2de";
export const MAIN_COLOR_INPUT = "#323232";
export const HOVER_COLOR_DARK = "#584a44";
export const HOVER_COLOR_LIGHT = "#e8dbd3";
export const SCREEN_TAB_NAMES = ["Inventory", "Meals", "Store List"];
export const TRANSPARENT = "transparent";

export const CUSTOM_THEME = extendTheme({
	components: {
		Checkbox: {
			baseStyle: {
				control: {
					borderColor: MAIN_COLOR,
					_checked: {
						_hover: {
							borderColor: HOVER_COLOR_DARK,
							bg: HOVER_COLOR_DARK,
							color: HOVER_COLOR_LIGHT,
						},
						_disabled: {
							bg: MAIN_COLOR_DARK,
							borderColor: MAIN_COLOR_DARK,
							color: MAIN_COLOR_DARK,
							opacity: 0.5,
							cursor: "not-allowed",
						},
						bg: MAIN_COLOR,
						borderColor: MAIN_COLOR,
						color: MAIN_COLOR_LIGHT,
					},
				},
			},
		},
		Progress: {
			baseStyle: {
				filledTrack: {
					bg: MAIN_COLOR_INPUT,
					color: MAIN_COLOR,
				},
			},
		},
		CircularProgress: {
			baseStyle: {
				track: {
					stroke: MAIN_COLOR_BACKGROUND, // Background color of the CircularProgress track
				},
				filledTrack: {
					stroke: MAIN_COLOR, // Color of the filled portion of the CircularProgress
				},
			},
		},
	},
});
