import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function emiVersusSipCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [houseCost, setHouseCost] = useState("");
  const [loanPersonalContribution, setLoanPersonalContribution] = useState("");
  const [loanRate, setLoanRate] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [inflationRate, setInflationRate] = useState("");

  const [loanEmiAmt, setLoanEmiAmt] = useState("");
  const [totalLoanPaymentAmt, setTotalLoanPaymentAmt] = useState("");
  const [capitalPaidLoan, setCapitalPaidLoan] = useState("");
  const [interestPaidLoan, setInterestPaidLoan] = useState("");
  const [currentHouseValueRent, setCurrentHouseValueRent] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [sipAmtAfterEMI, setSipAmtAfterEMI] = useState("");
  const [assumedSIPGrowthRate, setAssumedSIPGrowthRate] = useState("12%");
  const [sipInvestmentFutureValue, setSipInvestmentFutureValue] = useState("");
  const [savedDownPaymentFutureValue, setSavedDownPaymentFutureValue] =
    useState("");
  const [
    futureHouseValuationWithInflation,
    setFutureHouseValuationWithInflation,
  ] = useState("");
  const [profitInSipVsEmi, setProfitInSipVsEmi] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeHouseCost = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setHouseCost(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeLoanPersonalContribution = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setLoanPersonalContribution(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeLoanRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setLoanRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeLoanPeriod = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setLoanPeriod(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeInflationRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInflationRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onSubmitEMIVersusSIPCalculator = (e) => {
    e.preventDefault();
    if (
      houseCost.length > 0 &&
      loanPersonalContribution.length > 0 &&
      loanRate.length > 0 &&
      loanPeriod.length > 0 &&
      inflationRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(houseCost) &&
      inputCalculatorRules.numericRegex.test(loanPersonalContribution) &&
      inputCalculatorRules.numericRegex.test(loanRate) &&
      inputCalculatorRules.numericRegex.test(loanPeriod) &&
      inputCalculatorRules.numericRegex.test(inflationRate)
    ) {
      mfToolsService
        .calculateEMIVersusSIP(
          Number(houseCost.replace(/,/g, "")),
          Number(loanPersonalContribution.replace(/,/g, "")),
          Number(loanRate.replace(/,/g, "")) / 100,
          Number(loanPeriod.replace(/,/g, "")),
          Number(inflationRate.replace(/,/g, "")) / 100
        )
        .then((res) => {
          console.log(res.data);
          setLoanEmiAmt(inputCalculatorRules.formatINR(res.data.emiAmt));
          setTotalLoanPaymentAmt(
            inputCalculatorRules.formatINR(res.data.totalLoanPayment)
          );
          setCapitalPaidLoan(
            inputCalculatorRules.formatINR(res.data.bankFunding)
          );
          setInterestPaidLoan(
            inputCalculatorRules.formatINR(res.data.loanInterestPaid)
          );
          setCurrentHouseValueRent(
            inputCalculatorRules.formatINR(res.data.houseCostFV)
          );
          setMonthlyRent(inputCalculatorRules.formatINR(0.03 * Number(houseCost.replace(/,/g, ""))));
          setSipAmtAfterEMI(
            inputCalculatorRules.formatINR(res.data.emiPaymentBalance)
          );
          setSipInvestmentFutureValue(
            inputCalculatorRules.formatINR(res.data.sipInvestFV)
          );
          setSavedDownPaymentFutureValue(
            inputCalculatorRules.formatINR(res.data.downpaymentFV)
          );
          setFutureHouseValuationWithInflation(
            inputCalculatorRules.formatINR(res.data.houseCostFV)
          );
          setProfitInSipVsEmi(
            inputCalculatorRules.formatINR(res.data.profitSIPInvest)
          );
          setDisplayResult("block");
        })
        .catch((err) => {
          if (err.status == 401) {
            setTimeout(() => {
              logout();
              window.alert("logging out");
            }, 1000);
          } else {
            window.alert("failure");
          }
        });
    } else {
      window.alert("failure");
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
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold mb-10 text-3xl">
        EMI Versus SIP Calculator
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Cost Of House (₹)
            </label>
            <input
              value={houseCost}
              onChange={onChangeHouseCost}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 50,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Personal Contribution In Loan (₹)
            </label>
            <input
              value={loanPersonalContribution}
              onChange={onChangeLoanPersonalContribution}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Loan Rate (%)
            </label>
            <input
              value={loanRate}
              onChange={onChangeLoanRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 6"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Period Of Loan (Yrs)
            </label>
            <input
              value={loanPeriod}
              onChange={onChangeLoanPeriod}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Inflation Rate (%)
            </label>
            <input
              value={inflationRate}
              onChange={onChangeInflationRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 4"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitEMIVersusSIPCalculator}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate EMI vs SIP Corpus
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              House Purchase Vs SIP Investment
            </h5>
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
                      Loan EMI Amount (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {loanEmiAmt}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Total Loan Payment Amount (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {totalLoanPaymentAmt}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Capital Paid In Loan (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {capitalPaidLoan}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Interest Paid In Loan (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {interestPaidLoan}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Consider Present House Value For Rent (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {currentHouseValueRent}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Monthly Rent At 3% Rental Yield (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {monthlyRent}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      SIP Amount After EMI (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {sipAmtAfterEMI}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Assumed SIP Growth Rate (%){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {assumedSIPGrowthRate}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Future Value Of SIP Investment (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {sipInvestmentFutureValue}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Future Value of Saved Down Payment (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {savedDownPaymentFutureValue}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Future House Valuation With Inflation (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {futureHouseValuationWithInflation}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Profit In SIP Investment Versus EMI (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {profitInSipVsEmi}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
