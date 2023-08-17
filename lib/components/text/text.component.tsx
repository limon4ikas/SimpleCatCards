import { styled, Text as TamaText } from 'tamagui';

export const Text = styled(TamaText, {
  name: 'MyText',
  fontFamily: '$rounded',
  variants: {
    bold: { true: { fontWeight: '600' } },
    type: {
      'large-title': { fontSize: 34 },
      'title-1': { fontSize: 28 },
      'title-2': { fontSize: 22 },
      'title-3': { fontSize: 20 },
      headline: { fontSize: 17, fontWeight: '600' },
      body: { fontSize: 17 },
      callout: { fontSize: 16 },
      subhead: { fontSize: 15 },
      footnote: { fontSize: 13 },
      'caption-1': { fontSize: 12 },
      'caption-2': { fontSize: 11 },
    },
  } as const,
});
