import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function marriagePlanning() {
  const router = useRouter();

  const { logout } = useContext(AuthContext);

  const [currentAge, setCurrentAge] = useState("");
  const [houseCost, setHouseCost] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [houseAge, setHouseAge] = useState("");
  const [currentInvestmentAmt, setCurrentInvestmentAmt] = useState("");
  const [inflationRate, setInflationRate] = useState("");

  const [houseFutureCost,setHouseFutureCost] = useState("");
  const [investmentAppreciation,setInvestmentAppreciation] = useState("");
  const [deficitCorpus,setDeficitCorpus] = useState("");
  const [lumpsumFundingReqd,setLumpsumFundingReqd] = useState("");
  const [monthlyInvestmentReqd,setMonthlyInvestmentReqd] = useState("");

  const [displayResult,setDisplayResult] = useState("none");
 
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

  const onChangeHouseAge = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setHouseAge(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

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

  const onChangeReturnRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setReturnRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCurrentInvestmentAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCurrentInvestmentAmt(
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
      houseCost.length > 0 &&
      houseAge.length > 0 &&
      returnRate.length > 0 &&
      currentInvestmentAmt.length > 0 &&
      inflationRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(currentAge) &&
      inputCalculatorRules.numericRegex.test(houseCost) &&
      inputCalculatorRules.numericRegex.test(houseAge) &&
      inputCalculatorRules.numericRegex.test(returnRate) &&
      inputCalculatorRules.numericRegex.test(currentInvestmentAmt) &&
      inputCalculatorRules.numericRegex.test(inflationRate)
    ) {
      mfToolsService
        .calculateGoalInvestPlan(
          Number(currentAge.replace(/,/g, "")),
          Number(houseAge.replace(/,/g, "")),
          Number(houseCost.replace(/,/g, "")),
          Number(returnRate.replace(/,/g, "")) / 100,
          Number(inflationRate.replace(/,/g, "")) / 100,
          Number(currentInvestmentAmt.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          setHouseFutureCost(inputCalculatorRules.formatINR(res.data.futureCost));
          setInvestmentAppreciation(inputCalculatorRules.formatINR(res.data.investAppAmt));
          setDeficitCorpus(inputCalculatorRules.formatINR(res.data.deficitCorpus));
          setLumpsumFundingReqd(inputCalculatorRules.formatINR(res.data.lumpsumAmt));
          setMonthlyInvestmentReqd(inputCalculatorRules.formatINR(res.data.monthlyInvestReqd));
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
        House Planning
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
              Expected Age Of Purchasing House (Years)
            </label>
            <input
              value={houseAge}
              onChange={onChangeHouseAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 18"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Cost of House (₹)
            </label>
            <input
              value={houseCost}
              onChange={onChangeHouseCost}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 5,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Amount You Can Invest (₹)
            </label>
            <input
              value={currentInvestmentAmt}
              onChange={onChangeCurrentInvestmentAmount}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 1,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expected Rate of Return (%)
            </label>
            <input
              value={returnRate}
              onChange={onChangeReturnRate}
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
              Calculate House Corpus
            </button>
          </div>
        </form>
        <div id="dataTable" style={{display:displayResult}}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              House Planning Details
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
                      Future Cost Of House
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {houseFutureCost}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Appreciation Of Investments Made Today
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {investmentAppreciation}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Deficit Corpus
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {deficitCorpus}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3 text-red-500">
                      Lumpsum Funding Required
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {lumpsumFundingReqd}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3 text-red-500">
                      Monthly Investment Required
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {monthlyInvestmentReqd}
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
