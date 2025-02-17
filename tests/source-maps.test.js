import postcss from 'postcss'
import { parseSourceMaps } from './util/source-maps'
import { runWithSourceMaps as run, html, css, map } from './util/run'

test('apply generates source maps', async () => {
  let config = {
    content: [
      {
        raw: html`
          <div class="with-declaration"></div>
          <div class="with-comment"></div>
          <div class="just-apply"></div>
        `,
      },
    ],
    corePlugins: { preflight: false },
  }

  let input = css`
    .with-declaration {
      background-color: red;
      @apply h-4 w-4 bg-green-500;
    }

    .with-comment {
      /* sourcemap will work here too */
      @apply h-4 w-4 bg-red-500;
    }

    .just-apply {
      @apply h-4 w-4 bg-black;
    }
  `

  let result = await run(input, config)
  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')
  expect(sources.length).toBe(2)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:4 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-20 -> 3:2-20",
      "4:2-23 -> 4:2-23",
      "5:2-57 -> 5:2-57",
      "6:2-13 -> 6:2-13",
      "7:2-14 -> 7:2-14",
      "8:0 -> 8:0",
      "10:0 -> 10:0",
      "11:2-20 -> 11:2-20",
      "12:2-57 -> 12:2-57",
      "13:2-13 -> 13:2-13",
      "14:2-14 -> 14:2-14",
      "15:0 -> 15:0",
      "17:0 -> 17:0",
      "18:2-20 -> 18:2-20",
      "19:2-53 -> 19:2-53",
      "20:2-13 -> 20:2-13",
      "21:2-14 -> 21:2-14",
      "22:0 -> 22:0",
    ]
  `)
})

test('preflight + base have source maps', async () => {
  let config = {
    content: [],
  }

  let input = css`
    @tailwind base;
  `

  let result = await run(input, config)
  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')
  expect(sources.length).toBe(2)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:4 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-24 -> 3:2-24",
      "4:2-25 -> 4:2-25",
      "5:0 -> 5:0",
      "7:0 -> 7:0",
      "8:2-18 -> 8:2-18",
      "9:0 -> 9:0",
      "11:0 -> 11:0",
      "12:2-32 -> 12:2-32",
      "13:2-13 -> 13:2-13",
      "14:2-31 -> 14:2-31",
      "15:2-33 -> 15:2-33",
      "16:2-42 -> 16:2-42",
      "17:2-121 -> 17:2-121",
      "18:2-18 -> 18:2-18",
      "19:0 -> 19:0",
      "21:0 -> 21:0",
      "22:2-22 -> 22:2-22",
      "23:2-11 -> 23:2-11",
      "24:0 -> 24:0",
      "26:0 -> 26:0",
      "27:2-16 -> 27:2-16",
      "28:2-23 -> 28:2-23",
      "29:2-11 -> 29:2-11",
      "30:0 -> 30:0",
      "32:0 -> 32:0",
      "33:2-43 -> 33:2-43",
      "34:2-35 -> 34:2-35",
      "35:0 -> 35:0",
      "37:0 -> 37:0",
      "38:2-20 -> 38:2-20",
      "39:2-22 -> 39:2-22",
      "40:0 -> 40:0",
      "42:0 -> 42:0",
      "43:2-16 -> 43:2-16",
      "44:2-34 -> 44:2-34",
      "45:2-26 -> 45:2-26",
      "46:0 -> 46:0",
      "48:0 -> 48:0",
      "49:2-21 -> 49:2-21",
      "50:0 -> 50:0",
      "52:0 -> 52:0",
      "53:2-109 -> 53:2-109",
      "54:2-16 -> 54:2-16",
      "55:0 -> 55:0",
      "57:0 -> 57:0",
      "58:2-16 -> 58:2-16",
      "59:0 -> 59:0",
      "61:0 -> 61:0",
      "62:2-26 -> 62:2-26",
      "63:2-16 -> 63:2-16",
      "64:2-16 -> 64:2-16",
      "65:2-20 -> 65:2-20",
      "66:0 -> 66:0",
      "68:0 -> 68:0",
      "69:2-16 -> 69:2-16",
      "70:0 -> 70:0",
      "72:0 -> 72:0",
      "73:2-12 -> 73:2-12",
      "74:0 -> 74:0",
      "76:0 -> 76:0",
      "77:2-16 -> 77:2-16",
      "78:2-23 -> 78:2-23",
      "79:2-27 -> 79:2-27",
      "80:0 -> 80:0",
      "82:0 -> 82:0",
      "83:2-32 -> 83:2-32",
      "84:2-34 -> 84:2-34",
      "85:2-22 -> 85:2-22",
      "86:2-17 -> 86:2-17",
      "87:2-22 -> 87:2-22",
      "88:2-22 -> 88:2-22",
      "89:2-16 -> 89:2-16",
      "90:2-11 -> 90:2-11",
      "91:2-12 -> 91:2-12",
      "92:0 -> 92:0",
      "94:0 -> 94:0",
      "95:2-22 -> 95:2-22",
      "96:0 -> 96:0",
      "98:0 -> 98:0",
      "99:2-28 -> 99:2-28",
      "100:2-25 -> 100:2-25",
      "101:2-24 -> 101:2-24",
      "102:0 -> 102:0",
      "104:0 -> 104:0",
      "105:2-15 -> 105:2-15",
      "106:0 -> 106:0",
      "108:0 -> 108:0",
      "109:2-18 -> 109:2-18",
      "110:0 -> 110:0",
      "112:0 -> 112:0",
      "113:2-26 -> 113:2-26",
      "114:0 -> 114:0",
      "116:0 -> 116:0",
      "117:2-14 -> 117:2-14",
      "118:0 -> 118:0",
      "120:0 -> 120:0",
      "121:2-14 -> 121:2-14",
      "122:0 -> 122:0",
      "124:0 -> 124:0",
      "125:2-31 -> 125:2-31",
      "126:2-22 -> 126:2-22",
      "127:0 -> 127:0",
      "129:0 -> 129:0",
      "130:2-26 -> 130:2-26",
      "131:0 -> 131:0",
      "133:0 -> 133:0",
      "134:2-28 -> 134:2-28",
      "135:2-15 -> 135:2-15",
      "136:0 -> 136:0",
      "138:0 -> 138:0",
      "139:2-20 -> 139:2-20",
      "140:0 -> 140:0",
      "142:0 -> 142:0",
      "143:2-11 -> 143:2-11",
      "144:0 -> 144:0",
      "146:0 -> 146:0",
      "147:2-11 -> 147:2-11",
      "148:2-12 -> 148:2-12",
      "149:0 -> 149:0",
      "151:0 -> 151:0",
      "152:2-12 -> 152:2-12",
      "153:0 -> 153:0",
      "155:0 -> 155:0",
      "156:2-11 -> 156:2-11",
      "157:2-12 -> 157:2-12",
      "158:2-18 -> 158:2-18",
      "159:0 -> 159:0",
      "161:0 -> 161:0",
      "162:2-12 -> 162:2-12",
      "163:0 -> 163:0",
      "165:0 -> 165:0",
      "166:2-18 -> 166:2-18",
      "167:0 -> 167:0",
      "169:0 -> 169:0",
      "170:2-12 -> 170:2-12",
      "171:2-16 -> 171:2-16",
      "172:0 -> 172:0",
      "174:0 -> 174:0",
      "175:2-17 -> 175:2-17",
      "176:0 -> 176:0",
      "178:0 -> 178:0",
      "179:2-17 -> 179:2-17",
      "180:0 -> 180:0",
      "182:0 -> 182:0",
      "183:2-24 -> 183:2-24",
      "184:2-16 -> 184:2-16",
      "185:0 -> 185:0",
      "187:0 -> 187:0",
      "188:2-17 -> 188:2-17",
      "189:2-14 -> 189:2-14",
      "190:0 -> 190:0",
      "192:0 -> 192:0",
      "193:2-15 -> 193:2-15",
      "194:0 -> 194:0",
      "196:0 -> 196:0",
      "197:2-26 -> 197:2-26",
      "198:2-26 -> 198:2-26",
      "199:2-21 -> 199:2-21",
      "200:2-21 -> 200:2-21",
      "201:2-16 -> 201:2-16",
      "202:2-16 -> 202:2-16",
      "203:2-16 -> 203:2-16",
      "204:2-17 -> 204:2-17",
      "205:2-17 -> 205:2-17",
      "206:2-14 -> 206:2-14",
      "207:2-14 -> 207:2-14",
      "208:2-19 -> 208:2-19",
      "209:2-40 -> 209:2-40",
      "210:2-31 -> 210:2-31",
      "211:2-30 -> 211:2-30",
      "212:2-29 -> 212:2-29",
      "213:2-16 -> 213:2-16",
      "214:2-21 -> 214:2-21",
      "215:2-23 -> 215:2-23",
      "216:2-24 -> 216:2-24",
      "217:2-25 -> 217:2-25",
      "218:2-19 -> 218:2-19",
      "219:2-29 -> 219:2-29",
      "220:2-30 -> 220:2-30",
      "221:2-28 -> 221:2-28",
      "222:2-36 -> 222:2-36",
      "223:2-29 -> 223:2-29",
      "224:2-24 -> 224:2-24",
      "225:2-32 -> 225:2-32",
      "226:2-13 -> 226:2-13",
      "227:2-19 -> 227:2-19",
      "228:2-17 -> 228:2-17",
      "229:2-18 -> 229:2-18",
      "230:2-19 -> 230:2-19",
      "231:2-15 -> 231:2-15",
      "232:2-17 -> 232:2-17",
      "233:2-14 -> 233:2-14",
      "234:2-20 -> 234:2-20",
      "235:2-22 -> 235:2-22",
      "236:2-28 -> 236:2-28",
      "237:2-26 -> 237:2-26",
      "238:2-27 -> 238:2-27",
      "239:2-28 -> 239:2-28",
      "240:2-24 -> 240:2-24",
      "241:2-25 -> 241:2-25",
      "242:2-26 -> 242:2-26",
      "243:2-23 -> 243:2-23",
      "244:0 -> 244:0",
      "246:0 -> 246:0",
      "247:2-26 -> 247:2-26",
      "248:2-26 -> 248:2-26",
      "249:2-21 -> 249:2-21",
      "250:2-21 -> 250:2-21",
      "251:2-16 -> 251:2-16",
      "252:2-16 -> 252:2-16",
      "253:2-16 -> 253:2-16",
      "254:2-17 -> 254:2-17",
      "255:2-17 -> 255:2-17",
      "256:2-14 -> 256:2-14",
      "257:2-14 -> 257:2-14",
      "258:2-19 -> 258:2-19",
      "259:2-40 -> 259:2-40",
      "260:2-31 -> 260:2-31",
      "261:2-30 -> 261:2-30",
      "262:2-29 -> 262:2-29",
      "263:2-16 -> 263:2-16",
      "264:2-21 -> 264:2-21",
      "265:2-23 -> 265:2-23",
      "266:2-24 -> 266:2-24",
      "267:2-25 -> 267:2-25",
      "268:2-19 -> 268:2-19",
      "269:2-29 -> 269:2-29",
      "270:2-30 -> 270:2-30",
      "271:2-28 -> 271:2-28",
      "272:2-36 -> 272:2-36",
      "273:2-29 -> 273:2-29",
      "274:2-24 -> 274:2-24",
      "275:2-32 -> 275:2-32",
      "276:2-13 -> 276:2-13",
      "277:2-19 -> 277:2-19",
      "278:2-17 -> 278:2-17",
      "279:2-18 -> 279:2-18",
      "280:2-19 -> 280:2-19",
      "281:2-15 -> 281:2-15",
      "282:2-17 -> 282:2-17",
      "283:2-14 -> 283:2-14",
      "284:2-20 -> 284:2-20",
      "285:2-22 -> 285:2-22",
      "286:2-28 -> 286:2-28",
      "287:2-26 -> 287:2-26",
      "288:2-27 -> 288:2-27",
      "289:2-28 -> 289:2-28",
      "290:2-24 -> 290:2-24",
      "291:2-25 -> 291:2-25",
      "292:2-26 -> 292:2-26",
      "293:2-23 -> 293:2-23",
      "294:0 -> 294:0",
      "296:0 -> 296:0",
      "297:2-26 -> 297:2-26",
      "298:2-26 -> 298:2-26",
      "299:2-21 -> 299:2-21",
      "300:2-21 -> 300:2-21",
      "301:2-16 -> 301:2-16",
      "302:2-16 -> 302:2-16",
      "303:2-16 -> 303:2-16",
      "304:2-17 -> 304:2-17",
      "305:2-17 -> 305:2-17",
      "306:2-14 -> 306:2-14",
      "307:2-14 -> 307:2-14",
      "308:2-19 -> 308:2-19",
      "309:2-40 -> 309:2-40",
      "310:2-31 -> 310:2-31",
      "311:2-30 -> 311:2-30",
      "312:2-29 -> 312:2-29",
      "313:2-16 -> 313:2-16",
      "314:2-21 -> 314:2-21",
      "315:2-23 -> 315:2-23",
      "316:2-24 -> 316:2-24",
      "317:2-25 -> 317:2-25",
      "318:2-19 -> 318:2-19",
      "319:2-29 -> 319:2-29",
      "320:2-30 -> 320:2-30",
      "321:2-28 -> 321:2-28",
      "322:2-36 -> 322:2-36",
      "323:2-29 -> 323:2-29",
      "324:2-24 -> 324:2-24",
      "325:2-32 -> 325:2-32",
      "326:2-13 -> 326:2-13",
      "327:2-19 -> 327:2-19",
      "328:2-17 -> 328:2-17",
      "329:2-18 -> 329:2-18",
      "330:2-19 -> 330:2-19",
      "331:2-15 -> 331:2-15",
      "332:2-17 -> 332:2-17",
      "333:2-14 -> 333:2-14",
      "334:2-20 -> 334:2-20",
      "335:2-22 -> 335:2-22",
      "336:2-28 -> 336:2-28",
      "337:2-26 -> 337:2-26",
      "338:2-27 -> 338:2-27",
      "339:2-28 -> 339:2-28",
      "340:2-24 -> 340:2-24",
      "341:2-25 -> 341:2-25",
      "342:2-26 -> 342:2-26",
      "343:2-23 -> 343:2-23",
      "344:0 -> 344:0",
    ]
  `)
})

test('utilities have source maps', async () => {
  let config = {
    content: [{ raw: `text-red-500` }],
  }

  let input = css`
    @tailwind utilities;
  `

  let result = await run(input, config)
  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')
  expect(sources.length).toBe(2)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:4 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-22 -> 3:2-22",
      "4:2-48 -> 4:2-48",
      "5:0 -> 5:0",
    ]
  `)
})

test('components have source maps', async () => {
  let config = {
    content: [{ raw: `container` }],
  }

  let input = css`
    @tailwind components;
  `

  let result = await run(input, config)
  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')
  expect(sources.length).toBe(2)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:4 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-13 -> 3:2-13",
      "4:0 -> 4:0",
      "6:0 -> 6:0",
      "7:2 -> 7:2",
      "8:4-20 -> 8:4-20",
      "9:2 -> 9:2",
      "10:0 -> 10:0",
      "12:0 -> 12:0",
      "13:2 -> 13:2",
      "14:4-20 -> 14:4-20",
      "15:2 -> 15:2",
      "16:0 -> 16:0",
      "18:0 -> 18:0",
      "19:2 -> 19:2",
      "20:4-21 -> 20:4-21",
      "21:2 -> 21:2",
      "22:0 -> 22:0",
      "24:0 -> 24:0",
      "25:2 -> 25:2",
      "26:4-21 -> 26:4-21",
      "27:2 -> 27:2",
      "28:0 -> 28:0",
      "30:0 -> 30:0",
      "31:2 -> 31:2",
      "32:4-21 -> 32:4-21",
      "33:2 -> 33:2",
      "34:0 -> 34:0",
    ]
  `)
})

test('source maps for layer rules are not rewritten to point to @tailwind directives', async () => {
  let config = {
    content: [{ raw: `font-normal foo hover:foo` }],
  }

  let utilitiesFile = postcss.parse(
    css`
      @tailwind utilities;
    `,
    { from: 'components.css', map: { prev: map } }
  )

  let mainCssFile = postcss.parse(
    css`
      @layer utilities {
        .foo {
          background-color: red;
        }
      }
    `,
    { from: 'input.css', map: { prev: map } }
  )

  // Just pretend that there's an @import in `mainCssFile` that imports the nodes from `utilitiesFile`
  let input = postcss.root({
    nodes: [...utilitiesFile.nodes, ...mainCssFile.nodes],
    source: mainCssFile.source,
  })

  let result = await run(input, config)

  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')

  // And we should see that the source map for the layer rule is not rewritten
  // to point to the @tailwind directive but instead points to the original
  expect(sources.length).toBe(2)
  expect(sources).toMatchInlineSnapshot(`
    [
      "components.css",
      "source-maps.test.js%3Ftest=c291cmNlIG1hcHMgZm9yIGxheWVyIHJ1bGVzIGFyZSBub3QgcmV3cml0dGVuIHRvIHBvaW50IHRvIEB0YWlsd2luZCBkaXJlY3RpdmVz",
    ]
  `)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:6 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-18 -> 3:2-18",
      "4:0 -> 4:0",
      "6:0 -> 6:0",
      "7:2-23 -> 7:2-23",
      "8:0 -> 8:0",
    ]
  `)
})

test('it handles `map: true` correctly', async () => {
  let config = {
    content: [{ raw: `text-red-500` }],
  }

  let input = css`
    @tailwind utilities;
  `

  let result = await run(input, config, {
    map: true,
  })
  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')
  expect(sources.length).toBe(2)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:4 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-22 -> 3:2-22",
      "4:2-48 -> 4:2-48",
      "5:0 -> 5:0",
    ]
  `)
})

test('it handles `map: { inline: true }` correctly', async () => {
  let config = {
    content: [{ raw: `text-red-500` }],
  }

  let input = css`
    @tailwind utilities;
  `

  let result = await run(input, config, {
    map: {
      inline: true,
    },
  })
  let { sources, annotations } = parseSourceMaps(result)

  // All CSS generated by Tailwind CSS should be annotated with source maps
  // And always be able to point to the original source file
  expect(sources).not.toContain('<no source>')
  expect(sources.length).toBe(2)

  expect(annotations).toMatchInlineSnapshot(`
    [
      "2:4 -> 1:0-65",
      "2:0 -> 2:0",
      "3:2-22 -> 3:2-22",
      "4:2-48 -> 4:2-48",
      "5:0 -> 5:0",
    ]
  `)
})
