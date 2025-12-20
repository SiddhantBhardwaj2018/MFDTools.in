import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { logout } = useContext(AuthContext);

  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState("");
  const [preRetirementCorpusReturn, setPreRetirementCorpusReturn] =
    useState("");
  const [postRetirementCorpusReturn, setPostRetirementCorpusReturn] =
    useState("");
  const [inflationRate, setInflationRate] = useState("");

  const [retirementFutureCorpus, setRetirementFutureCorpus] = useState("");
  const [monthlyInvestmentReqd, setMonthlyInvestmentReqd] = useState("");
  const [monthlySIPRetirement, setMonthlySIPRetirement] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeCurrentAge = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCurrentAge(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeRetirementAge = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setRetirementAge(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeLifeExpectancy = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setLifeExpectancy(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCurrentMonthlyExpense = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCurrentMonthlyExpense(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePreRetirementCorpusReturn = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPreRetirementCorpusReturn(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePostRetirementCorpusReturn = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPostRetirementCorpusReturn(
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

  const onSubmitGoalInvestPlan = (e) => {
    e.preventDefault();
    if (
      currentAge.length > 0 &&
      lifeExpectancy.length > 0 &&
      retirementAge.length > 0 &&
      currentMonthlyExpense.length > 0 &&
      preRetirementCorpusReturn.length > 0 &&
      postRetirementCorpusReturn.length > 0 &&
      inflationRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(currentAge) &&
      inputCalculatorRules.numericRegex.test(lifeExpectancy) &&
      inputCalculatorRules.numericRegex.test(retirementAge) &&
      inputCalculatorRules.numericRegex.test(currentMonthlyExpense) &&
      inputCalculatorRules.numericRegex.test(preRetirementCorpusReturn) &&
      inputCalculatorRules.numericRegex.test(postRetirementCorpusReturn) &&
      inputCalculatorRules.numericRegex.test(inflationRate)
    ) {
      mfToolsService
        .calculateRetirementPlan(
          Number(currentAge.replace(/,/g, "")),
          Number(retirementAge.replace(/,/g, "")),
          Number(lifeExpectancy.replace(/,/g, "")),
          Number(currentMonthlyExpense.replace(/,/g, "")),
          Number(preRetirementCorpusReturn.replace(/,/g, "")) / 100,
          Number(postRetirementCorpusReturn.replace(/,/g, "")) / 100,
          Number(inflationRate.replace(/,/g, "")) / 100
        )
        .then((res) => {
          console.log(res.data);
          setMonthlyInvestmentReqd(
            inputCalculatorRules.formatINR(res.data.monthlyRequirementAtRetirement)
          );
          setRetirementFutureCorpus(
            inputCalculatorRules.formatINR(res.data.corpusAtRetirement)
          );
          setMonthlySIPRetirement(
            inputCalculatorRules.formatINR(res.data.monthlySIPAmtForInvestment)
          )
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
        Retirement Planning
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Age (Years)
            </label>
            <input
              value={currentAge}
              onChange={onChangeCurrentAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Retirement Age (Years)
            </label>
            <input
              value={retirementAge}
              onChange={onChangeRetirementAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 18"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Life Expectancy (Years)
            </label>
            <input
              value={lifeExpectancy}
              onChange={onChangeLifeExpectancy}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 18"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Monthly Expense (₹)
            </label>
            <input
              value={currentMonthlyExpense}
              onChange={onChangeCurrentMonthlyExpense}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 5,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Pre-Retirement Corpus Return (%)
            </label>
            <input
              value={preRetirementCorpusReturn}
              onChange={onChangePreRetirementCorpusReturn}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 1,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Post-Retirement Corpus Return (%)
            </label>
            <input
              value={postRetirementCorpusReturn}
              onChange={onChangePostRetirementCorpusReturn}
              type="text"
              step="0.1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 12"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expected Inflation Rate (%)
            </label>
            <input
              value={inflationRate}
              onChange={onChangeInflationRate}
              type="text"
              step="0.1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 6"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitGoalInvestPlan}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Retirement Corpus
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Retirement Planning Details
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
                      Future Corpus Requirements For Retirement
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {retirementFutureCorpus}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Monthly Expenses After Retirement
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {monthlyInvestmentReqd}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Monthly SIP To Reach Retirement Corpus
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {monthlySIPRetirement}
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
