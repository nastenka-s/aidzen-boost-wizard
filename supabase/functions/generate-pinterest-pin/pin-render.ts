// Draws the pin from editable fields: all Cyrillic text, formulas, dates, tables and
// zodiac symbols are typeset here, never painted by an image model.
import satori from "npm:satori@0.12.2";
import { initWasm, Resvg } from "npm:@resvg/resvg-wasm@2.6.2";
import * as F from "./pin-fonts.ts";
import { calendarSizing, gridSizing, schemeSizing, tableSizing, titleSize as titleFontSize, ELEMENTS, PIN_HEIGHT, PIN_WIDTH, PLANET_GLYPHS, SIGN_GLYPHS, pinPalette, type Palette, type PinSpec } from "./pin-spec.ts";

type Node = { type: string; props: Record<string, unknown> } | string | null | false | undefined | "";
const h = (type: string, props: Record<string, unknown> = {}, ...children: (Node | Node[])[]): Node => ({ type, props: { ...props, children: children.flat().filter(Boolean) } });
const box = (style: Record<string, unknown>, ...children: (Node | Node[])[]) => h("div", { style: { display: "flex", ...style } }, ...children);
const bytes = (b64: string) => Uint8Array.from(atob(b64), c => c.charCodeAt(0));
const fonts = [
  // Cyrillic and Latin subsets carry distinct names: the family list below makes
  // digits and punctuation fall through to the Latin file.
  { name: "PlayfairC", data: bytes(F.playfairCyr), weight: 700, style: "normal" }, { name: "PlayfairL", data: bytes(F.playfairLat), weight: 700, style: "normal" },
  { name: "ManropeC", data: bytes(F.manropeCyr500), weight: 500, style: "normal" }, { name: "ManropeL", data: bytes(F.manropeLat500), weight: 500, style: "normal" },
  { name: "ManropeC", data: bytes(F.manropeCyr800), weight: 800, style: "normal" }, { name: "ManropeL", data: bytes(F.manropeLat800), weight: 800, style: "normal" },
  { name: "Symbols", data: bytes(F.symbols), weight: 400, style: "normal" },
];
const glyph = (name: string) => SIGN_GLYPHS[name.trim()] ?? PLANET_GLYPHS[name.trim()] ?? "";
const sym = (text: string, size: number, color: string) => box({ fontFamily: "Symbols", fontSize: size, color, lineHeight: 1 }, text);

function stars(p: Palette): Node {
  // Deterministic sparse decoration kept to the outer margins, away from text.
  const dots: Node[] = [];
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 46; i++) {
    const edge = rnd() < 0.5;
    const x = edge ? (rnd() < 0.5 ? 14 + rnd() * 30 : PIN_WIDTH - 44 + rnd() * 30) : rnd() * PIN_WIDTH;
    const y = edge ? rnd() * PIN_HEIGHT : (rnd() < 0.5 ? 12 + rnd() * 26 : PIN_HEIGHT - 38 + rnd() * 26);
    dots.push(h("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: (1 + rnd() * 2.2).toFixed(1), fill: p.accent, opacity: (0.35 + rnd() * 0.5).toFixed(2) }));
  }
  return h("svg", { width: PIN_WIDTH, height: PIN_HEIGHT, viewBox: `0 0 ${PIN_WIDTH} ${PIN_HEIGHT}`, style: { position: "absolute", top: 0, left: 0 } }, ...dots);
}
function moonIcon(label: string, p: Palette, size = 54): Node {
  const l = label.toLowerCase();
  const r = size / 2 - 3, c = size / 2;
  const light = p.accent, dark = p.dark ? "#050A24" : "#D8D2C6";
  let inner: Node[];
  if (/новолун/.test(l)) inner = [h("circle", { cx: c, cy: c, r, fill: dark, stroke: light, "stroke-width": 3 })];
  else if (/полнолун/.test(l)) inner = [h("circle", { cx: c, cy: c, r, fill: light })];
  else if (/перв\S* четверт|растущ/.test(l)) inner = [h("circle", { cx: c, cy: c, r, fill: dark, stroke: light, "stroke-width": 3 }), h("path", { d: `M${c} ${c - r} A${r} ${r} 0 0 1 ${c} ${c + r} Z`, fill: light })];
  else if (/последн\S* четверт|убывающ/.test(l)) inner = [h("circle", { cx: c, cy: c, r, fill: dark, stroke: light, "stroke-width": 3 }), h("path", { d: `M${c} ${c - r} A${r} ${r} 0 0 0 ${c} ${c + r} Z`, fill: light })];
  else inner = [h("path", { d: `M${c} ${c - r} L${c + r * 0.28} ${c - r * 0.28} L${c + r} ${c} L${c + r * 0.28} ${c + r * 0.28} L${c} ${c + r} L${c - r * 0.28} ${c + r * 0.28} L${c - r} ${c} L${c - r * 0.28} ${c - r * 0.28} Z`, fill: light })];
  return h("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, style: { flexShrink: 0 } }, ...inner);
}
const card = (p: Palette, style: Record<string, unknown>, ...children: (Node | Node[])[]) => box({ backgroundColor: p.card, borderRadius: 26, border: `2px solid ${p.line}`, ...style }, ...children);

function groups(spec: PinSpec, p: Palette): Node {
  return box({ flexDirection: "column", gap: 20, flexGrow: 1, justifyContent: "center" }, ...spec.groups!.map(g => {
    const e = ELEMENTS[g.element];
    return card(p, { flexDirection: "column", padding: "22px 30px", borderLeft: `14px solid ${e.color}` },
      box({ alignItems: "center", gap: 18, flexWrap: "wrap" },
        box({ fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 38, color: e.color, textTransform: "uppercase", letterSpacing: 2 }, e.label),
        ...e.signs.map(s => box({ alignItems: "center", gap: 8, fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 31, color: p.text }, sym(SIGN_GLYPHS[s], 36, e.color), s))),
      box({ fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: 33, lineHeight: 1.3, color: p.text, marginTop: 10 }, g.text));
  }));
}
function table(spec: PinSpec, p: Palette): Node {
  const t = spec.table!;
  const n = t.rows.length;
  const { size, pad } = tableSizing(n);
  const wide = Math.max(...t.rows.map(r => r.key.trim().length)) > 5;
  return box({ flexDirection: "column", flexGrow: 1, gap: 18 },
    (t.formula || t.example) && card(p, { flexDirection: "column", padding: "18px 28px", gap: 6 },
      t.formula && box({ fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 32, lineHeight: 1.25, color: p.text }, t.formula),
      t.example && box({ fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: 30, lineHeight: 1.25, color: p.muted }, `Пример: ${t.example}`)),
    box({ fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 27, color: p.accent, textTransform: "uppercase", letterSpacing: 2 }, t.key_label),
    card(p, { flexDirection: "column", padding: "6px 26px", flexGrow: 1, justifyContent: "space-around" }, ...t.rows.map((r, i) =>
      box({ alignItems: "center", gap: 22, padding: `${pad}px 0`, borderTop: i ? `1.5px solid ${p.line}` : "none" },
        box({ width: wide ? 250 : 120, flexShrink: 0, justifyContent: wide ? "flex-start" : "center", fontFamily: wide ? "ManropeC, ManropeL" : "PlayfairC, PlayfairL", fontWeight: wide ? 800 : 700, fontSize: wide ? size : size + 14, color: p.accent, lineHeight: 1.1 }, r.key.trim()),
        box({ flexGrow: 1, flexShrink: 1, fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: size, lineHeight: 1.25, color: p.text }, r.text)))));
}
function calendar(spec: PinSpec, p: Palette): Node {
  const c = spec.calendar!;
  const n = c.rows.length;
  const { size, pad } = calendarSizing(n);
  return box({ flexDirection: "column", flexGrow: 1, gap: 18 },
    box({ justifyContent: "center", fontFamily: "PlayfairC, PlayfairL", fontWeight: 700, fontSize: 92, color: p.accent, lineHeight: 1.05, textAlign: "center" }, c.period),
    card(p, { flexDirection: "column", padding: "6px 28px", flexGrow: 1, justifyContent: "space-around" }, ...c.rows.map((r, i) =>
      box({ alignItems: "center", gap: 22, padding: `${pad}px 0`, borderTop: i ? `1.5px solid ${p.line}` : "none" },
        moonIcon(r.label, p),
        box({ width: 250, flexShrink: 0, fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: size, color: p.accent, lineHeight: 1.15 }, r.date),
        box({ flexGrow: 1, flexShrink: 1, fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: size, lineHeight: 1.25, color: p.text }, r.label)))));
}
function grid(spec: PinSpec, p: Palette): Node {
  const cells = spec.grid!.cells;
  const rows = Math.ceil(cells.length / 2);
  const { size, pad } = gridSizing(rows);
  const lines: Node[] = [];
  for (let i = 0; i < cells.length; i += 2) lines.push(box({ gap: 18, flexGrow: 1 }, ...cells.slice(i, i + 2).map(cell =>
    card(p, { width: 442, flexDirection: "column", justifyContent: "center", padding: `${pad}px 22px`, borderRadius: 22 },
      box({ alignItems: "center", gap: 12, fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: size + 5, color: p.accent }, glyph(cell.name) && sym(glyph(cell.name), size + 10, p.accent), cell.name),
      box({ fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: size, lineHeight: 1.22, color: p.text, marginTop: 4 }, cell.text)))));
  return box({ flexDirection: "column", gap: 16, flexGrow: 1 }, ...lines);
}
const MARK = ["#F2665A", "#F2C14E", "#5BC0A8", "#5AA9F0", "#C58BF2"];
function matrixDiagram(points: string[], p: Palette, size: number): Node {
  const c = size / 2, r = c - 40, d = r * Math.SQRT1_2;
  const pos: Record<string, [number, number]> = { center: [c, c], left: [c - r, c], top: [c, c - r], right: [c + r, c], bottom: [c, c + r], "top-left": [c - d, c - d], "top-right": [c + d, c - d], "bottom-right": [c + d, c + d], "bottom-left": [c - d, c + d] };
  const poly = (keys: string[]) => keys.map(k => pos[k].join(",")).join(" ");
  const items: Node[] = [
    h("circle", { cx: c, cy: c, r, fill: "none", stroke: p.line, "stroke-width": 2 }),
    h("polygon", { points: poly(["left", "top", "right", "bottom"]), fill: "none", stroke: p.accent, "stroke-width": 3 }),
    h("polygon", { points: poly(["top-left", "top-right", "bottom-right", "bottom-left"]), fill: "none", stroke: p.muted, "stroke-width": 3 }),
    h("line", { x1: c - r, y1: c, x2: c + r, y2: c, stroke: p.line, "stroke-width": 2 }), h("line", { x1: c, y1: c - r, x2: c, y2: c + r, stroke: p.line, "stroke-width": 2 }),
  ];
  for (const [key, [x, y]] of Object.entries(pos)) if (!points.includes(key)) items.push(h("circle", { cx: x, cy: y, r: 15, fill: p.dark ? "#2A2838" : "#FFFFFF", stroke: p.muted, "stroke-width": 2 }));
  const labels: Node[] = [];
  points.forEach((key, i) => {
    const [x, y] = pos[key];
    items.push(h("circle", { cx: x, cy: y, r: 31, fill: MARK[i % MARK.length], stroke: p.dark ? "#0D0D14" : "#FFFFFF", "stroke-width": 4 }));
    labels.push(box({ position: "absolute", left: x - 31, top: y - 31, width: 62, height: 62, alignItems: "center", justifyContent: "center", fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 34, color: "#14121C" }, String(i + 1)));
  });
  return box({ position: "relative", width: size, height: size, flexShrink: 0 }, h("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}` }, ...items), ...labels);
}
function wheelDiagram(points: string[], p: Palette, size: number): Node {
  const c = size / 2, R = c - 20, r = R * 0.45;
  const xy = (deg: number, rad: number): [number, number] => [c + rad * Math.cos(deg * Math.PI / 180), c - rad * Math.sin(deg * Math.PI / 180)];
  const items: Node[] = [];
  const labels: Node[] = [];
  // House 1 starts at the left horizon and houses run counter-clockwise, as on a chart wheel.
  for (let house = 1; house <= 12; house++) {
    const a0 = 180 + (house - 1) * 30, a1 = a0 + 30;
    const [x0, y0] = xy(a0, R), [x1, y1] = xy(a1, R), [x2, y2] = xy(a1, r), [x3, y3] = xy(a0, r);
    const index = points.indexOf(String(house));
    items.push(h("path", { d: `M${x0} ${y0} A${R} ${R} 0 0 0 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 0 1 ${x3} ${y3} Z`, fill: index >= 0 ? MARK[index % MARK.length] : "none", stroke: p.accent, "stroke-width": 2.5 }));
    const [lx, ly] = xy(a0 + 15, (R + r) / 2);
    labels.push(box({ position: "absolute", left: lx - 30, top: ly - 24, width: 60, height: 48, alignItems: "center", justifyContent: "center", fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 32, color: index >= 0 ? "#14121C" : p.muted }, String(house)));
  }
  return box({ position: "relative", width: size, height: size, flexShrink: 0 }, h("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}` }, ...items), ...labels);
}
function scheme(spec: PinSpec, p: Palette): Node {
  const s = spec.scheme!;
  const points = s.rows.map(r => r.point);
  return box({ flexDirection: "column", flexGrow: 1, gap: 18, alignItems: "center" },
    s.diagram === "matrix" ? matrixDiagram(points, p, schemeSizing(s.rows.length).diagram) : wheelDiagram(points, p, schemeSizing(s.rows.length).diagram),
    box({ flexDirection: "column", gap: 12, width: "100%", flexGrow: 1, justifyContent: "center" }, ...s.rows.map((r, i) =>
      card(p, { alignItems: "center", gap: 20, padding: "12px 22px", borderRadius: 20 },
        box({ width: 58, height: 58, borderRadius: 29, flexShrink: 0, backgroundColor: MARK[i % MARK.length], alignItems: "center", justifyContent: "center", fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 30, color: "#14121C" }, s.diagram === "matrix" ? String(i + 1) : r.point),
        box({ flexDirection: "column", flexGrow: 1, flexShrink: 1 },
          box({ fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 31, color: p.accent, lineHeight: 1.15 }, r.name),
          box({ fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: 29, color: p.text, lineHeight: 1.22 }, r.text))))));
}
export function pinTree(spec: PinSpec): Node {
  const p = pinPalette(spec);
  const content = { groups, table, calendar, grid, scheme }[spec.layout](spec, p);
  const titleSize = titleFontSize(spec.title);
  return box({ width: PIN_WIDTH, height: PIN_HEIGHT, position: "relative", backgroundImage: `linear-gradient(160deg, ${p.bg[0]}, ${p.bg[1]})` },
    stars(p),
    box({ position: "absolute", top: 46, left: 46, right: 46, bottom: 46, flexDirection: "column", padding: "0 6px" },
      box({ flexShrink: 0, justifyContent: "center", textAlign: "center", fontFamily: "PlayfairC, PlayfairL", fontWeight: 700, fontSize: titleSize, lineHeight: 1.08, color: p.text, marginTop: 8 }, spec.title),
      box({ flexShrink: 0, alignItems: "center", justifyContent: "center", gap: 18, margin: "16px 0 4px" }, box({ width: 150, height: 2, backgroundColor: p.line }), h("svg", { width: 26, height: 26, viewBox: "0 0 26 26" }, h("path", { d: "M13 0 L17 9 L26 13 L17 17 L13 26 L9 17 L0 13 L9 9 Z", fill: p.accent })), box({ width: 150, height: 2, backgroundColor: p.line })),
      box({ flexShrink: 0, justifyContent: "center", textAlign: "center", fontFamily: "ManropeC, ManropeL", fontWeight: 500, fontSize: 33, lineHeight: 1.25, color: p.muted, margin: "6px 20px 24px" }, spec.hint),
      content,
      box({ flexShrink: 0, flexDirection: "column", alignItems: "center", marginTop: 22, gap: 8 },
        box({ backgroundColor: p.accent, color: p.dark ? "#16121F" : "#FFFFFF", borderRadius: 44, padding: "16px 40px", fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 34, textAlign: "center" }, spec.cta),
        box({ fontFamily: "ManropeC, ManropeL", fontWeight: 800, fontSize: 24, letterSpacing: 4, color: p.muted, textTransform: "uppercase" }, "Нейродзен"))));
}
let ready: Promise<unknown> | null = null;
export async function renderPinSvg(spec: PinSpec): Promise<string> {
  // deno-lint-ignore no-explicit-any
  return await satori(pinTree(spec) as any, { width: PIN_WIDTH, height: PIN_HEIGHT, fonts: fonts as any });
}
export async function renderPinPng(spec: PinSpec, wasm: () => Promise<ArrayBuffer | Uint8Array | Response>): Promise<Uint8Array> {
  const svg = await renderPinSvg(spec);
  ready ??= wasm().then(source => initWasm(source as ArrayBuffer));
  await ready;
  const png = new Resvg(svg, { fitTo: { mode: "width", value: PIN_WIDTH } }).render().asPng();
  // PNG signature plus exact 1000x1500 dimensions, so a broken render is never published.
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  if (view.getUint32(0) !== 0x89504e47 || view.getUint32(16) !== PIN_WIDTH || view.getUint32(20) !== PIN_HEIGHT) throw new Error("Pin render produced an invalid image");
  return png;
}
