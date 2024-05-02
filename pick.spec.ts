import {describe, expect, it} from 'vitest'
import {fc, test} from '@fast-check/vitest'
import {Color, pickColor} from './pick'

const palette: Color[] = [
  {background: 'red', foreground: 'light'},
  {background: 'green', foreground: 'light'},
  {background: 'blue', foreground: 'light'},
  {background: 'yellow', foreground: 'dark'},
  {background: 'pink', foreground: 'dark'},
]

describe('Color Picker', () => {
  describe('examples', () => {
    it.each([
      {name: 'Chris', expected: {background: 'red', foreground: 'light'}},
      {name: 'Maggo', expected: {background: 'green', foreground: 'light'}},
      {name: 'Oli', expected: {background: 'blue', foreground: 'light'}},
    ])('%s -> %j', (({name, expected}) => {
      expect(pickColor(palette, name)).toEqual(expected)
    }))
  })

  describe('properties', () => {
    describe('picked color comes always from the palette', () => {
      // fc.configureGlobal({verbose: 2})
      test.prop([fc.string()])('run', (name) => {
        const result = pickColor(palette, name)

        expect(palette).toContain(result)
      })
    })

    describe('same name implies same color', () => {
      test.prop([fc.string()])('run', (name) => {
        const result1 = pickColor(palette, name)
        const result2 = pickColor(palette, name)

        expect(result1).toEqual(result2)
      })
    })

    describe('different name implies different color', () => {
      const arbDifferentNames = fc.record({
        first: fc.string(),
        second: fc.string(),
      }).filter(it => it.first !== it.second)
      test.prop([arbDifferentNames])('run', (names) => {
        const result1 = pickColor(palette, names.first)
        const result2 = pickColor(palette, names.second)

        expect(result1).not.toEqual(result2)
      })
    })

    it('output color distribution statistics', () => {
      fc.statistics(fc.string(), it => {
        return pickColor(palette, it).background
      })
    })
  })
})