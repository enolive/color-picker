export type Color = {
  background: string;
  foreground: 'light' | 'dark';
}

function hashCode(s: string) {
  let hash = 0,
    i, chr
  if (s.length === 0) return hash
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

function mod(a: number, b: number) {
  return ((a % b) + b) % b
}

export function pickColor(palette: Color[], name: string) {
  const whichColor = mod(hashCode(name), palette.length)
  return palette[whichColor]
}