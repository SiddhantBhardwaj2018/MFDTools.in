import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function simpleSipCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [retirementCorpus, setRetirementCorpus] = useState("");
  const [rateOfReturn, setRateOfReturn] = useState("");

  const [prevTenYrSip, setPrevTenYrSip] = useState("");
  const [currentYrSip,setCurrentYrSip] = useState("");
  const [nextTenYrSip,setNextTenYrSip] = useState("");

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

  const onSubmitCostOfDelay = (e) => {
    e.preventDefault();
    if (
      currentAge.length > 0 &&
      retirementAge.length > 0 &&
      retirementCorpus.length > 0 &&
      rateOfReturn.length > 0 &&
      inputCalculatorRules.numericRegex.test(currentAge) &&
      inputCalculatorRules.numericRegex.test(retirementAge) &&
      inputCalculatorRules.numericRegex.test(retirementCorpus) &&
      inputCalculatorRules.numericRegex.test(rateOfReturn)
    ) {
      mfToolsService
        .calculateDifferentialReturnsByAge(
          Number(currentAge.replace(/,/g, "")),
          Number(retirementAge.replace(/,/g, "")),
          Number(retirementCorpus.replace(/,/g, "")),
          Number(rateOfReturn.replace(/,/g, "")) / 100
        )
        .then((res) => {
          console.log(res.data);
          if (
            res.data.currentYr !== undefined &&
            res.data.prevTenYr !== undefined &&
            res.data.nextTenYr !== undefined
          ) {
            setPrevTenYrSip(
              inputCalculatorRules.formatINR(
                res.data.currentYr
              )
            );
            setCurrentYrSip(
              inputCalculatorRules.formatINR(
                res.data.prevTenYr
              )
            );
            setNextTenYrSip(
              inputCalculatorRules.formatINR(
                res.data.nextTenYr
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
        SIP & Cost Of Delayed Investment
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Current Age (Yrs)
            </label>
            <input
              value={currentAge}
              onChange={onChangeCurrentAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Retirement Age (Yrs)
            </label>
            <input
              value={retirementAge}
              onChange={onChangeRetirementAge}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
            />
          </div>
           <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Expected Retirement Corpus (₹)
            </label>
            <input
              value={retirementCorpus}
              onChange={onChangeRetirementCorpus}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
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
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitCostOfDelay}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Cost Of Delay SIP
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Differential Returns By SIP (₹)
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
                      SIP Amount From Age {Number(currentAge.replace(/,/g, "")) - 10} Yrs (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {prevTenYrSip}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      SIP Amount From Age {Number(currentAge.replace(/,/g, ""))} Yrs (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {currentYrSip}
                    </th>
                  </tr>
                    <tr>
                    <th scope="col" className="px-6 py-3">
                      SIP Amount From Age {Number(currentAge.replace(/,/g, "")) + 10} Yrs (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {nextTenYrSip}
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
