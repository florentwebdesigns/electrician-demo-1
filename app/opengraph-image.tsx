import { ImageResponse } from "next/og";
import { business } from "@/content/site";

export const alt = `${business.name}, professional electrical services`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          backgroundColor: "#050a16",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(47,107,255,.55), transparent 55%), radial-gradient(circle at 10% 90%, rgba(111,220,255,.25), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#7fe7ff", textTransform: "uppercase" }}>
          W Sincinnati Electrical
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>Electrical work</div>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: "#9cc2ff" }}>
            done with precision.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 600 }}>Call {business.phoneDisplay}</div>
      </div>
    ),
    size
  );
}
