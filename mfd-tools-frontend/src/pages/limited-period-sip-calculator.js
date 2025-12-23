import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function limitedPeriodSip() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [sipAmt, setSipAmt] = useState("");
  const [noOfYearsSipInvestmentWasMade, setNoOfYearsSipInvestmentWasMade] =
    useState("");
  const [totalInvestmentPeriod, setTotalInvestmentPeriod] = useState("");
  const [growthRate, setGrowthRate] = useState("");

  const [totalSipInvestment, setTotalSipInvestment] = useState("");
  const [futureValueInvestment, setFutureValueInvestment] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

  const onChangeSipAmt = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setSipAmt(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeNoOfYearsSipInvestmentWasMade = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setNoOfYearsSipInvestmentWasMade(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeTotalInvestmentPeriod = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setTotalInvestmentPeriod(
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

  const onSubmitLimitedPeriodSip = (e) => {
    e.preventDefault();
    if (
      sipAmt.length > 0 &&
      noOfYearsSipInvestmentWasMade.length > 0 &&
      totalInvestmentPeriod.length > 0 &&
      growthRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(sipAmt) &&
      inputCalculatorRules.numericRegex.test(noOfYearsSipInvestmentWasMade) &&
      inputCalculatorRules.numericRegex.test(totalInvestmentPeriod) &&
      inputCalculatorRules.numericRegex.test(growthRate)
    ) {
      mfToolsService
        .calculateLimitedPeriodSip(
          Number(sipAmt.replace(/,/g, "")),
          Number(noOfYearsSipInvestmentWasMade.replace(/,/g, "")),
          Number(totalInvestmentPeriod.replace(/,/g, "")),
          Number(growthRate.replace(/,/g, "")) / 100
        )
        .then((res) => {
          console.log(res.data);
          setTotalSipInvestment(
            inputCalculatorRules.formatINR(
              Number(sipAmt.replace(/,/g, "")) *
                Number(noOfYearsSipInvestmentWasMade.replace(/,/g, "")) *
                12
            )
          );
          setFutureValueInvestment(
            inputCalculatorRules.formatINR(res.data.result)
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
        Limited Period SIP
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              SIP Amount (₹)
            </label>
            <input
              value={sipAmt}
              onChange={onChangeSipAmt}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 10,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              SIP Investment Made In Years
            </label>
            <input
              value={noOfYearsSipInvestmentWasMade}
              onChange={onChangeNoOfYearsSipInvestmentWasMade}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Total Investment Period (Yrs)
            </label>
            <input
              value={totalInvestmentPeriod}
              onChange={onChangeTotalInvestmentPeriod}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 20"
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
              placeholder="e.g. 12"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              onClick={onSubmitLimitedPeriodSip}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Limited Period SIP
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Limited Period SIP Maturity Amount
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
                      Total SIP Investment (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {totalSipInvestment}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Future Value of Investment (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {futureValueInvestment}
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
