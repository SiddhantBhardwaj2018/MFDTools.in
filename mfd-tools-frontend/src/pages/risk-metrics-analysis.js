import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);
  const ITEMS_PER_PAGE = 15;
  const WINDOW_SIZE = 5;

  const [highlightReturnColor, setHightlightReturnColor] = useState({
    sd: true,
    beta: false,
    alpha: false,
    jensen_alpha: false,
    sharpe_ratio: false,
    treynor_ratio: false,
    sortino_ratio: false,
  });

  const [fundHouse, setFundHouse] = useState("All");
  const [schemeType, setSchemeType] = useState("All");
  const [indicator, setIndicator] = useState("sd");

  const [resultSchemes, setResultSchemes] = useState([]);
  const [totalSchemeCount, setTotalSchemeCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1); // 1-based
  const [startIdx, setStartIdx] = useState(0); // window start (0-based)

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

  const indicatorOptions = [
    { name: "Standard Deviation", value: "sd" },
    { name: "Beta", value: "beta" },
    { name: "Alpha", value: "alpha" },
    { name: "Jensen's Alpha", value: "jensen_alpha" },
    { name: "Sharpe Ratio", value: "sharpe_ratio" },
    { name: "Treynor Ratio", value: "treynor_ratio" },
    { name: "Sortino Ratio", value: "sortino_ratio" },
  ];

  const triggerRiskMetricsPull = (page) => {
    mfToolsService
      .getSchemeAdvancedAnalysis(fundHouse, schemeType, indicator, page)
      .then((res) => {
        setResultSchemes(res.data.advancedSchemeViewList);
        setTotalSchemeCount(res.data.totalAdvancedSchemeCount);
        setDisplayResult("block");
        if (indicator == "sd") {
          setHightlightReturnColor({
            sd: true,
            beta: false,
            alpha: false,
            jensen_alpha: false,
            sharpe_ratio: false,
            treynor_ratio: false,
            sortino_ratio: false,
          });
        } else if (indicator == "beta") {
          setHightlightReturnColor({
            sd: false,
            beta: true,
            alpha: false,
            jensen_alpha: false,
            sharpe_ratio: false,
            treynor_ratio: false,
            sortino_ratio: false,
          });
        } else if (indicator == "alpha") {
          setHightlightReturnColor({
            sd: false,
            beta: false,
            alpha: true,
            jensen_alpha: false,
            sharpe_ratio: false,
            treynor_ratio: false,
            sortino_ratio: false,
          });
        } else if (indicator == "jensen_alpha") {
          setHightlightReturnColor({
            sd: false,
            beta: false,
            alpha: false,
            jensen_alpha: true,
            sharpe_ratio: false,
            treynor_ratio: false,
            sortino_ratio: false,
          });
        } else if (indicator == "sharpe_ratio") {
          setHightlightReturnColor({
            sd: false,
            beta: false,
            alpha: false,
            jensen_alpha: false,
            sharpe_ratio: true,
            treynor_ratio: false,
            sortino_ratio: false,
          });
        } else if (indicator == "treynor_ratio") {
          setHightlightReturnColor({
            sd: false,
            beta: false,
            alpha: false,
            jensen_alpha: false,
            sharpe_ratio: false,
            treynor_ratio: true,
            sortino_ratio: false,
          });
        } else if (indicator == "sortino_ratio") {
          setHightlightReturnColor({
            sd: false,
            beta: false,
            alpha: false,
            jensen_alpha: false,
            sharpe_ratio: false,
            treynor_ratio: false,
            sortino_ratio: true,
          });
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        }
      });
  };

  const fetchPage = (page) => {
    triggerRiskMetricsPull(page - 1);
  };

  /* ================= SEARCH ================= */

  const onSearchRiskMetrics = (e) => {
    e.preventDefault();

    setCurrentPage(1);
    setStartIdx(0);

    triggerRiskMetricsPull(0);
  };

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(totalSchemeCount / ITEMS_PER_PAGE);
  const endIdx =
    startIdx + WINDOW_SIZE < totalPages ? startIdx + WINDOW_SIZE : totalPages;

  const onClickPage = (page) => {
    setCurrentPage(page);
    fetchPage(page);
  };

  const onClickNextBtn = () => {
    if (endIdx < totalPages) {
      const newStart = startIdx + WINDOW_SIZE;
      setStartIdx(newStart);
      setCurrentPage(newStart + 1);
      fetchPage(newStart + 1);
    }
  };

  const onClickPrevBtn = () => {
    if (startIdx > 0) {
      const newStart = startIdx - WINDOW_SIZE;
      setStartIdx(newStart);
      setCurrentPage(newStart + 1);
      fetchPage(newStart + 1);
    }
  };

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
    triggerRiskMetricsPull(0);
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold mb-10 text-3xl">
        Scheme Risk Metrics Analysis
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
              Select Indicator
            </label>
            <select
              className="border border-gray-300 px-3 py-2 rounded-md"
              value={indicator}
              onChange={(e) => setIndicator(e.target.value)}
            >
              {indicatorOptions.map((opt) => (
                <option key={opt.name} value={opt.value}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="click"
              onClick={onSearchRiskMetrics}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Search
            </button>
          </div>
        </form>
        <div id="dataTable" className="mt-7" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-7 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Scheme Risk Metrics Analysis Results
            </h5>
          </div>
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {[
                    "SCHEME NAME",
                    "SD",
                    "BETA",
                    "ALPHA",
                    "JENSEN'S ALPHA",
                    "SHARPE RATIO",
                    "TREYNOR RATIO",
                    "SORTINO RATIO",
                  ].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
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
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["sd"] ? `bg-blue-200` : ``
                      }`}
                    >
                      {scheme.standardDeviation != null ? scheme.standardDeviation : "-"}
                    </td>

                    <td
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["beta"] ? `bg-blue-200` : ``
                      }`}
                    >
                      {scheme.beta != null ? scheme.beta : "-"}
                    </td>

                    <td
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["alpha"] ? `bg-blue-200` : ``
                      }`}
                    >
                      {scheme.alpha != null ? scheme.alpha : "-"}
                    </td>

                    <td
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["jensen_alpha"]
                          ? `bg-blue-200`
                          : ``
                      }`}
                    >
                      {scheme.jensenAlpha != null ? scheme.jensenAlpha : "-"}
                    </td>

                    <td
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["sharpe_ratio"] ? `bg-blue-200` : ``
                      }`}
                    >
                      {scheme.sharpeRatio != null ? scheme.sharpeRatio : "-"}
                    </td>
                    <td
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["treynor_ratio"]
                          ? `bg-blue-200`
                          : ``
                      }`}
                    >
                      {scheme.treynorRatio != null ? scheme.treynorRatio : "-"}
                    </td>
                     <td
                      className={`font-bold text-center border-2 border-gray-800 px-6 py-4 ${
                        highlightReturnColor["sortino_ratio"]
                          ? `bg-blue-200`
                          : ``
                      }`}
                    >
                      {scheme.sortinoRatio != null ? scheme.sortinoRatio : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <nav className="mt-7 mb-10">
              <ul className="flex justify-center">
                {startIdx > 0 && (
                  <li>
                    <button
                      onClick={onClickPrevBtn}
                      className="px-3 py-1 border"
                    >
                      Prev
                    </button>
                  </li>
                )}

                {(() => {
                  let buttons = [];
                  for (let i = startIdx + 1; i <= endIdx; i++) {
                    buttons.push(
                      <li key={i}>
                        <button
                          onClick={() => onClickPage(i)}
                          className={`px-3 py-1 border ${
                            i === currentPage ? "bg-blue-200" : ""
                          }`}
                        >
                          {i}
                        </button>
                      </li>
                    );
                  }
                  return buttons;
                })()}

                {endIdx < totalPages && (
                  <li>
                    <button
                      onClick={onClickNextBtn}
                      className="px-3 py-1 border"
                    >
                      Next
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
