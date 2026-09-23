import { TypographyVariantsOptions } from '@mui/material/styles';

export const FONT_FAMILY = '"General Sans", "Segoe UI", sans-serif';

export const typography: TypographyVariantsOptions = {
  body1: { fontSize: '15px', fontWeight: 400, letterSpacing: '0.1px', lineHeight: 1.6 },
  body2: { fontSize: '13px', fontWeight: 400, letterSpacing: '0.1px', lineHeight: 1.55 },
  button: { fontSize: '13px', fontWeight: 600, letterSpacing: 0, textTransform: 'none' },
  caption: { fontSize: '12px', fontWeight: 500, letterSpacing: '0.2px', lineHeight: 1.4 },
  fontFamily: FONT_FAMILY,
  h1: { fontSize: '32px', fontWeight: 700, letterSpacing: '-0.4px', lineHeight: 1.15 },
  h2: { fontSize: '24px', fontWeight: 700, letterSpacing: '-0.2px', lineHeight: 1.2 },
  h3: { fontSize: '20px', fontWeight: 650, letterSpacing: 0, lineHeight: 1.25 },
  h4: { fontSize: '17px', fontWeight: 650, letterSpacing: 0, lineHeight: 1.3 },
  h5: { fontSize: '15px', fontWeight: 650, letterSpacing: 0, lineHeight: 1.35 },
  h6: { fontSize: '13px', fontWeight: 700, letterSpacing: '0.2px', lineHeight: 1.4 },
  overline: { fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1.4 },
  subtitle1: { fontSize: '15px', fontWeight: 600, lineHeight: 1.5 },
  subtitle2: { fontSize: '13px', fontWeight: 600, lineHeight: 1.5 },
};
