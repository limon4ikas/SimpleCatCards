import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createFont, createTamagui } from 'tamagui';

const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

const headingFont = createInterFont();
const bodyFont = createInterFont();
const roundedFont = createFont({
  family: 'SFProRounded',
  face: {
    '100': { normal: 'SFProRoundedThin' },
    '200': { normal: 'SFProRoundedUltralight' },
    '300': { normal: 'SFProRoundedLight' },
    '400': { normal: 'SFProRoundedRegular' },
    '500': { normal: 'SFProRoundedMedium' },
    '600': { normal: 'SFProRoundedSemibold' },
    '700': { normal: 'SFProRoundedBold' },
    '800': { normal: 'SFProRoundedHeavy' },
    '900': { normal: 'SFProRoundedBlack' },
    bold: { normal: 'SFProRoundedBold' },
    normal: { normal: 'SFProRoundedMedium' },
  },
  size: {
    '1': 11,
    '10': 46,
    '11': 55,
    '12': 62,
    '13': 72,
    '14': 92,
    '15': 114,
    '16': 134,
    '2': 12,
    '3': 13,
    '4': 14,
    '5': 16,
    '6': 18,
    '7': 20,
    '8': 23,
    '9': 30,
    true: 14,
  },
  letterSpacing: {
    '1': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    true: 0,
  },
  lineHeight: {
    '1': 21,
    '10': 56,
    '11': 65,
    '12': 72,
    '13': 82,
    '14': 102,
    '15': 124,
    '16': 144,
    '2': 22,
    '3': 23,
    '4': 24,
    '5': 26,
    '6': 28,
    '7': 30,
    '8': 33,
    '9': 40,
    true: 24,
  },
  weight: {
    '100': 100,
    '200': 200,
    '300': 300,
    '400': 400,
    '500': 500,
    '600': 600,
    '700': 700,
    '800': 800,
    '900': 900,
  },
});

const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
    rounded: roundedFont,
  },
  themes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  // overrides TamaguiCustomConfig so your custom types

  // work everywhere you import `tamagui`

  interface TamaguiCustomConfig extends AppConfig {}
}
export default config;
