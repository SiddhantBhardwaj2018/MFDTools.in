import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [retirementCorpus, setRetirementCorpus] = useState("");
  const [investGrowthRate, setInvestGrowthRate] = useState("");
  const [swpReturnRate, setSwpReturnRate] = useState("");
  const [corpusLeft, setCorpusLeft] = useState("");

  const [swpAmt, setSwpAmt] = useState("");
  const [maturityCorpusAmt, setMaturityCorpusAmt] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeRetirementCorpus = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setRetirementCorpus(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeInvestGrowthRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInvestGrowthRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeSwpReturnRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setSwpReturnRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCorpusLeft = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCorpusLeft(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };


  const onSubmitImmediateSWPPlan = (e) => {
    e.preventDefault();
    if (
      retirementCorpus.length > 0 &&
      investGrowthRate.length > 0 &&
      swpReturnRate.length > 0 &&
      corpusLeft.length > 0 &&
      inputCalculatorRules.numericRegex.test(retirementCorpus) &&
      inputCalculatorRules.numericRegex.test(investGrowthRate) &&
      inputCalculatorRules.numericRegex.test(swpReturnRate) &&
      inputCalculatorRules.numericRegex.test(corpusLeft)
    ) {
      mfToolsService
        .calculateImmediateSWPPlanning(
          Number(retirementCorpus.replace(/,/g, "")),
          Number(investGrowthRate.replace(/,/g, "")) / 100,
          Number(swpReturnRate.replace(/,/g, "")) / 100,
          Number(corpusLeft.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          setSwpAmt(
            inputCalculatorRules.formatINR(res.data.swpAmt)
          );
          setMaturityCorpusAmt(
            inputCalculatorRules.formatINR(res.data.maturityCorpusAmt)
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
        Immediate SWP Calculator
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Retirement Corpus (₹)
            </label>
            <input
              value={retirementCorpus}
              onChange={onChangeRetirementCorpus}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 50,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Investment Growth Rate (%)
            </label>
            <input
              value={investGrowthRate}
              onChange={onChangeInvestGrowthRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 8"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              SWP Return Rate (%)
            </label>
            <input
              value={swpReturnRate}
              onChange={onChangeSwpReturnRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 6"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              No. Of Years For SWP Withdrawal (Yrs)
            </label>
            <input
              value={corpusLeft}
              onChange={onChangeCorpusLeft}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 25"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitImmediateSWPPlan}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Immediate SWP Corpus
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Immediate SWP Calculator Maturity Amount
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
                     SWP Amount After Retirement (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {swpAmt}
                    </th>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Corpus Maturity Amount (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {maturityCorpusAmt}
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
