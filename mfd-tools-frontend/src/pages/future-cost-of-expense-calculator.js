import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function emiVersusSipCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [timePeriod, setTimePeriod] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [inflationRate, setInflationRate] = useState("");

  const [futureValueExpense, setFutureValueExpense] = useState("");

  const [displayResult, setDisplayResult] = useState("none");

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

  const onChangeExpenseAmt = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setExpenseAmt(
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

  const onSubmitFutureCostOfExpense = (e) => {
    e.preventDefault();
    if (
      timePeriod.length > 0 &&
      expenseAmt.length > 0 &&
      inflationRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(timePeriod) &&
      inputCalculatorRules.numericRegex.test(expenseAmt) &&
      inputCalculatorRules.numericRegex.test(inflationRate)
    ) {
      mfToolsService
        .calculateFV(
          Number(inflationRate.replace(/,/g, "")) / 100,
          Number(timePeriod.replace(/,/g, "")),
          0,
          Number(expenseAmt.replace(/,/g, ""))
        )
        .then((res) => {
          console.log(res.data);
          setFutureValueExpense(inputCalculatorRules.formatINR(res.data.futureValue ));
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
        Future Cost of Expense
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              For Time Period (Yrs)
            </label>
            <input
              value={timePeriod}
              onChange={onChangeTimePeriod}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 25"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Today's Expense Amount (₹)
            </label>
            <input
              value={expenseAmt}
              onChange={onChangeExpenseAmt}
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 50,000"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Inflation Rate (%)
            </label>
            <input
              value={inflationRate}
              onChange={onChangeInflationRate}
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
              onClick={onSubmitFutureCostOfExpense}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Calculate Future Cost Of Expense
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Future Cost of Expense
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
                      Present Value of Expense (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {expenseAmt}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Future Value of Expense (₹){" "}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {futureValueExpense}
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
