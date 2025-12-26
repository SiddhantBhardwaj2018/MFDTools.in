import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function stepUpSipCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [timePeriod, setTimePeriod] = useState("");
  const [amount, setAmount] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState("");
  const [annualIncrement, setAnnualIncrement] = useState("");
  const [inflationRate, setInflationRate] = useState("");

  const [
    totalAmountInvestedWithoutIncrement,
    setTotalAmountInvestedWithoutIncrement,
  ] = useState("");
  const [
    totalMaturityAmtWithoutIncrement,
    setTotalMaturityAmtWithoutIncrement,
  ] = useState("");
  const [
    investmentGrowthWithoutIncrement,
    setInvestmentGrowthWithoutIncrement,
  ] = useState("");

  const [totalAmountInvested, setTotalAmountInvested] = useState("");
  const [totalMaturityAmt, setTotalMaturityAmt] = useState("");
  const [investmentGrowth, setInvestmentGrowth] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeTimePeriod = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setTimePeriod(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeRateOfReturn = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setRateOfReturn(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeAnnualIncrement = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setAnnualIncrement(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
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

  const onSubmitStepUpSipWithInflationCalculator = (e) => {
    e.preventDefault();
    if (
      timePeriod.length > 0 &&
      amount.length > 0 &&
      rateOfReturn.length > 0 &&
      annualIncrement.length > 0 &&
      inflationRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(timePeriod) &&
      inputCalculatorRules.numericRegex.test(amount) &&
      inputCalculatorRules.numericRegex.test(rateOfReturn) &&
      inputCalculatorRules.numericRegex.test(annualIncrement) &&
      inputCalculatorRules.numericRegex.test(inflationRate)
    ) {
      mfToolsService
        .calculateSIPReturn(
          Number(rateOfReturn.replace(/,/g, "")) / 100,
          Number(amount.replace(/,/g, "")),
          Number(timePeriod.replace(/,/g, "")),
          Number(annualIncrement.replace(/,/g, "")) / 100,
          Number(inflationRate.replace(/,/g, "")) / 100,
          false,
          true
        )
        .then((res) => {
          console.log(res.data);
          if (
            res.data.sipReturnList !== undefined &&
            res.data.sipReturnList.length > 0
          ) {
            setTotalAmountInvestedWithoutIncrement(
              inputCalculatorRules.formatINR(
                res.data.sipInvestWithoutStepUpList[
                  res.data.sipInvestWithoutStepUpList.length - 1
                ]
              )
            );
            setTotalMaturityAmtWithoutIncrement(
              inputCalculatorRules.formatINR(
                res.data.sipReturnWithoutStepUpList[
                  res.data.sipReturnWithoutStepUpList.length - 1
                ]
              )
            );
            setInvestmentGrowthWithoutIncrement(
              inputCalculatorRules.formatINR(
                res.data.sipReturnWithoutStepUpList[
                  res.data.sipReturnWithoutStepUpList.length - 1
                ] -
                  res.data.sipInvestWithoutStepUpList[
                    res.data.sipInvestWithoutStepUpList.length - 1
                  ]
              )
            );
            setTotalAmountInvested(
              inputCalculatorRules.formatINR(
                res.data.sipInvestList[res.data.sipInvestList.length - 1]
              )
            );
            setTotalMaturityAmt(
              inputCalculatorRules.formatINR(
                res.data.sipReturnList[res.data.sipReturnList.length - 1]
              )
            );
            setInvestmentGrowth(
              inputCalculatorRules.formatINR(
                res.data.sipReturnList[res.data.sipReturnList.length - 1] -
                  res.data.sipInvestList[res.data.sipInvestList.length - 1]
              )
            );
          }
          setDisplayResult("block");
        })
        .catch((err) => {
          if (err.status == 401) {
            setTimeout(() => {
              logout();
              window.alert("logging out");
            }, 1000);
          } else {
            console.log(err);
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
        Step-Up SIP Calculator (With Inflation)
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              For Time Period (Yrs)
            </label>
            <input
              value={timePeriod}
              onChange={onChangeTimePeriod}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              For Amount (₹)
            </label>
            <input
              value={amount}
              onChange={onChangeAmount}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Annual Increment (%)
            </label>
            <input
              value={annualIncrement}
              onChange={onChangeAnnualIncrement}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 8"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expected Rate Of Return (%)
            </label>
            <input
              value={rateOfReturn}
              onChange={onChangeRateOfReturn}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 8"
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
              placeholder="e.g. 8"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitStepUpSipWithInflationCalculator}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Step-Up SIP Return (With Inflation)
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Step-Up SIP Maturity & Growth (₹)
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
                      Total Amount Invested (SIP Without Increment) (With
                      Inflation) (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {totalAmountInvestedWithoutIncrement}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Total Maturity Amount (Without Increment) (With Inflation)
                      (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {totalMaturityAmtWithoutIncrement}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Investment Growth (Without Increment) (With Inflation) (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {investmentGrowthWithoutIncrement}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Total Amount Invested (SIP + Increment) (With Inflation)
                      (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {totalAmountInvested}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Total Maturity Amount (With Inflation) (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {totalMaturityAmt}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Investment Growth (With Inflation) (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {investmentGrowth}
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
