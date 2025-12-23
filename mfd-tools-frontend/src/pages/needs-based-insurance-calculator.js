import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function needsBasedInsuranceCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [currentAnnualIncome, setCurrentAnnualIncome] = useState("");
  const [investmentGrowthRate, setInvestmentGrowthRate] = useState("");
  const [incomeIncrementRate, setIncomeIncrementRate] = useState("");
  const [totalPeriodOfIncome, setTotalPeriodOfIncome] = useState("");
  const [outstandingLoanAmount, setOutstandingLoanAmount] = useState("");
  const [childEducationLiability, setChildEducationLiability] = useState("");
  const [marriageLiability, setMarriageLiability] = useState("");
  const [availableDeductibleInsurance, setAvailableDeductibleInsurance] =
    useState("");
  const [currentInvestmentValue, setCurrentInvestmentValue] = useState("");

  const [humanLifeInsuranceCorpusReqd, setHumanLifeInsuranceCorpusReqd] =
    useState("");
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

  const onChangeOutstandingLoanAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setOutstandingLoanAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeChildEducationLiability = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setChildEducationLiability(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeMarriageLiability = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setMarriageLiability(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeAvailableDeductibleInsurance = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setAvailableDeductibleInsurance(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCurrentInvestmentValue = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCurrentInvestmentValue(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onSubmitNeedsBasedInsuranceValueCalculator = (e) => {
    e.preventDefault();
    if (
      currentAnnualIncome.length > 0 &&
      investmentGrowthRate.length > 0 &&
      incomeIncrementRate.length > 0 &&
      totalPeriodOfIncome.length > 0 &&
      outstandingLoanAmount.length > 0 &&
      childEducationLiability.length > 0 &&
      marriageLiability.length > 0 &&
      availableDeductibleInsurance.length > 0 &&
      currentInvestmentValue.length > 0 &&
      inputCalculatorRules.numericRegex.test(currentAnnualIncome) &&
      inputCalculatorRules.numericRegex.test(investmentGrowthRate) &&
      inputCalculatorRules.numericRegex.test(incomeIncrementRate) &&
      inputCalculatorRules.numericRegex.test(totalPeriodOfIncome) &&
      inputCalculatorRules.numericRegex.test(outstandingLoanAmount) &&
      inputCalculatorRules.numericRegex.test(childEducationLiability) &&
      inputCalculatorRules.numericRegex.test(marriageLiability) &&
      inputCalculatorRules.numericRegex.test(availableDeductibleInsurance) &&
      inputCalculatorRules.numericRegex.test(currentInvestmentValue)
    ) {
      mfToolsService
        .calculateNeedsBasedInsurance(
          Number(currentAnnualIncome.replace(/,/g, "")),
          Number(investmentGrowthRate.replace(/,/g, "")) / 100,
          Number(incomeIncrementRate.replace(/,/g, "")) / 100,
          Number(totalPeriodOfIncome.replace(/,/g, "")),
          Number(outstandingLoanAmount.replace(/,/g, "")),
          Number(childEducationLiability.replace(/,/g, "")),
          Number(marriageLiability.replace(/,/g, "")),
          Number(availableDeductibleInsurance.replace(/,/g, "")),
          Number(currentInvestmentValue.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          setHumanLifeInsuranceCorpusReqd(
            inputCalculatorRules.formatINR(res.data.reqdCorpus)
          );
          setInsuranceCorpusReqd(
            inputCalculatorRules.formatINR(res.data.additionalReqdCorpus)
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
        Needs Based Method - Calculation of Sum Insurance Amount
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
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Outstanding Loan Amount (₹)
            </label>
            <input
              value={outstandingLoanAmount}
              onChange={onChangeOutstandingLoanAmount}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Child Education Liability (₹)
            </label>
            <input
              value={childEducationLiability}
              onChange={onChangeChildEducationLiability}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Marriage / Incidental Liability (₹)
            </label>
            <input
              value={marriageLiability}
              onChange={onChangeMarriageLiability}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Available Deductible Insurance (₹)
            </label>
            <input
              value={availableDeductibleInsurance}
              onChange={onChangeAvailableDeductibleInsurance}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Investment Value (₹)
            </label>
            <input
              value={currentInvestmentValue}
              onChange={onChangeCurrentInvestmentValue}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,00,000"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitNeedsBasedInsuranceValueCalculator}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Needs Based InsuranceValue
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Needs Based Life Insurance Amount
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
                      Insurance Corpus Required (As Per Human Life Value Method){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {humanLifeInsuranceCorpusReqd}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Insurance Corpus Required (As Per Needs-Based Approach){" "}
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
