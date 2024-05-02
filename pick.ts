export type Color = {
  background: string;
  foreground: 'light' | 'dark';
}

function hashCode(s: string) {
  let h = 0, l = s.length, i = 0
  if (l > 0)
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0
  return h
}

function mod(a: number, b: number) {
  return ((a % b) + b) % b
}

export function pickColor(palette: Color[], name: string) {
  const whichColor = mod(hashCode(name), palette.length)
  return palette[whichColor]
}