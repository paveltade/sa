export const masks = Array.from({ length: 33 }, (_, i) => {
  const maskLength = i;
  const maskBinary = '1'.repeat(maskLength).padEnd(32, '0');
  const maskOctets = maskBinary.match(/.{8}/g).map(b => parseInt(b, 2)).join('.');

  return {
    value: maskOctets,
    label: `${maskLength} / ${maskOctets}`
  };
});