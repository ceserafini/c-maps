export const getCountryEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const emojiDisplay = (emojiU: string) => {
  const codePoint = emojiU.replace('U+', '');
  return String.fromCodePoint(parseInt(codePoint, 16));
};
