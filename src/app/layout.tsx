import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BetPro - Sports Betting & Live Casino",
  description: "Bet on cricket, football, live casino and more. Best odds guaranteed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        {/*
          This script runs before React hydration and strips attributes
          injected by browser extensions (e.g. BIS safety scanner injects
          bis_skin_checked, bis_register on every div). Without this cleanup
          React throws a hydration mismatch warning in dev mode even though
          the app code is correct.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  function cleanExtensionAttrs(node) {
    if (node.nodeType !== 1) return;
    var attrs = Array.prototype.slice.call(node.attributes);
    for (var i = 0; i < attrs.length; i++) {
      var name = attrs[i].name;
      if (
        name.startsWith('bis_') ||
        name.startsWith('__processed_') ||
        name.startsWith('__wf_') ||
        name === 'data-new-gr-c-s-check-loaded' ||
        name === 'data-gr-ext-installed'
      ) {
        node.removeAttribute(name);
      }
    }
    var children = node.childNodes;
    for (var j = 0; j < children.length; j++) {
      cleanExtensionAttrs(children[j]);
    }
  }
  if (typeof document !== 'undefined') {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          cleanExtensionAttrs(node);
        });
        if (mutation.type === 'attributes') {
          var name = mutation.attributeName;
          if (name && (name.startsWith('bis_') || name.startsWith('__processed_'))) {
            mutation.target.removeAttribute(name);
          }
        }
      });
    });
    document.addEventListener('DOMContentLoaded', function() {
      cleanExtensionAttrs(document.body);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['bis_skin_checked', 'bis_register', '__processed_f6aad2d3-4cae-40f6-8170-40f35eee3870__']
      });
    });
  }
})();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
