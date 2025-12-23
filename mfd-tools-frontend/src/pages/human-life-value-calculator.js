import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function humanLifeValueCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [currentAnnualIncome, setCurrentAnnualIncome] = useState("");
  const [investmentGrowthRate, setInvestmentGrowthRate] =
    useState("");
  const [incomeIncrementRate, setIncomeIncrementRate] = useState("");
  const [totalPeriodOfIncome, setTotalPeriodOfIncome] = useState("");

  const [insuranceCorpusReqd, setInsuranceCorpusReqd] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeCurrentAnnualIncome = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCurrentAnnualIncome(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeInvestmentGrowthRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInvestmentGrowthRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeIncomeIncrementRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setIncomeIncrementRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeTotalPeriodOfIncome = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setTotalPeriodOfIncome(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onSubmitHumanLifeValueCalculator = (e) => {
    e.preventDefault();
    if (
      currentAnnualIncome.length > 0 &&
      investmentGrowthRate.length > 0 &&
      incomeIncrementRate.length > 0 &&
      totalPeriodOfIncome.length > 0 &&
      inputCalculatorRules.numericRegex.test(currentAnnualIncome) &&
      inputCalculatorRules.numericRegex.test(investmentGrowthRate) &&
      inputCalculatorRules.numericRegex.test(incomeIncrementRate) &&
      inputCalculatorRules.numericRegex.test(totalPeriodOfIncome)
    ) {
      mfToolsService
        .calculateHumanLifeValue(
          Number(currentAnnualIncome.replace(/,/g, "")),
          Number(investmentGrowthRate.replace(/,/g, "")) / 100,
          Number(incomeIncrementRate.replace(/,/g, "")) / 100,
          Number(totalPeriodOfIncome.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          setInsuranceCorpusReqd(
            inputCalculatorRules.formatINR(
              res.data.reqdCorpus
            )
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
       Human Life Value Method - Calculation of Sum Insurance Amount
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Annual Income (₹)
            </label>
            <input
              value={currentAnnualIncome}
              onChange={onChangeCurrentAnnualIncome}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Investment Growth Rate (%)
            </label>
            <input
              value={investmentGrowthRate}
              onChange={onChangeInvestmentGrowthRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Income Increment Rate (%)
            </label>
            <input
              value={incomeIncrementRate}
              onChange={onChangeIncomeIncrementRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 8"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Total Period Of Income (Yrs)
            </label>
            <input
              value={totalPeriodOfIncome}
              onChange={onChangeTotalPeriodOfIncome}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 12"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitHumanLifeValueCalculator}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Human Life Value
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Human Life Insurance Amount
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
                     Insurance Corpus Required (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {insuranceCorpusReqd}
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
