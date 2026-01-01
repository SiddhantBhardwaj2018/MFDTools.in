import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function panel() {
  const router = useRouter();
  const { checkUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkUserLoggedIn();
    const role = localStorage.getItem("role");
    if (role !== null) {
      if (role !== "ROLE_BASIC_USER") {
        if (role == "ROLE_ADMIN") {
          router.push("/admin");
        }
      }
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold mb-10 text-3xl">Panel</h1>
      <div
        className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        style={{ marginLeft: "5%", marginRight: "5%" }}
      >
        {[
          {
            href: "/education-planning",
            label: "Education Planning",
          },
          {
            href: "/marriage-planning",
            label: "Marriage Planning",
          },
          {
            href: "/vacation-planning",
            label: "Vacation Planning",
          },
          {
            href: "/dream-car-planning",
            label: "Dream Car Planning",
          },
          {
            href: "/house-planning",
            label: "House Planning",
          },
          {
            href: "/business-planning",
            label: "Business Planning",
          },
          {
            href: "/emergency-planning",
            label: "Emergency Planning",
          },
          {
            href: "/retirement-planning",
            label: "Retirement Planning",
          },
          {
            href: "/deferred-swp-planning",
            label: "Deferred SWP Calculator",
          },
          {
            href: "/immediate-swp-planning",
            label: "Immediate SWP Calculator",
          },
          {
            href: "/portfolio-forecasting-calculator",
            label: "Portfolio Forecasting Calculator",
          },
          {
            href: "/emi-vs-sip-calculator",
            label: "Loan EMI vs SIP",
          },
          {
            href: "/sip-to-crorepati-calculator",
            label: "Target SIP To Become A Crorepati",
          },
          {
            href: "/future-cost-of-expense-calculator",
            label: "Future Cost of Expense",
          },
          {
            href: "/limited-period-sip-calculator",
            label: "Limited Period SIP",
          },
          {
            href: "/human-life-value-calculator",
            label: "Human Life Value Calculator",
          },
          {
            href: "/needs-based-insurance-calculator",
            label: "Needs Based Value Calculator",
          },
          {
            href: "/simple-sip-calculator",
            label: "Simple SIP Calculator",
          },
          {
            href: "/step-up-sip-calculator",
            label: "Step Up SIP Calculator",
          },
          {
            href: "/lumpsum-calculator",
            label: "Lumpsum Calculator",
          },
          {
            href: "/total-return-calculator",
            label: "Total Return - SIP + Lumpsum",
          },
          {
            href: "/sip-delay-cost-calculator",
            label: "SIP & Cost Of Delayed Investment",
          },
          {
            href: "/sip-calculator-inflation",
            label: "SIP Calculator (With Inflation)",
          },
          {
            href: "/step-up-sip-calculator-inflation",
            label: "Step Up SIP Calculator (With Inflation)",
          },
          {
            href: "/lumpsum-calculator-inflation",
            label: "Lumpsum Calculator (With Inflation)",
          },
          {
            href: "/total-return-calculator-inflation",
            label: "Total Return - SIP + Lumpsum (With Inflation)",
          },
          {
            href: "/cost-delay-calculator-inflation",
            label: "Cost Of Delayed Investment (With Inflation)",
          },
          {
            href: "/sip-brokerage-calculator",
            label: "Brokerage Calculation - SIP Business",
          },
          {
            href: "/brokerage-comparison-mf-vs-insurance",
            label: "Brokerage Comparison - MF vs Insurance",
          },
          {
            href: "/total-commission-sip-book-aum",
            label: "Total Commission For SIP Book Size & AUM",
          },
          {
            href: "/total-commission-aum",
            label: "Total Commission For AUM",
          },
          {
            href: "/risk-profiler-quiz",
            label: "Investor Risk Profiler",
          },
          {
            href: "/financial-health-quiz",
            label: "Financial Health Quiz",
          },
          {
            href: "/scheme-return-analysis",
            label: "Scheme Return Analysis",
          },
          {
            href: "/risk-metrics-analysis",
            label: "Risk Metrics Analysis",
          },
          {
            href: "/scheme-trends-analysis",
            label: "Scheme Trends Analysis",
          },
          {
            href: "/scheme-comparison-analysis",
            label: "Scheme Comparison Analysis",
          },
          {
            href: "/live-sip-return-analysis",
            label: "Live SIP Return Analysis",
          },
          {
            href: "/live-swp-return-analysis",
            label: "Live SWP Return Analysis",
          },
          {
            href: "/most-declining-scheme-analysis",
            label: "Most Declining Scheme Analysis",
          },
          {
            href: "/live-scheme-nav-tracker-analysis",
            label: "Live Scheme NAV Tracker",
          },
          {
            href: "/weekly-fund-tracker",
            label: "Weekly Fund Tracker",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-gray-200 p-6 text-center text-lg font-medium shadow-sm transition hover:shadow-md hover:bg-gray-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
