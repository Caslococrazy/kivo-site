"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export interface ChartScenario {
  r: number;
  label: string;
  payback: string;
  miles: [number, string][];
}

export interface InvestOption {
  level: number;
  label: string;
}

export interface GrowthChartProps {
  scenarios?: Record<number, ChartScenario>;
  defaultLevel?: number;
  baseGrowth?: number;
  months?: string[];
  showInvestSelector?: boolean;
  investOptions?: InvestOption[];
  caption?: string;
  className?: string;
}

const DEFAULT_MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const DEFAULT_SCENARIOS: Record<number, ChartScenario> = {
  1: {
    r: 1.145,
    label: "+240%",
    payback: "mês 4",
    miles: [
      [3, "Payback"],
      [6, "Escala validada"],
      [10, "Melhor mês histórico"],
    ],
  },
  2: {
    r: 1.185,
    label: "+540%",
    payback: "mês 3",
    miles: [
      [2, "Payback"],
      [5, "Escala validada"],
      [9, "Melhor mês histórico"],
    ],
  },
  3: {
    r: 1.235,
    label: "+1.150%",
    payback: "mês 2",
    miles: [
      [1, "Payback"],
      [4, "Escala validada"],
      [7, "Melhor mês histórico"],
    ],
  },
};

const DEFAULT_INVEST_OPTIONS: InvestOption[] = [
  { level: 1, label: "R$ 5 mil/mês" },
  { level: 2, label: "R$ 15 mil/mês" },
  { level: 3, label: "R$ 40 mil/mês" },
];

const W = 1000;
const H = 400;
const PL = 52;
const PR = 110;
const PT = 40;
const PB = 40;
const IW = W - PL - PR;
const IH = H - PT - PB;

type XY = [number, number];

function series(r: number, months: number): number[] {
  const p: number[] = [];
  let v = 100;
  for (let i = 0; i < months; i++) {
    p.push(v);
    v *= r;
  }
  return p;
}

function toXY(pts: number[], maxV: number, count: number): XY[] {
  return pts.map((v, i) => [PL + (i / (count - 1)) * IW, PT + IH - (v / maxV) * IH]);
}

function smoothPath(xy: XY[]): string {
  let d = `M ${xy[0][0]} ${xy[0][1]}`;
  for (let i = 1; i < xy.length; i++) {
    const [x0, y0] = xy[i - 1];
    const [x1, y1] = xy[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

const fx = (v: number) =>
  (v / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + "x";

export default function GrowthChart({
  scenarios = DEFAULT_SCENARIOS,
  defaultLevel = 2,
  baseGrowth = 1.011,
  months = DEFAULT_MONTHS,
  showInvestSelector = true,
  investOptions = DEFAULT_INVEST_OPTIONS,
  caption = "Projeção ilustrativa · 12 meses · receita indexada (início = 1x) · curva composta baseada em contas reais",
  className = "",
}: GrowthChartProps) {
  const count = months.length;

  const [level, setLevel] = useState(defaultLevel);
  const [payback, setPayback] = useState(scenarios[defaultLevel]?.payback ?? "");
  const [kivoD, setKivoD] = useState("");
  const [baseD, setBaseD] = useState("");
  const [areaD, setAreaD] = useState("");
  const [pathLength, setPathLength] = useState(0);
  const [pathVisible, setPathVisible] = useState(false);
  const [yAxisTicks, setYAxisTicks] = useState<{ y: number; v: string }[]>([]);
  const [endDotK, setEndDotK] = useState<XY>([0, 0]);
  const [endDotB, setEndDotB] = useState<XY>([0, 0]);
  const [badgePos, setBadgePos] = useState({ g: { left: 0, top: 0 }, x: { left: 0, top: 0 } });
  const [badgeLabel, setBadgeLabel] = useState(scenarios[defaultLevel]?.label ?? "");
  const [badgeXLabel, setBadgeXLabel] = useState("");
  const [milesData, setMilesData] = useState<
    { x: number; y: number; ly: number; label: string; month: string }[]
  >([]);
  const [milesVisible, setMilesVisible] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const [tipData, setTipData] = useState({ month: "", kivo: "", base: "" });
  const [tipPos, setTipPos] = useState({ left: 0, top: 0 });
  const [tipLineX, setTipLineX] = useState(0);

  const svgRef = useRef<SVGSVGElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const kivoPathRef = useRef<SVGPathElement>(null);
  const dataRef = useRef<{ xyK: XY[]; xyB: XY[]; kivo: number[]; org: number[] } | null>(null);
  const drawnRef = useRef(false);
  const reducedRef = useRef(false);
  const pendingAnimateRef = useRef(false);

  const computeAndSetPaths = useCallback(
    (lvl: number, animate: boolean) => {
      const sc = scenarios[lvl];
      if (!sc) return;
      const kivo = series(sc.r, count);
      const org = series(baseGrowth, count);
      const maxV = kivo[count - 1] * 1.12;
      const xyK = toXY(kivo, maxV, count);
      const xyB = toXY(org, maxV, count);
      dataRef.current = { xyK, xyB, kivo, org };

      const dK = smoothPath(xyK);
      const dB = smoothPath(xyB);
      const dArea = `${dK} L ${xyK[count - 1][0]} ${PT + IH} L ${xyK[0][0]} ${PT + IH} Z`;

      setKivoD(dK);
      setBaseD(dB);
      setAreaD(dArea);
      setEndDotK(xyK[count - 1]);
      setEndDotB(xyB[count - 1]);

      setBadgeLabel(sc.label);
      setBadgeXLabel(
        `${org[count - 1] >= org[0] ? "+" : ""}${Math.round(
          ((org[count - 1] - org[0]) / org[0]) * 100
        )}%`
      );
      setPayback(sc.payback);

      const ticks = [];
      for (let i = 0; i < 5; i++) {
        const y = PT + (i / 4) * IH;
        const v = maxV * (1 - i / 4);
        ticks.push({ y, v: fx(v) });
      }
      setYAxisTicks(ticks);

      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const sx = rect.width / W;
        const sy = rect.height / H;
        setBadgePos({
          g: { left: xyK[count - 1][0] * sx, top: xyK[count - 1][1] * sy },
          x: { left: xyB[count - 1][0] * sx, top: xyB[count - 1][1] * sy },
        });
      }

      const miles = sc.miles.map(([m, label], idx) => {
        const [x, y] = xyK[m];
        const ly = y - (idx % 2 === 0 ? 28 : 48);
        return { x, y, ly, label, month: months[m] };
      });

      setTipVisible(false);

      const reduced = reducedRef.current;

      if (animate && !reduced) {
        setPathVisible(false);
        setMilesVisible(false);
        setMilesData(miles);
        pendingAnimateRef.current = true;
      } else {
        setMilesData(miles);
        setMilesVisible(true);
        setPathVisible(true);
        pendingAnimateRef.current = false;
      }
    },
    [scenarios, baseGrowth, count, months]
  );

  // measure path length whenever the path 'd' changes, then kick off the
  // draw-in animation if one was requested
  useLayoutEffect(() => {
    if (!kivoPathRef.current || !kivoD) return;
    const len = kivoPathRef.current.getTotalLength();
    setPathLength(len);

    if (pendingAnimateRef.current) {
      pendingAnimateRef.current = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPathVisible(true);
          setMilesVisible(true);
        });
      });
    }
  }, [kivoD]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    computeAndSetPaths(level, false);
    if (reducedRef.current) {
      drawnRef.current = true;
    }

    const box = boxRef.current;
    if (!box) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !drawnRef.current) {
            drawnRef.current = true;
            computeAndSetPaths(level, true);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(box);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLevelChange = (lvl: number) => {
    if (lvl === level) return;
    setLevel(lvl);
    computeAndSetPaths(lvl, true);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGRectElement>) => {
    const data = dataRef.current;
    const svg = svgRef.current;
    if (!data || !svg) return;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) * (W / rect.width);
    let i = Math.round(((px - PL) / IW) * (count - 1));
    i = Math.max(0, Math.min(count - 1, i));
    const [kx, ky] = data.xyK[i];
    const [, by] = data.xyB[i];

    const sx = rect.width / W;
    const sy = rect.height / H;

    setTipLineX(kx);
    setTipData({
      month: months[i],
      kivo: fx(data.kivo[i]),
      base: fx(data.org[i]),
    });
    setTipPos({ left: kx * sx, top: Math.min(ky, by) * sy });
    setTipVisible(true);
  };

  const handlePointerLeave = () => setTipVisible(false);

  useEffect(() => {
    const onResize = () => {
      const data = dataRef.current;
      const svg = svgRef.current;
      if (!data || !svg) return;
      const rect = svg.getBoundingClientRect();
      const sx = rect.width / W;
      const sy = rect.height / H;
      setBadgePos({
        g: { left: data.xyK[count - 1][0] * sx, top: data.xyK[count - 1][1] * sy },
        x: { left: data.xyB[count - 1][0] * sx, top: data.xyB[count - 1][1] * sy },
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [count]);

  return (
    <div className={className}>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="flex gap-7">
          <div className="flex items-center gap-2 text-[13.5px] text-muted">
            <span className="h-[9px] w-[9px] rounded-full bg-green" /> Com a
            Kivo
          </div>
          <div className="flex items-center gap-2 text-[13.5px] text-muted">
            <span className="h-[9px] w-[9px] rounded-full bg-blue" /> Sem
            tráfego pago
          </div>
        </div>
        {showInvestSelector && (
          <div
            className="flex gap-6"
            role="group"
            aria-label="Investimento mensal simulado"
          >
            {investOptions.map((opt) => (
              <button
                key={opt.level}
                type="button"
                onClick={() => handleLevelChange(opt.level)}
                className={`num border-b-2 pb-1.5 text-[13.5px] transition-colors ${
                  level === opt.level
                    ? "border-green text-ink"
                    : "border-transparent text-faint hover:text-muted"
                }`}
                aria-pressed={level === opt.level}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative" ref={boxRef}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Gráfico comparando crescimento de receita com e sem tráfego pago ao longo de 12 meses, com marcos de payback e escala"
        >
          <defs>
            <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CBF000" stopOpacity=".14" />
              <stop offset="100%" stopColor="#CBF000" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g>
            {[0, 1, 2, 3, 4].map((i) => {
              const y = PT + (i / 4) * IH;
              return (
                <line
                  key={i}
                  x1={PL}
                  y1={y}
                  x2={W - PR}
                  y2={y}
                  stroke="rgba(255,255,255,.05)"
                  strokeWidth={1}
                />
              );
            })}
          </g>

          <g>
            {yAxisTicks.map((t, i) => (
              <text
                key={i}
                className="axis-label"
                x={PL - 12}
                y={t.y + 4}
                textAnchor="end"
              >
                {t.v}
              </text>
            ))}
          </g>

          <path
            d={areaD}
            fill="url(#areaG)"
            style={{ opacity: pathVisible ? 1 : 0, transition: "opacity .9s ease .8s" }}
          />
          <path d={baseD} fill="none" stroke="#4C8DFF" strokeWidth={2.5} strokeLinecap="round" />
          <path
            ref={kivoPathRef}
            d={kivoD}
            fill="none"
            stroke="#CBF000"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: pathVisible ? 0 : pathLength,
              transition: "stroke-dashoffset 1.6s cubic-bezier(.6,0,.2,1)",
            }}
          />

          <g>
            {milesData.map((m, idx) => (
              <g
                key={idx}
                style={{
                  opacity: milesVisible ? 1 : 0,
                  transition: `opacity .5s ease ${1.2 + idx * 0.25}s`,
                }}
              >
                <line className="mile-line" x1={m.x} y1={m.y - 8} x2={m.x} y2={m.ly + 6} />
                <circle cx={m.x} cy={m.y} r={4} fill="#060907" stroke="#CBF000" strokeWidth={2} />
                <text className="mile-label" x={m.x} y={m.ly} textAnchor="middle">
                  {m.label} · {m.month}
                </text>
              </g>
            ))}
          </g>

          <circle
            cx={endDotK[0]}
            cy={endDotK[1]}
            r={5}
            fill="#CBF000"
            style={{ opacity: pathVisible ? 1 : 0, transition: "opacity .4s ease 1.4s" }}
          />
          <circle cx={endDotB[0]} cy={endDotB[1]} r={4} fill="#4C8DFF" />

          <g style={{ opacity: tipVisible ? 1 : 0 }}>
            <line x1={tipLineX} y1={40} x2={tipLineX} y2={360} stroke="rgba(255,255,255,.18)" strokeWidth={1} />
          </g>

          <g>
            {months.map((m, i) => {
              const x = PL + (i / (count - 1)) * IW;
              return (
                <text key={m} className="axis-label" x={x} y={H - 8} textAnchor="middle">
                  {m}
                </text>
              );
            })}
          </g>

          <rect
            x={0}
            y={0}
            width={W}
            height={H}
            fill="transparent"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          />
        </svg>

        <div
          className="pointer-events-none absolute whitespace-nowrap font-num text-base font-medium text-green"
          style={{
            left: badgePos.g.left,
            top: badgePos.g.top,
            transform: "translate(-100%,-140%)",
            transition: "left 1.2s cubic-bezier(.6,0,.2,1), top 1.2s cubic-bezier(.6,0,.2,1)",
          }}
        >
          {badgeLabel}
        </div>
        <div
          className="pointer-events-none absolute whitespace-nowrap font-num text-sm text-blue"
          style={{
            left: badgePos.x.left,
            top: badgePos.x.top,
            transform: "translate(-100%,-140%)",
          }}
        >
          {badgeXLabel}
        </div>

        <div
          className="pointer-events-none absolute z-10 rounded-[10px] border border-hair bg-[rgba(10,16,12,.92)] px-3.5 py-2.5 text-[12.5px] transition-opacity duration-150"
          style={{
            left: tipPos.left,
            top: tipPos.top,
            transform: "translate(-50%,-115%)",
            opacity: tipVisible ? 1 : 0,
          }}
        >
          <div className="mb-1 font-num text-[11px] text-faint">{tipData.month}</div>
          <div className="flex items-center gap-2">
            <span className="h-[9px] w-[9px] rounded-full bg-green" />
            <span>Com a Kivo</span>
            <span className="num text-ink">{tipData.kivo}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-[9px] w-[9px] rounded-full bg-blue" />
            <span>Sem tráfego</span>
            <span className="num text-ink">{tipData.base}</span>
          </div>
        </div>
      </div>

      <div className="mt-9 flex flex-wrap justify-between gap-3 text-[13px] text-faint">
        <span>{caption}</span>
        <span>
          Payback médio: <b className="font-medium text-muted">{payback}</b>
        </span>
      </div>
    </div>
  );
}
