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
  const [schemeType, setSchemeType] = useState("All");
  const [schemeList, setSchemeList] = useState([]);
  const [schemeListError, setSchemeListError] = useState(false);
  const [selectedSchemes, setSelectedSchemes] = useState([]);
  const [errorAvailable, setErrorAvailable] = useState(false);
  const [maxAlpha,setMaxAlpha] = useState(0);
  const [maxFiveYear,setMaxFiveYear] = useState(0);
  const [maxInception,setMaxInception] = useState(0);
  const [maxJensenAlpha,setMaxJensenAlpha] = useState(0);
  const [maxOneYear,setMaxOneYear] = useState(0);
  const [maxSharpe,setMaxSharpe] = useState(0);
  const [maxSortino,setMaxSortino] = useState(0);
  const [maxTenYear,setMaxTenYear] = useState(0);
  const [maxThreeYear,setMaxThreeYear] = useState(0);
  const [maxTreynor,setMaxTreynor] = useState(0);
  const [minBeta,setMinBeta] = useState(0);
  const [minSD,setMinSD] = useState(0);

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

  const handleSchemeToggle = (value) => {
    setSelectedSchemes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setTimeout(() => {
      console.log(selectedSchemes);
    }, 4000);
  };

  const triggerPullSchemeList = () => {
    mfToolsService
      .getSchemeList(fundHouse, schemeType)
      .then((res) => {
        if (res.data.schemeList.length > 0) {
          setSchemeList(res.data.schemeList);
          setSchemeListError(false);
        } else {
          setSchemeListError(true);
          setSchemeList([]);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        } else {
          setSchemeListError(true);
        }
      });
  };

  const triggerSchemeComparisonPull = () => {
    if ((selectedSchemes.length > 0) & (selectedSchemes.length <= 20)) {
      mfToolsService
        .getSchemePerformanceList(selectedSchemes)
        .then((res) => {
          if (res.data.schemeList.length > 0) {
            setResultSchemes(res.data.schemeList);
            setDisplayResult("block");
            setErrorAvailable(false);
            setMaxAlpha(res.data.maxAlpha);
            setMaxFiveYear(res.data.maxFiveYear);
            setMaxInception(res.data.maxInception);
            setMaxJensenAlpha(res.data.maxJensenAlpha);
            setMaxOneYear(res.data.maxOneYear);
            setMaxThreeYear(res.data.maxThreeYear);
            setMaxTenYear(res.data.maxTenYear);
            setMaxTreynor(res.data.maxTreynor);
            setMinBeta(res.data.minBeta);
            setMinSD(res.data.minSD);
            setMaxSharpe(res.data.maxSharpe);
            setMaxSortino(res.data.maxSortino);
          } else {
            setErrorAvailable(true);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            logout();
          }
        });
    }
  };

  const onSearchSchemeComparisonPull = (e) => {
    e.preventDefault();
    triggerSchemeComparisonPull();
  };

  useEffect(() => {
    triggerPullSchemeList();
  }, [fundHouse, schemeType]);

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
      <h1 className="text-center font-semibold mb-10 text-3xl">
        Scheme Comparison Analysis
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
              {fundHouseOptions.map((opt) => (
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
              {schemeTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Schemes
            </label>
            <div>
              <div className="border border-gray-300 rounded-md p-2 max-h-48 overflow-y-auto">
                <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                  {schemeListError
                    ? "No Scheme Data Available"
                    : "Select upto 20 schemes"}
                </label>
                {schemeList.map((opt, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={opt}
                      checked={selectedSchemes.includes(opt)}
                      onChange={() => handleSchemeToggle(opt)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-900">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="click"
              onClick={onSearchSchemeComparisonPull}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Search
            </button>
          </div>
        </form>
        <div id="dataTable" className="mt-7" style={{ display: displayResult }}>
          <div className="relative overflow-x-auto mt-5">
            {errorAvailable ? (
              <>
                <h5 className="mt-7 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                  No Data Available
                </h5>
              </>
            ) : (
              <>
                <div
                  id="resultHeader"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <h5 className="mt-7 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                    Scheme Comparison Analysis Results
                  </h5>
                </div>
                <table className="w-full mb-10 text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
                  <thead
                    className="text-xs uppercase"
                    style={{ background: "#063599" }}
                  >
                    <tr>
                      {[
                        "SCHEME NAME",
                        "1 YR (%)",
                        "3 YR (%)",
                        "5 YR (%)",
                        "10 YR (%)",
                        "INCEPTION (%)",
                        "SD",
                        "BETA",
                        "ALPHA",
                        "JENSEN'S ALPHA",
                        "SHARPE RATIO",
                        "TREYNOR RATIO",
                        "SORTINO RATIO",
                      ].map((head) => (
                        <th
                          key={head}
                          className="text-white text-center px-6 py-3"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {resultSchemes.map((scheme, idx) => (
                      <tr key={idx} className="bg-white">
                        <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                          {scheme.schemeName}
                        </th>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.oneYearReturn != null & scheme.oneYearReturn == maxOneYear ? `bg-green-300` : ``}`}
                        >
                          {scheme.oneYearReturn != null
                            ? scheme.oneYearReturn
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.threeYearReturn != null & scheme.threeYearReturn == maxThreeYear ? `bg-green-300` : ``}`}
                        >
                          {scheme.threeYearReturn != null
                            ? scheme.threeYearReturn
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.fiveYearReturn != null & scheme.fiveYearReturn == maxFiveYear ? `bg-green-300` : ``}`}
                        >
                          {scheme.fiveYearReturn != null
                            ? scheme.fiveYearReturn
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.tenYearReturn != null & scheme.tenYearReturn == maxTenYear ? `bg-green-300` : ``}`}
                        >
                          {scheme.tenYearReturn != null
                            ? scheme.tenYearReturn
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.inceptionReturn != null & scheme.inceptionReturn == maxInception ? `bg-green-300` : ``}`}
                        >
                          {scheme.inceptionReturn != null
                            ? scheme.inceptionReturn
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.schemeSD != null & scheme.schemeSD == minSD ? `bg-green-300` : ``}`}
                        >
                          {scheme.schemeSD != null
                            ? scheme.schemeSD
                            : "-"}
                        </td>

                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.schemeBeta != null & scheme.schemeBeta == minBeta ? `bg-green-300` : ``}`}
                        >
                          {scheme.schemeBeta != null ? scheme.schemeBeta : "-"}
                        </td>

                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.alpha != null & scheme.alpha == maxAlpha ? `bg-green-300` : ``}`}
                        >
                          {scheme.alpha != null ? scheme.alpha : "-"}
                        </td>

                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.jensenAlpha != null & scheme.jensenAlpha == maxJensenAlpha ? `bg-green-300` : ``}`}
                        >
                          {scheme.jensenAlpha != null
                            ? scheme.jensenAlpha
                            : "-"}
                        </td>

                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.sharpeRatio != null & scheme.sharpeRatio == maxSharpe ? `bg-green-300` : ``}`}
                        >
                          {scheme.sharpeRatio != null
                            ? scheme.sharpeRatio
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.treynorRatio != null & scheme.treynorRatio == maxTreynor ? `bg-green-300` : ``}`}
                        >
                          {scheme.treynorRatio != null
                            ? scheme.treynorRatio
                            : "-"}
                        </td>
                        <td
                          className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${scheme.sortinoRatio != null & scheme.sortinoRatio == maxSortino ? `bg-green-300` : ``}`}
                        >
                          {scheme.sortinoRatio != null
                            ? scheme.sortinoRatio
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
