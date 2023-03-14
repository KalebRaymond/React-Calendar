import i18n from "i18next";

const TranslationService = {
	getMonthTranslation: function (monthIndex) {
		switch (monthIndex) {
			case 0:
				return i18n.t("months.january");
			case 1:
				return i18n.t("months.february");
			case 2:
				return i18n.t("months.march");
			case 3:
				return i18n.t("months.april");
			case 4:
				return i18n.t("months.may");
			case 5:
				return i18n.t("months.june");
			case 6:
				return i18n.t("months.july");
			case 7:
				return i18n.t("months.august");
			case 8:
				return i18n.t("months.september");
			case 9:
				return i18n.t("months.october");
			case 10:
				return i18n.t("months.november");
			case 11:
				return i18n.t("months.december");
			default:
				return "";
		}
	},

	getOrdinal: function (num) {
		return i18n.t(`numbers.ordinal.${num}`);
	},

	getWeekdayFromIndex: function (index) {
		switch (index) {
			case 0:
				return i18n.t("days.sunday");
			case 1:
				return i18n.t("days.monday");
			case 2:
				return i18n.t("days.tuesday");
			case 3:
				return i18n.t("days.wednesday");
			case 4:
				return i18n.t("days.thursday");
			case 5:
				return i18n.t("days.friday");
			case 6:
				return i18n.t("days.saturday");
			default:
				return "";
		}
	},

	getWeekdayAbbreviatedFromIndex: function (index) {
		switch (index) {
			case 0:
				return i18n.t("days.sun");
			case 1:
				return i18n.t("days.mon");
			case 2:
				return i18n.t("days.tue");
			case 3:
				return i18n.t("days.wed");
			case 4:
				return i18n.t("days.thu");
			case 5:
				return i18n.t("days.fri");
			case 6:
				return i18n.t("days.sat");
			default:
				return "";
		}
	},
};

export default TranslationService;
