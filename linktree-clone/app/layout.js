import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "linktree - Your favorite link sharing site",
  description: "We brought a revolution in link sharing",
};

const removalScript = `try{(function(){var d=document.documentElement;d.removeAttribute('crxemulator');var o=new MutationObserver(function(records){for(var r of records){if(r.type==='attributes'&&r.attributeName==='crxemulator'){try{d.removeAttribute('crxemulator')}catch(e){}}}});o.observe(d,{attributes:true,attributeFilter:['crxemulator']});})();}catch(e){};`;

export default function RootLayout({ children }) {

  return (
    <html lang="en"suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <script dangerouslySetInnerHTML={{ __html: removalScript }} />
      </body>
    </html>
  );
}
