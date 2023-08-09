export function shortenNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  }
  return number.toString();
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
