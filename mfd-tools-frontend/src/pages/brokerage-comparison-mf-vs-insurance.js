import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function simpleSipCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [investmentAmount, setInvestmentAmount] = useState("");
  const [avgInsuranceCommission, setAvgInsuranceCommission] = useState("");
  const [trail, setTrail] = useState("");
  const [investmentReturnRate, setInvestmentReturnRate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const [insuranceCommission, setInsuranceCommission] = useState("");
  const [mfCommission, setMfCommission] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeInvestmentAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInvestmentAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeAvgInsuranceCommissionRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setAvgInsuranceCommission(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeTrail = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setTrail(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeInvestmentReturnRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInvestmentReturnRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

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

  const onSubmitBrokerageComparisonMfVsInsurance = (e) => {
    e.preventDefault();
    if (
      investmentAmount.length > 0 &&
      avgInsuranceCommission.length > 0 &&
      trail.length > 0 &&
      investmentReturnRate.length > 0 &&
      timePeriod.length > 0 &&
      inputCalculatorRules.numericRegex.test(investmentAmount) &&
      inputCalculatorRules.numericRegex.test(avgInsuranceCommission) &&
      inputCalculatorRules.numericRegex.test(trail) &&
      inputCalculatorRules.numericRegex.test(investmentReturnRate) &&
      inputCalculatorRules.numericRegex.test(timePeriod)
    ) {
      mfToolsService
        .diffBetweenInsuranceAndSIPCommission(
          Number(investmentAmount.replace(/,/g, "")),
          Number(avgInsuranceCommission.replace(/,/g, "")) / 100,
          Number(investmentReturnRate.replace(/,/g, "")) / 100,
          Number(trail.replace(/,/g, "")) / 100,
          Number(timePeriod.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.totalInsureCommission !== undefined && res.data.totalUpfrontTrail !== undefined) {
            setInsuranceCommission(
              inputCalculatorRules.formatINR(res.data.totalInsureCommission)
            );
            setMfCommission(
              inputCalculatorRules.formatINR(res.data.totalUpfrontTrail)
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
        Brokerage Comparison - MF vs Insurance
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Investment Amount For SIP/ULIP (₹)
            </label>
            <input
              value={investmentAmount}
              onChange={onChangeInvestmentAmount}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Avg Insurance Commission (%)
            </label>
            <input
              value={avgInsuranceCommission}
              onChange={onChangeAvgInsuranceCommissionRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Trail (MF Commission Rate) (%)
            </label>
            <input
              value={trail}
              onChange={onChangeTrail}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Investment Return Rate (%)
            </label>
            <input
              value={investmentReturnRate}
              onChange={onChangeInvestmentReturnRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 8"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Time Period (Yrs)
            </label>
            <input
              value={timePeriod}
              onChange={onChangeTimePeriod}
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
              onClick={onSubmitBrokerageComparisonMfVsInsurance}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate MF vs Insurance Brokerage Commission
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Brokerage Comparison - MF vs Insurance (₹)
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
                      Insurance Commission
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {insuranceCommission}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      MF Trail Commission
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {mfCommission}
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
