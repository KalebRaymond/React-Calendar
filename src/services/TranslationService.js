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
};

export default TranslationService;
