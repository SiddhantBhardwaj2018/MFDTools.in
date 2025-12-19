import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";

export default function panel() {
  const router = useRouter();

  const [childAge, setChildAge] = useState("");
  const [educationCost, setEducationCost] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [collegeAge, setCollegeAge] = useState("");
  const [currentInvestmentAmt, setCurrentInvestmentAmt] = useState("");
  const [inflationRate, setInflationRate] = useState("");

  const onChangeChildAge = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setChildAge(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCollegeAge = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCollegeAge(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeEducationCost = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setEducationCost(
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
    if(
        inputCalculatorRules.numericRegex.test(childAge) &&
        inputCalculatorRules.numericRegex.test(educationCost) &&
        inputCalculatorRules.numericRegex.test(collegeAge) &&
        inputCalculatorRules.numericRegex.test(returnRate) &&
        inputCalculatorRules.numericRegex.test(currentInvestmentAmt) &&
        inputCalculatorRules.numericRegex.test(inflationRate)
    ){
        mfToolsService.calculateGoalInvestPlan(
            Number(childAge.replace(/,/g, "")),
            Number(collegeAge.replace(/,/g, "")),
            Number(educationCost.replace(/,/g, "")),
            Number(returnRate.replace(/,/g, "")),
            Number(inflationRate.replace(/,/g, "")),
            Number(currentInvestmentAmt.replace(/,/g, "")),
        ).then((res) => {
            console.log(res.data);
            window.alert("success");
        }).catch((err) => {
            if (err.status == 401) {
            setTimeout(() => {
              logout();
              window.alert("logging out");
            }, 1000);
          } else {
            window.alert("failure")
          }
        })
    }else{
        window.alert("failure");
    }
  }
  

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
        Education Planning
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Age */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Age of Child (Years)
            </label>
            <input
              value={childAge}
              onChange={onChangeChildAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 5"
            />
          </div>

          {/* College Age */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              College-Going Age (Years)
            </label>
            <input
              value={collegeAge}
              onChange={onChangeCollegeAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 18"
            />
          </div>

          {/* Current Education Cost */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Cost of Education (₹)
            </label>
            <input
              value={educationCost}
              onChange={onChangeEducationCost}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 5,00,000"
            />
          </div>

          {/* Current Investment */}
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

          {/* Expected Return */}
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

          {/* Inflation */}
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

          {/* Submit */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitGoalInvestPlan}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Education Corpus
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
