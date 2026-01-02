import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [fundHouse, setFundHouse] = useState("All");
  const [schemeType, setSchemeType] = useState("Open Ended Schemes ( Equity Scheme - Large Cap Fund )");
  const [fromDate, setFromDate] = useState("2020-01-10");
  const [toDate, setToDate] = useState("2025-12-01");
  const [loading, setLoading] = useState(false);

  const [resultSchemes, setResultSchemes] = useState([]);

  const [displayResult, setDisplayResult] = useState("none");

  const fundHouseOptions = [
    "All",
    "360 ONE Mutual Fund",
    "Aditya Birla Sun Life Mutual Fund",
    "Axis Mutual Fund",
    "Bajaj Finserv Mutual Fund",
    "Bandhan Mutual Fund",
    "Bank of India Mutual Fund",
    "Baroda BNP Paribas Mutual Fund",
    "BNP Paribas Mutual Fund",
    "Canara Robeco Mutual Fund",
    "Deutsche Mutual Fund",
    "DSP Mutual Fund",
    "Edelweiss Mutual Fund",
    "Franklin Templeton Mutual Fund",
    "Goldman Sachs Mutual Fund",
    "Groww Mutual Fund",
    "HDFC Mutual Fund",
    "Helios Mutual Fund",
    "HSBC Mutual Fund",
    "ICICI Prudential Mutual Fund",
    "IDBI Mutual Fund",
    "IIFCL Mutual Fund",
    "IL&FS Mutual Fund",
    "Invesco Mutual Fund",
    "ITI Mutual Fund",
    "JM Financial Mutual Fund",
    "JPMorgan Mutual Fund",
    "Kotak Mahindra Mutual Fund",
    "L&T Mutual Fund",
    "LIC Mutual Fund",
    "Mahindra Manulife Mutual Fund",
    "Mirae Asset Mutual Fund",
    "Morgan Stanley Mutual Fund",
    "Motilal Oswal Mutual Fund",
    "Navi Mutual Fund",
    "NJ Mutual Fund",
    "Nippon India Mutual Fund",
    "Old Bridge Mutual Fund",
    "PGIM India Mutual Fund",
    "PineBridge Mutual Fund",
    "PPFAS Mutual Fund",
    "Principal Mutual Fund",
    "Quantum Mutual Fund",
    "Quant Mutual Fund",
    "Sahara Mutual Fund",
    "Samco Mutual Fund",
    "SBI Mutual Fund",
    "Shriram Mutual Fund",
    "Sundaram Mutual Fund",
    "Tata Mutual Fund",
    "Taurus Mutual Fund",
    "Trust Mutual Fund",
    "Union Mutual Fund",
    "UTI Mutual Fund",
    "WhiteOak Capital Mutual Fund",
    "Zerodha Mutual Fund",
  ];

  const schemeTypeOptions = [
    "All",
    "Open Ended Schemes ( Equity Scheme - Large Cap Fund )",
    "Open Ended Schemes ( Equity Scheme - Multi Cap Fund )",
    "Open Ended Schemes ( Equity Scheme - Large & Mid Cap Fund )",
    "Open Ended Schemes ( Equity Scheme - Mid Cap Fund )",
    "Open Ended Schemes ( Equity Scheme - Small Cap Fund )",
    "Open Ended Schemes ( Equity Scheme - Dividend Yield Fund )",
    "Open Ended Schemes ( Equity Scheme - Value Fund )",
    "Open Ended Schemes ( Equity Scheme - Contra Fund )",
    "Open Ended Schemes ( Equity Scheme - Focused Fund )",
    "Open Ended Schemes ( Equity Scheme - Sectoral/ Thematic )",
    "Open Ended Schemes ( Equity Scheme - ELSS )",
    "Open Ended Schemes ( Debt Scheme - Overnight Fund )",
    "Open Ended Schemes ( Debt Scheme - Liquid Fund )",
    "Open Ended Schemes ( Debt Scheme - Ultra Short Duration Fund )",
    "Open Ended Schemes ( Debt Scheme - Low Duration Fund )",
    "Open Ended Schemes ( Debt Scheme - Money Market Fund )",
    "Open Ended Schemes ( Debt Scheme - Short Duration Fund )",
    "Open Ended Schemes ( Debt Scheme - Medium Duration Fund )",
    "Open Ended Schemes ( Debt Scheme - Medium to Long Duration Fund )",
    "Open Ended Schemes ( Debt Scheme - Long Duration Fund )",
    "Open Ended Schemes ( Debt Scheme - Dynamic Bond )",
    "Open Ended Schemes ( Debt Scheme - Corporate Bond Fund )",
    "Open Ended Schemes ( Debt Scheme - Credit Risk Fund )",
    "Open Ended Schemes ( Debt Scheme - Banking and PSU Fund )",
    "Open Ended Schemes ( Debt Scheme - Gilt Fund )",
    "Open Ended Schemes ( Debt Scheme - Gilt Fund 10 year )",
    "Open Ended Schemes ( Debt Scheme - Floater Fund )",
    "Open Ended Schemes ( Hybrid Scheme - Conservative Hybrid Fund )",
    "Open Ended Schemes ( Hybrid Scheme - Balanced Hybrid Fund )",
    "Open Ended Schemes ( Hybrid Scheme - Aggressive Hybrid Fund )",
    "Open Ended Schemes ( Hybrid Scheme - Dynamic Asset Allocation )",
    "Open Ended Schemes ( Hybrid Scheme - Multi Asset Allocation )",
    "Open Ended Schemes ( Hybrid Scheme - Arbitrage Fund )",
    "Open Ended Schemes ( Hybrid Scheme - Equity Savings )",
    "Open Ended Schemes ( Solution Oriented Scheme - Retirement Fund )",
    "Open Ended Schemes ( Solution Oriented Scheme - Children's Fund )",
    "Open Ended Schemes ( Other Scheme - Index Funds )",
    "Open Ended Schemes ( Other Scheme - Gold ETF )",
    "Open Ended Schemes ( Other Scheme - Other ETFs )",
    "Open Ended Schemes ( Other Scheme - FoF Overseas )",
    "Open Ended Schemes ( Other Scheme - FoF Domestic )",
    "Open Ended Schemes ( Equity Scheme - Flexi Cap Fund )",
    "Open Ended Schemes ( Income )",
    "Open Ended Schemes ( Growth )",
    "Open Ended Schemes ( Balanced )",
    "Open Ended Schemes ( Liquid )",
    "Open Ended Schemes ( Money Market )",
    "Open Ended Schemes ( Gilt )",
    "Open Ended Schemes ( ELSS )",
    "Open Ended Schemes ( Floating Rate )",
    "Open Ended Schemes ( Fund of Funds - Domestic )",
    "Open Ended Schemes ( GOLD ETFs )",
    "Open Ended Schemes ( Other ETFs )",
    "Open Ended Schemes ( Fund of Funds - Overseas )",
    "Close Ended Schemes ( Income )",
    "Close Ended Schemes ( Growth )",
    "Close Ended Schemes ( Balanced )",
    "Close Ended Schemes ( ELSS )",
    "Interval Fund Schemes ( Income )",
    "Interval Fund Schemes ( Growth )",
  ];

  const filteredFundHouseOptions =
  schemeType === "All"
    ? fundHouseOptions.filter((opt) => opt !== "All")
    : fundHouseOptions;

const filteredSchemeTypeOptions =
  fundHouse === "All"
    ? schemeTypeOptions.filter((opt) => opt !== "All")
    : schemeTypeOptions;

  const triggerSchemeReturnPull = () => {
    if (new Date(toDate) > new Date(fromDate)) {
      let prevDate = [...fromDate.split("-")].reverse().join("/");
      let nextDate = [...toDate.split("-")].reverse().join("/");
      setLoading(true);
        setDisplayResult("block");
      mfToolsService
        .getSchemePointView(fundHouse, schemeType, prevDate, nextDate)
        .then((res) => {
          console.log(res.data);
          setResultSchemes(res.data.navSensexReturnList);
          setLoading(false);
        })
        .catch((err) => {
          if (err.status === 401) {
            logout();
          }
          setLoading(false);
          setDisplayResult("none");
        });
    } else {
      window.alert("to date has to be after for date");
    }
  };

  /* ================= SEARCH ================= */

  const onSearchSchemeReturns = (e) => {
    e.preventDefault();
    triggerSchemeReturnPull();
  };


  useEffect(() => {
  if (fundHouse === "All" && schemeType === "All") {
    setSchemeType(
      "Open Ended Schemes ( Equity Scheme - Large Cap Fund )"
    );
  }
}, [fundHouse]);

useEffect(() => {
  if (schemeType === "All" && fundHouse === "All") {
    setFundHouse("Open Ended Schemes ( Equity Scheme - Large Cap Fund )");
  }
}, [schemeType]);


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
    triggerSchemeReturnPull();
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold mb-10 text-3xl">
        Scheme Trends Analysis
      </h1>
      <div style={{ margin: "0 5%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Fund House
            </label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md"
              value={fundHouse}
              onChange={(e) => setFundHouse(e.target.value)}
            >
              {filteredFundHouseOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Scheme Type
            </label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md"
              value={schemeType}
              onChange={(e) => setSchemeType(e.target.value)}
            >
              {filteredSchemeTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="fromDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              From Date
            </label>

            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="fromDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              To Date
            </label>

            <input
              id="fromDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="click"
              onClick={onSearchSchemeReturns}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Search
            </button>
          </div>
        </form>
        <div id="dataTable" className="mt-7" style={{ display: displayResult }}>
          {loading ? (
            <h5 className="mt-7 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Loading Scheme Data ...
            </h5>
          ) : (
            <>
              <div
                id="resultHeader"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h5 className="mt-7 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                  Scheme Trends Analysis Results
                </h5>
              </div>
              <div className="mb-10 relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
                  <thead
                    className="text-xs uppercase"
                    style={{ background: "#063599" }}
                  >
                    <tr>
                      {["Scheme Name", "Performance (%)", "Sensex (%)"].map(
                        (head) => (
                          <th
                            key={head}
                            className="text-white text-center px-6 py-3"
                          >
                            {head}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {resultSchemes.map((scheme, idx) => (
                      <tr key={idx} className="bg-white">
                        <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                          {scheme.schemeName}
                        </th>

                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                            scheme.navReturn > scheme.sensexReturn
                              ? `bg-green-300`
                              : `bg-red-300`
                          }`}
                        >
                          {scheme.navReturn}
                        </td>

                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4`}
                        >
                          {scheme.sensexReturn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
