import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const schemes = [
    {
      name: "Nippon India Large Cap Fund- Growth Plan -Growth Option",
      oneYear: "7.19",
      threeYear: "19.31",
      fiveYear: "19.7",
      tenYear: "14.83",
      inception: "12.84",
    },
    {
      name: "ICICI Prudential Bluechip Fund - Growth",
      oneYear: "9.28",
      threeYear: "18.16",
      fiveYear: "17.53",
      tenYear: "14.98",
      inception: "14.8",
    },
  ];

  

  const [displayResult, setDisplayResult] = useState("none");

  

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
        Scheme Return Analysis
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Fund House
            </label>
            <input
            
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Scheme Type
            </label>
            <input
              
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 18"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Time Period
            </label>
            <input
             
              type="text"
              min="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="e.g. 18"
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                       text-sm px-6 py-3 transition"
            >
              Search
            </button>
          </div>
        </form>
        <div id="dataTable" className="mt-7" style={{ display: displayResult }}>
             <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-7 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Scheme Trends Analysis Results
            </h5>
          </div>
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {[
                    "Scheme Name",
                    "1 Year (%)",
                    "3 Years (%)",
                    "5 Years (%)",
                    "10 Years (%)",
                    "Inception (%)",
                  ].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {schemes.map((scheme, idx) => (
                  <tr key={idx} className="bg-white">
                    <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                      {scheme.name}
                    </th>

                    <td className="font-bold text-center border-2 border-gray-800 px-6 py-4">
                      {scheme.oneYear}
                    </td>

                    <td className="font-bold text-center border-2 border-gray-800 px-6 py-4 bg-blue-200">
                      {scheme.threeYear}
                    </td>

                    <td className="font-bold text-center border-2 border-gray-800 px-6 py-4">
                      {scheme.fiveYear}
                    </td>

                    <td className="font-bold text-center border-2 border-gray-800 px-6 py-4">
                      {scheme.tenYear}
                    </td>

                    <td className="font-bold text-center border-2 border-gray-800 px-6 py-4">
                      {scheme.inception}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <nav className="mt-7">
              <ul className="flex justify-center items-center -space-x-px h-10 text-base">
                {[1, 2, 3].map((page) => (
                  <li key={page}>
                    <button className="flex items-center justify-center px-4 h-10 border border-gray-300 hover:bg-blue-100 hover:text-blue-700">
                      {page}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
