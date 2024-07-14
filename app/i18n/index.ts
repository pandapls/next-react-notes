import { defaultLocale, locales } from '@/root/config';
import { i18n as I18nInstance, InitOptions, createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
const initI18next = async (
	lng: string = defaultLocale,
	ns: string | string[] = 'basic'
): Promise<I18nInstance> => {
	const i18nInstance = createInstance();

	await i18nInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) =>
					import(`./locales/${language}/${namespace}.json`)
			)
		)
		.init({
			// debug: true,
			supportedLngs: locales,
			fallbackLng: defaultLocale,
			lng,
			fallbackNS: 'basic',
			defaultNS: 'basic',
			ns,
		} as InitOptions);

	return i18nInstance;
};

export async function useTranslation(
	lng: string,
	ns: string | string[] = 'basic',
	options: { keyPrefix?: string } = {}
) {
	const i18nextInstance = await initI18next(lng, ns);

	return {
		t: i18nextInstance.getFixedT(
			lng,
			Array.isArray(ns) ? ns[0] : ns,
			options.keyPrefix
		),
		i18n: i18nextInstance,
	};
}
