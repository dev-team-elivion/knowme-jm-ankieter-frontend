export const formatLocaleName = (locale: string, displayLanguage: string): string => {
  const name = new Intl.DisplayNames([displayLanguage], { type: 'language' }).of(locale) ?? locale;
  return name.charAt(0).toLocaleUpperCase(displayLanguage) + name.slice(1);
};
