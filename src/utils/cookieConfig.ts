import { default as CookieConsent } from "vanilla-cookieconsent";
import type { CookieConsentConfig } from "vanilla-cookieconsent";

import { GA_ID } from "@/constants";

function loadGoogleAnalytics() {
  if (document.querySelector(`script[src*="${GA_ID}"]`)) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;

  document.head.appendChild(script);

  script.onload = () => {
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  };
}

function updateConsentState(analyticsAccepted: boolean) {
  if (typeof window.gtag !== "function") return;

  window.gtag("consent", "update", {
    analytics_storage: analyticsAccepted ? "granted" : "denied",
    ad_storage: analyticsAccepted ? "granted" : "denied",
    functionality_storage: analyticsAccepted ? "granted" : "denied",
    personalization_storage: analyticsAccepted ? "granted" : "denied",
  });
}

export function initCookieConsent() {
  const config = {
    autoClearCookies: true,
    hideFromBots: true,

    cookie: {
      name: "cc_cookie",
      path: "/",
      domain: location.hostname,
      sameSite: "Lax",
      expiresAfterDays: 365,
    },

    guiOptions: {
      consentModal: {
        layout: "box inline",
        position: "bottom right",
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    onFirstConsent: () => {
      const analyticsAccepted = CookieConsent.acceptedCategory("analytics");

      updateConsentState(analyticsAccepted);

      if (analyticsAccepted) loadGoogleAnalytics();
    },

    onConsent: () => {
      const analyticsAccepted = CookieConsent.acceptedCategory("analytics");

      updateConsentState(analyticsAccepted);

      if (analyticsAccepted) loadGoogleAnalytics();
    },

    onChange: ({ changedCategories }: { changedCategories?: string[] }) => {
      if (changedCategories?.includes("analytics")) {
        const analyticsAccepted = CookieConsent.acceptedCategory("analytics");

        updateConsentState(analyticsAccepted);

        if (analyticsAccepted) {
          loadGoogleAnalytics();
        }
      }
    },

    categories: {
      necessary: {
        enabled: true,
        readOnly: true,
      },
      analytics: {
        enabled: false,
        readOnly: false,
        autoClear: {
          cookies: [{ name: /^_ga/ }, { name: "_gid" }, { name: "_gat" }],
        },
      },
    },

    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "We use cookies",
            description:
              "We use cookies to enhance your browsing experience and analyze site traffic via Google Analytics.",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage preferences",
          },
          preferencesModal: {
            title: "Cookie Preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save preferences",
            closeIconLabel: "Close",
            sections: [
              {
                title: "Cookie Usage",
                description:
                  "We use cookies to ensure core site functionality and to understand how people use our site.",
              },
              {
                title: "Strictly Necessary Cookies",
                description:
                  "These cookies are required for the website to function and cannot be disabled.",
                linkedCategory: "necessary",
              },
              {
                title: "Analytics & Performance",
                description:
                  "These cookies help us understand visitor behaviour via Google Analytics (GA4).",
                linkedCategory: "analytics",
                cookieTable: {
                  headers: {
                    name: "Cookie",
                    domain: "Domain",
                    expiration: "Expiration",
                    description: "Description",
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: location.hostname,
                      expiration: "2 years",
                      description: "Distinguishes unique users.",
                    },
                    {
                      name: `_ga_*`,
                      domain: location.hostname,
                      expiration: "2 years",
                      description: "Maintains GA4 session state.",
                    },
                    {
                      name: "_gid",
                      domain: location.hostname,
                      expiration: "24 hours",
                      description: "Distinguishes users.",
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  } satisfies CookieConsentConfig;

  CookieConsent.run(config);
}
