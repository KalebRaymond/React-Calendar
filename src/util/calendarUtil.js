import i18n from "i18next";

export const getOrdinal = (num) => {
	return i18n.t(`numbers.ordinal.${num}`);
};
