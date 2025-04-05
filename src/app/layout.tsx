import React from "react";
import Loading from "./loading";
import "./globals.css";
import { ReduxProvider } from "./StoreProvider";
import Alert from "@/components/alerts";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import ApplicationPages from "@/application";
import { Metadata } from "next";
import Script from "next/script";
// import { META_SEO_TEXT } from "@/utils/helpers";
import { isMobile } from "react-device-detect";

export const META_SEO_TEXT = `At Sukoon Unlimited, we believe in the power of heartfelt connections and conversations for healthy aging. Join our exclusive community of Seniors to connect, contribute, learn, and support each other. For queries, reach out at +91 91106 73203`;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="en">
      <body className="font-normalFont bg-bgColor">
        <ReduxProvider>
          <Alert />
          <ApplicationPages>
            {/* <React.Suspense fallback={<Loading/>}> */}
            <div className={` min-h-96 lg:min-h-[1000px] xl:min-h-[1000px] ${isMobile ? 'mb-12' : ''}`}>{children}</div>
            {/* </React.Suspense> */}
          </ApplicationPages>
          <GoogleTagManager gtmId="AW-16655775899" />
          <GoogleAnalytics gaId="G-6FZ8Y7KBSS" debugMode />
        </ReduxProvider>
      </body>
    </html>
  );
};
export const metadata: Metadata = {
  title: {
    template: '%s | Sukoon Unlimited',
    default: 'Sukoon Unlimited | An online platform for seniors to have meaningful conversations, for any query call +918660610849', // a default is required when creating a template
  },
  description: META_SEO_TEXT,
  appleWebApp: true,
  openGraph: {
    images: [
      {
        url: 'https://sukoontest.s3.amazonaws.com/Primary+Logo+(black+type).png',
        width: 512,
        height: 644,
      },
    ],
    title: META_SEO_TEXT,
    description: META_SEO_TEXT,
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  keywords: "Sukoon Unlimited, Sukoon.love, Senior Care, Elder Care, senior conversation platfrom",


};


export default RootLayout;
