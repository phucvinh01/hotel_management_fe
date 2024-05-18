export function getValueAfterSemicolon(inputString: string): string {
  const parts = inputString.split(';');
  if (parts.length > 1) {
    return parts[1];
  } else {
    return '';
  }
}

