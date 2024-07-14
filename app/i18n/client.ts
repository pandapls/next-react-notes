'use client';

import { defaultLocale, locales } from '@/root/config';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {
	initReactI18next,
	useTranslation as useTranslationOrg,
} from 'react-i18next';
export const cookieName = 'i18next';

const runsOnServerSide = typeof window === 'undefined';

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(
		resourcesToBackend(
			(language: string, namespace: string) =>
				import(`./locales/${language}/${namespace}.json`)
		)
	)
	.init({
		supportedLngs: locales,
		fallbackLng: defaultLocale,
		lng: defaultLocale,
		fallbackNS: 'basic',
		defaultNS: 'basic',
		ns: 'basic',
		detection: {
			order: ['path', 'htmlTag', 'cookie', 'navigator'],
		},
		preload: runsOnServerSide ? locales : [],
	});

export function useTranslation(
	lng: string,
	ns: string | string[] = 'basic',
	options: { keyPrefix?: string } = {}
) {
	const [cookies, setCookie] = useCookies([cookieName]);
	const ret = useTranslationOrg(ns, options);
	const { i18n } = ret;
	if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
		i18n.changeLanguage(lng);
	} else {
		const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
		useEffect(() => {
			if (activeLng === i18n.resolvedLanguage) return;
			setActiveLng(i18n.resolvedLanguage);
		}, [activeLng, i18n.resolvedLanguage]);
		useEffect(() => {
			if (!lng || i18n.resolvedLanguage === lng) return;
			i18n.changeLanguage(lng);
		}, [lng, i18n]);
		useEffect(() => {
			if (cookies.i18next === lng) return;
			setCookie(cookieName, lng, { path: '/' });
		}, [lng, cookies.i18next]);
	}
	return ret;
}
