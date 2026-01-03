import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function businessPlanning() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [resultSchemes, setResultSchemes] = useState({});

  const triggerSchemeReturnPull = () => {
    mfToolsService
      .getWeeklyBestAndWorstMFSchemePerformers()
      .then((res) => {
        console.log(res.data);
        setResultSchemes(res.data);
      })
      .catch((err) => {
        if (err.status === 401) {
          logout();
        }
      });
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
    triggerSchemeReturnPull();
  }, []);

  return (
    <>
      <h1 className="text-center font-semibold mb-10 text-3xl">
        Weekly Fund Tracker Analysis
      </h1>
      <div style={{ margin: "0 5%" }}>
        <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Large Cap Funds Analysis (Top Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["large-cap"] != undefined ? (
                  resultSchemes["large-cap"]["top"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-green-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
          <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Large Cap Funds Analysis (Bottom Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["large-cap"] != undefined ? (
                  resultSchemes["large-cap"]["worst"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-red-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
         <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Mid Cap Funds Analysis (Top Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["mid-cap"] != undefined ? (
                  resultSchemes["mid-cap"]["top"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-green-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
         <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Mid Cap Funds Analysis (Bottom Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["mid-cap"] != undefined ? (
                  resultSchemes["mid-cap"]["worst"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-red-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Small Cap Funds Analysis (Top Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["small-cap"] != undefined ? (
                  resultSchemes["small-cap"]["top"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-green-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
         <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Small Cap Funds Analysis (Bottom Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["small-cap"] != undefined ? (
                  resultSchemes["small-cap"]["worst"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-red-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
          <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Multi Cap Funds Analysis (Top Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["multi-cap"] != undefined ? (
                  resultSchemes["multi-cap"]["top"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4  bg-green-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div id="dataTable" className="mt-7 mb-10" style={{ display: "block" }}>
          <div className="relative overflow-x-auto mt-5">
            <h5 className="mt-7 leading-none text-center text-lg mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Multi Cap Funds Analysis (Bottom Performing Schemes)
            </h5>
            <table className="w-full text-sm text-left text-gray-500 border-2 border-gray-800 border-collapse">
              <thead
                className="text-xs uppercase"
                style={{ background: "#063599" }}
              >
                <tr>
                  {["Scheme Name", "Growth (%)"].map((head) => (
                    <th key={head} className="text-white text-center px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {resultSchemes["multi-cap"] != undefined ? (
                  resultSchemes["multi-cap"]["worst"].map((scheme, idx) => (
                    <tr key={idx} className="bg-white">
                      <th className="px-6 py-4 font-bold text-gray-900 border-2 border-gray-800 text-center whitespace-normal">
                        {scheme.scheme}
                      </th>

                      <td
                        className={`font-bold text-center border-2 border-gray-800 px-6 py-4 bg-red-300`}
                      >
                        {scheme.growth}
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
