import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#060907",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: "Verdana, sans-serif",
            fontWeight: 700,
            fontSize: 220,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#23E56D" }}>k</span>
          <span style={{ color: "#B7F4D0" }}>i</span>
          <span style={{ color: "#F2F5F3" }}>vo</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#8A938D",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Escalando ofertas e empresas no mercado.
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
