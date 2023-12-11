import type { Metadata } from "next";
import "./globals.css";
import RecoilRootWrapper from "./recoil/RecoilRootWrapper";
import SideVar from "./views/sidevar";

export const metadata: Metadata = {
  title: "JDG's Page",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ overflow: "hidden" }}>
        <RecoilRootWrapper>
          <SideVar></SideVar>
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
