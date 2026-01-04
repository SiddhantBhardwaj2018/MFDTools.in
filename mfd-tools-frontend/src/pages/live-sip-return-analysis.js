import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [sipInvestmentAmount, setSipInvestmentAmount] = useState(0);
  const [investmentDate, setInvestmentDate] = useState("");
  const [fundHouse, setFundHouse] = useState("ICICI Prudential Mutual Fund");
  const [schemeType, setSchemeType] = useState("equity");
  const [schemeList, setSchemeList] = useState([]);
  const [selectedSchemes, setSelectedSchemes] = useState("");
  const [errorAvailable, setErrorAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calcError, setCalcError] = useState(false);
  const [searchingSchemes, setSearchingSchemes] = useState(false);

  const [totalSIPAmt, setTotalSIPAmt] = useState(0);
  const [presentInvestValue, setPresentInvestValue] = useState(0);
  const [monthlySip, setMonthlySip] = useState(0);
  const [sipCagr, setSipCagr] = useState(0);

  const [displaySchemeList, setDisplaySchemeList] = useState(false);

  const [displayResult, setDisplayResult] = useState("none");

  const fundHouseOptions = [
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
    { name: "Equity", value: "equity" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Debt", value: "debt" },
  ];

  const onChangeSipInvestmentAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setSipInvestmentAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const triggerPullSchemeList = () => {
    setSearchingSchemes(true);
    setDisplaySchemeList(false);
    setDisplayResult("none");
    mfToolsService
      .getSchemeListForSIP(fundHouse, investmentDate, schemeType)
      .then((res) => {
        if (res.data.schemeList.length > 0) {
          setSchemeList(res.data.schemeList);
        } else {
          setSchemeList([]);
        }
        setDisplaySchemeList(true);
        setSearchingSchemes(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        } else {
          setDisplaySchemeList(true);
          setSchemeList([]);
          setSearchingSchemes(false);
        }
      });
  };

  const triggerSipAnalysisPull = () => {
    setDisplayResult("none");
    if (selectedSchemes.length > 0) {
      setLoading(true);
      setCalcError(false);
      let lumpsumAmt = (sipInvestmentAmount + "").replace(/,/g, "");
      mfToolsService
        .calculateSIP(investmentDate, lumpsumAmt, selectedSchemes)
        .then((res) => {
          setLoading(false);
          if ((res.data != undefined) & (res.data != null)) {
            setMonthlySip(res.data.monthlySIP);
            setTotalSIPAmt(res.data.totalSIPAmt);
            setSipCagr(res.data.sipCagr);
            setPresentInvestValue(res.data.presentInvestValue);
          } else {
            setErrorAvailable(true);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            logout();
          } else {
            setCalcError(true);
            setLoading(false);
          }
        });
      setDisplayResult("block");
    }
  };

  const onSearchSipAnalysisPull = (e) => {
    e.preventDefault();
    triggerSipAnalysisPull();
  };

  useEffect(() => {
    if ((investmentDate != "") & (new Date(investmentDate) < new Date())) {
      triggerPullSchemeList();
    } 
  }, [fundHouse, schemeType, investmentDate]);

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
        Live SIP Return Calculator
      </h1>
      <div style={{ margin: "0 5%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              SIP Investment Amount
            </label>
            <input
              value={sipInvestmentAmount}
              onChange={onChangeSipInvestmentAmount}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
            />
          </div>
          <div className="w-full mb-5">
            <label
              htmlFor="fromDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Investment Date
            </label>

            <input
              id="fromDate"
              type="date"
              value={investmentDate}
              onChange={(e) => setInvestmentDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
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
                <option key={opt.value} value={opt.value}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
          {displaySchemeList ? (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select Schemes
              </label>
              <select
                className="border border-gray-300 px-3 py-2 rounded-md"
                value={selectedSchemes}
                onChange={(e) => setSelectedSchemes(e.target.value)}
              >
                <option disabled>{"Select A Scheme"}</option>
                {schemeList.length > 0 ? (
                  schemeList.map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme}
                    </option>
                  ))
                ) : (
                  <option disabled>{"No Schemes available"}</option>
                )}
              </select>
            </div>
          ) : (
            <></>
          )}

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="click"
              onClick={onSearchSipAnalysisPull}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Search
            </button>
          </div>
        </form>
        {searchingSchemes ? (
          <>
            <h5 className="mt-7 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Searching for schemes from{" "}
              {inputCalculatorRules.formatDateToWords(investmentDate)}
            </h5>
          </>
        ) : (
          <div
            id="dataTable"
            className="mt-7"
            style={{ display: displayResult }}
          >
            {loading ? (
              <>
                <h5 className="mt-7 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                  Calculating SIP Analysis
                </h5>
              </>
            ) : (
              <div className="relative overflow-x-auto mt-5">
                {errorAvailable ? (
                  <>
                    <h5 className="mt-7 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                      No Data Available
                    </h5>
                  </>
                ) : calcError ? (
                  <>
                    <h5 className="mt-7 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                      There has been an error in calculation !
                    </h5>
                  </>
                ) : (
                  <>
                    <div id="dataTable" style={{ display: displayResult }}>
                      <div
                        id="resultHeader"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{ display: "block", justifyContent: "center" }}
                        >
                          <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                            Live SIP Calculator Results
                          </h5>
                          <h5 className="mt-2 leading-none text-center text-xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
                            {`From ${inputCalculatorRules.formatDateToWords(
                              investmentDate
                            )}  to Today`}
                          </h5>
                        </div>
                      </div>

                      <div
                        id="showOutput"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="max-w-full mb-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                          <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-md text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Monthly SIP Investment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  {inputCalculatorRules.formatINR(monthlySip)}
                                </th>
                              </tr>

                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Total Amount of SIP Contribution
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  {inputCalculatorRules.formatINR(totalSIPAmt)}
                                </th>
                              </tr>

                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Present Value Of Investment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  {inputCalculatorRules.formatINR(
                                    presentInvestValue
                                  )}
                                </th>
                              </tr>

                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Total SIP CAGR
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  {inputCalculatorRules.formatSensex(sipCagr) +
                                    "%"}
                                </th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
