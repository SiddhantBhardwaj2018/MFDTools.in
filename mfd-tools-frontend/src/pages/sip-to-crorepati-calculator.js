import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function emiVersusSipCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [targetAmtReqd, setTargetAmtReqd] = useState("");
  const [timeToAchieveTarget, setTimeToAchieveTarget] = useState("");
  const [growthRate, setGrowthRate] = useState("");

  const [reqdTargetSIP, setReqdTargetSIP] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeTargetAmtReqd = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setTargetAmtReqd(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeTimeToAchieveTarget = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setTimeToAchieveTarget(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeGrowthRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setGrowthRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onSubmitTargetSIPToBecomeCrorepati = (e) => {
    e.preventDefault();
    if (
      targetAmtReqd.length > 0 &&
      timeToAchieveTarget.length > 0 &&
      growthRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(targetAmtReqd) &&
      inputCalculatorRules.numericRegex.test(timeToAchieveTarget) &&
      inputCalculatorRules.numericRegex.test(growthRate)
    ) {
      mfToolsService
        .calculatePMT(
          Number(growthRate.replace(/,/g, "")) / 1200,
          Number(timeToAchieveTarget.replace(/,/g, "")) * 12,
          Number(targetAmtReqd.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          setReqdTargetSIP(inputCalculatorRules.formatINR(res.data.pmt));
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
        Target SIP To Become A Crorepati
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Target Amount Required (₹)
            </label>
            <input
              value={targetAmtReqd}
              onChange={onChangeTargetAmtReqd}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 50,00,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Time To Achieve Target (Yrs)
            </label>
            <input
              value={timeToAchieveTarget}
              onChange={onChangeTimeToAchieveTarget}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Growth Rate (%)
            </label>
            <input
              value={growthRate}
              onChange={onChangeGrowthRate}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 6"
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitTargetSIPToBecomeCrorepati}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Target SIP
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Target SIP / Plan a Crorepati Target
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
                      Required Target SIP To Become Crorepati (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {reqdTargetSIP}
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
