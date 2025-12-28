import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import inputCalculatorRules from "../../helpers/inputCalculatorRules";
import mfToolsService from "../../helpers/mfTools";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function portfolioForecastingCalculator() {
  const router = useRouter();

  const { checkUserLoggedIn, logout } = useContext(AuthContext);

  const [ppfAmount, setPpfAmount] = useState("0");
  const [pfAmount, setPfAmount] = useState("0");
  const [nscAmount, setNscAmount] = useState("0");
  const [postalAmount, setPostalAmount] = useState("0");
  const [bankAmount, setBankAmount] = useState("0");
  const [companyAmount, setCompanyAmount] = useState("0");
  const [insuranceAmount, setInsuranceAmount] = useState("0");
  const [equityPortfolioAmount, setEquityPortfolioAmount] = useState("0");
  const [balancedPortfolioAmount, setBalancePortfolioAmount] = useState("0");
  const [nonLiquidDebtPortfolioAmount, setNonLiquidDebtPortfolioAmount] =
    useState("0");
  const [liquidDebtPortfolioAmount, setLiquidDebtPortfolioAmount] =
    useState("0");
  const [sipAmount, setSipAmount] = useState("0");
  const [rdAmount, setRdAmount] = useState("0");

  const [ppfRate, setPpfRate] = useState("7");
  const [pfRate, setPfRate] = useState("7");
  const [nscRate, setNscRate] = useState("7");
  const [postalRate, setPostalRate] = useState("7");
  const [bankRate, setBankRate] = useState("7");
  const [companyRate, setCompanyRate] = useState("7");
  const [insuranceRate, setInsuranceRate] = useState("7");
  const [equityPortfolioRate, setEquityPortfolioRate] = useState("7");
  const [balancedPortfolioRate, setBalancedPortfolioRate] = useState("7");
  const [liquidDebtPortfolioRate, setLiquidDebtPortfolioRate] = useState("7");
  const [nonLiquidDebtPortfolioRate, setNonLiquidDebtPortfolioRate] =
    useState("7");
  const [sipRate, setSipRate] = useState("7");
  const [rdRate, setRdRate] = useState("7");

  const [outputPortfolio, setOutputPortfolio] = useState({
    35: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
    20: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
    5: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
    25: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
    10: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
    30: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
    15: {
      insurance: 0.0,
      ppf: 0.0,
      nonLiquidDebtPortfolio: 0.0,
      swpReturn: 0.0,
      equity: 0.0,
      bank: 0.0,
      rd: 0.0,
      balance: 0.0,
      pf: 0.0,
      liquidPortfolio: 0.0,
      company: 0.0,
      postal: 0.0,
      sip: 0.0,
      nsc: 0.0,
      balancedPortfolio: 0.0,
    },
  });

  const [displayResult, setDisplayResult] = useState("none");

  const onChangePpfAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPpfAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePfAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPfAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeNSCAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setNscAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePostalAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPostalAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeBankAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setBankAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCompanyAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCompanyAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeInsuranceAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInsuranceAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeEquityPortfolioAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setEquityPortfolioAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeBalancedPortfolioAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setBalancePortfolioAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeLiquidDebtPortfolioAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setLiquidDebtPortfolioAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeNonLiquidDebtPortfolioAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setNonLiquidDebtPortfolioAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeSipAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setSipAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeRdAmount = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setRdAmount(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePpfRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPpfRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePfRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPfRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeNscRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setNscRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangePostalRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setPostalRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeBankRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setBankRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeCompanyRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setCompanyRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeInsuranceRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setInsuranceRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeEquityPortfolioRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setEquityPortfolioRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeBalancedPortfolioRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setBalancedPortfolioRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeLiquidDebtPortfolioRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setLiquidDebtPortfolioRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeNonLiquidDebtPortfolioRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setNonLiquidDebtPortfolioRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeSipRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setSipRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const onChangeRdRate = (e) => {
    if (inputCalculatorRules.numericRegex.test(e.target.value)) {
      setRdRate(
        inputCalculatorRules.modifyNumberValueForLocaleRepresentation(
          e.target.value
        )
      );
    } else {
      window.alert("failure");
    }
  };

  const assets = [
    {
      key: "ppf",
      label: "PPF",
      amount: ppfAmount,
      rate: ppfRate,
      onChangeAmountHandler: onChangePpfAmount,
      onChangeRateHandler: onChangePpfRate,
    },
    {
      key: "pf",
      label: "PF",
      amount: pfAmount,
      rate: pfRate,
      onChangeAmountHandler: onChangePfAmount,
      onChangeRateHandler: onChangePfRate,
    },
    {
      key: "nsc",
      label: "NSC",
      amount: nscAmount,
      rate: nscRate,
      onChangeAmountHandler: onChangeNSCAmount,
      onChangeRateHandler: onChangeNscRate,
    },
    {
      key: "postal",
      label: "Postal",
      amount: postalAmount,
      rate: postalRate,
      onChangeAmountHandler: onChangePostalAmount,
      onChangeRateHandler: onChangePostalRate,
    },
    {
      key: "bank",
      label: "Bank",
      amount: bankAmount,
      rate: bankRate,
      onChangeAmountHandler: onChangeBankAmount,
      onChangeRateHandler: onChangeBankRate,
    },
    {
      key: "company",
      label: "Company",
      amount: companyAmount,
      rate: companyRate,
      onChangeAmountHandler: onChangeCompanyAmount,
      onChangeRateHandler: onChangeCompanyRate,
    },
    {
      key: "insurance",
      label: "Insurance",
      amount: insuranceAmount,
      rate: insuranceRate,
      onChangeAmountHandler: onChangeInsuranceAmount,
      onChangeRateHandler: onChangeInsuranceRate,
    },
    {
      key: "equity",
      label: "Equity Portfolio",
      amount: equityPortfolioAmount,
      rate: equityPortfolioRate,
      onChangeAmountHandler: onChangeEquityPortfolioAmount,
      onChangeRateHandler: onChangeEquityPortfolioRate,
    },
    {
      key: "balanced",
      label: "Balanced Portfolio",
      amount: balancedPortfolioAmount,
      rate: balancedPortfolioRate,
      onChangeAmountHandler: onChangeBalancedPortfolioAmount,
      onChangeRateHandler: onChangeBalancedPortfolioRate,
    },
    {
      key: "nonLiquidDebt",
      label: "Non-Liquid Debt Portfolio",
      amount: nonLiquidDebtPortfolioAmount,
      rate: nonLiquidDebtPortfolioRate,
      onChangeAmountHandler: onChangeNonLiquidDebtPortfolioAmount,
      onChangeRateHandler: onChangeNonLiquidDebtPortfolioRate,
    },
    {
      key: "liquidDebt",
      label: "Liquid Debt Portfolio",
      amount: liquidDebtPortfolioAmount,
      rate: liquidDebtPortfolioRate,
      onChangeAmountHandler: onChangeLiquidDebtPortfolioAmount,
      onChangeRateHandler: onChangeLiquidDebtPortfolioRate,
    },
    {
      key: "sip",
      label: "SIP",
      amount: sipAmount,
      rate: sipRate,
      onChangeAmountHandler: onChangeSipAmount,
      onChangeRateHandler: onChangeSipRate,
    },
    {
      key: "rd",
      label: "RD",
      amount: rdAmount,
      rate: rdRate,
      onChangeAmountHandler: onChangeRdAmount,
      onChangeRateHandler: onChangeRdRate,
    },
  ];

  const onSubmitPortfolioForecastCalculator = (e) => {
    e.preventDefault();
    if (
      ppfAmount.length > 0 &&
      ppfRate.length > 0 &&
      pfAmount.length > 0 &&
      pfRate.length > 0 &&
      nscAmount.length > 0 &&
      nscRate.length > 0 &&
      postalAmount.length > 0 &&
      postalRate.length > 0 &&
      bankAmount.length > 0 &&
      bankRate.length > 0 &&
      companyAmount.length > 0 &&
      companyRate.length > 0 &&
      insuranceAmount.length > 0 &&
      insuranceRate.length > 0 &&
      equityPortfolioAmount.length > 0 &&
      equityPortfolioRate.length > 0 &&
      balancedPortfolioAmount.length > 0 &&
      balancedPortfolioRate.length > 0 &&
      nonLiquidDebtPortfolioAmount.length > 0 &&
      nonLiquidDebtPortfolioRate.length > 0 &&
      liquidDebtPortfolioAmount.length > 0 &&
      liquidDebtPortfolioRate.length > 0 &&
      sipAmount.length > 0 &&
      sipRate.length > 0 &&
      rdAmount.length > 0 &&
      rdRate.length > 0 &&
      inputCalculatorRules.numericRegex.test(ppfAmount) &&
      inputCalculatorRules.numericRegex.test(ppfRate) &&
      inputCalculatorRules.numericRegex.test(pfAmount) &&
      inputCalculatorRules.numericRegex.test(pfRate) &&
      inputCalculatorRules.numericRegex.test(nscAmount) &&
      inputCalculatorRules.numericRegex.test(nscRate) &&
      inputCalculatorRules.numericRegex.test(postalAmount) &&
      inputCalculatorRules.numericRegex.test(postalRate) &&
      inputCalculatorRules.numericRegex.test(companyAmount) &&
      inputCalculatorRules.numericRegex.test(companyRate) &&
      inputCalculatorRules.numericRegex.test(bankAmount) &&
      inputCalculatorRules.numericRegex.test(bankRate) &&
      inputCalculatorRules.numericRegex.test(insuranceAmount) &&
      inputCalculatorRules.numericRegex.test(insuranceRate) &&
      inputCalculatorRules.numericRegex.test(equityPortfolioAmount) &&
      inputCalculatorRules.numericRegex.test(equityPortfolioRate) &&
      inputCalculatorRules.numericRegex.test(nonLiquidDebtPortfolioAmount) &&
      inputCalculatorRules.numericRegex.test(nonLiquidDebtPortfolioRate) &&
      inputCalculatorRules.numericRegex.test(liquidDebtPortfolioAmount) &&
      inputCalculatorRules.numericRegex.test(liquidDebtPortfolioRate) &&
      inputCalculatorRules.numericRegex.test(balancedPortfolioAmount) &&
      inputCalculatorRules.numericRegex.test(balancedPortfolioRate) &&
      inputCalculatorRules.numericRegex.test(liquidDebtPortfolioAmount) &&
      inputCalculatorRules.numericRegex.test(liquidDebtPortfolioRate) &&
      inputCalculatorRules.numericRegex.test(sipAmount) &&
      inputCalculatorRules.numericRegex.test(sipRate) &&
      inputCalculatorRules.numericRegex.test(rdAmount) &&
      inputCalculatorRules.numericRegex.test(rdRate)
    ) {
      mfToolsService
        .calculateModelFinancialPortfolio(
          Number(ppfAmount.replace(/,/g, "")),
          Number(ppfRate.replace(/,/g, "")) / 100,
          Number(pfAmount.replace(/,/g, "")),
          Number(pfRate.replace(/,/g, "")) / 100,
          Number(nscAmount.replace(/,/g, "")),
          Number(nscRate.replace(/,/g, "")) / 100,
          Number(postalAmount.replace(/,/g, "")),
          Number(postalRate.replace(/,/g, "")) / 100,
          Number(bankAmount.replace(/,/g, "")),
          Number(bankRate.replace(/,/g, "")) / 100,
          Number(companyAmount.replace(/,/g, "")),
          Number(companyRate.replace(/,/g, "")) / 100,
          Number(insuranceAmount.replace(/,/g, "")),
          Number(insuranceRate.replace(/,/g, "")) / 100,
          Number(equityPortfolioAmount.replace(/,/g, "")),
          Number(equityPortfolioRate.replace(/,/g, "")) / 100,
          Number(balancedPortfolioAmount.replace(/,/g, "")),
          Number(balancedPortfolioRate.replace(/,/g, "")) / 100,
          Number(nonLiquidDebtPortfolioAmount.replace(/,/g, "")),
          Number(nonLiquidDebtPortfolioRate.replace(/,/g, "")) / 100,
          Number(liquidDebtPortfolioAmount.replace(/,/g, "")),
          Number(liquidDebtPortfolioRate.replace(/,/g, "")) / 100,
          Number(sipAmount.replace(/,/g, "")),
          Number(sipRate.replace(/,/g, "")) / 100,
          Number(rdAmount.replace(/,/g, "")),
          Number(rdRate.replace(/,/g, "")) / 100
        )
        .then((res) => {
          console.log(res.data);
          setOutputPortfolio(res.data.outputPortfolio);
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
        Portfolio Forecasting
      </h1>
      <div style={{ margin: "0 8%" }}>
        <form
          className="mx-auto"
          style={{ marginTop: "2%" }}
          onSubmit={onSubmitPortfolioForecastCalculator}
        >
          <div
            className="relative overflow-x-auto shadow-md sm:rounded-lg"
            style={{ margin: "0 10%" }}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-center">Financial Asset</th>
                  <th className="px-6 py-3 text-center">
                    Investment Amount (₹)
                  </th>
                  <th className="px-6 py-3 text-center">Growth Rate (%)</th>
                </tr>
              </thead>

              <tbody>
                {assets.map((asset, index) => (
                  <tr
                    key={asset.key}
                    className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:odd:bg-gray-900 dark:even:bg-gray-800"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
                      {asset.label}
                    </th>

                    <td className="px-6 py-4 text-center">
                      <input
                        type="text"
                        value={asset.amount}
                        onChange={asset.onChangeAmountHandler}
                        className="block w-2/3 mx-auto text-center font-bold p-2 border border-gray-900 rounded-lg bg-gray-50 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>

                    <td className="px-6 py-4 text-center">
                      <input
                        type="text"
                        value={asset.rate}
                        onChange={asset.onChangeRateHandler}
                        className="block w-1/2 mx-auto text-center font-bold p-2 border border-gray-900 rounded-lg bg-gray-50 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-7 mb-10">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
        <div id="dataTable" style={{ display: displayResult }}>
          <div
            id="resultHeader"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h5 className="mt-10 leading-none text-center text-3xl mb-4 font-extrabold text-gray-900 dark:text-white pb-1">
              Portfolio Forecast Output
            </h5>
          </div>

          <div
            id="showOutput"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="relative overflow-x-auto">
              <table
                id="firstTbl"
                className="min-w-full table-auto text-sm mb-10 text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                <thead className="text-xs text-gray-700 uppercase bg-red-300 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="text-left px-4 py-3">Financial Asset</th>
                    <th className="text-center px-4 py-3">5 Yrs Return (₹)</th>
                    <th className="text-center px-4 py-3">10 Yrs Return (₹)</th>
                    <th className="text-center px-4 py-3">15 Yrs Return (₹)</th>
                    <th className="text-center px-4 py-3">20 Yrs Return (₹)</th>
                    <th className="text-center px-4 py-3">25 Yrs Return (₹)</th>
                    <th className="text-center px-4 py-3">30 Yrs Return (₹)</th>
                    <th className="text-center px-4 py-3">35 Yrs Return (₹)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      PPF
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["ppf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["ppf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["ppf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["ppf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["ppf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["ppf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["ppf"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      PF
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["pf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["pf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["pf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["pf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["pf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["pf"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["pf"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      NSC
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["nsc"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["nsc"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["nsc"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["nsc"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["nsc"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["nsc"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["pf"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Postal
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["postal"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["postal"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["postal"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["postal"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["postal"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["postal"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["postal"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Bank
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["bank"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Bank
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["bank"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["bank"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Company
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["company"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["company"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["company"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["company"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["company"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["company"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["company"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Insurance
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["insurance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["insurance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["insurance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["insurance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["insurance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["insurance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["insurance"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Equity Portfolio
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["equity"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["equity"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["equity"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["equity"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["equity"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["equity"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["equity"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Balanced Portfolio{" "}
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["balancedPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["balancedPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["balancedPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["balancedPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["balancedPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["balancedPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["balancedPortfolio"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Non-Liquid Debt Portfolio
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["nonLiquidDebtPortfolio"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Liquid Debt Portfolio
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["liquidPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["liquidPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["liquidPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["liquidPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["liquidPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["liquidPortfolio"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["liquidPortfolio"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      SIP
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["sip"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["sip"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["sip"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["sip"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["sip"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["sip"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["sip"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      RD
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["rd"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["rd"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["rd"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["rd"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["rd"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["rd"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["rd"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-green-300 border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      Portfolio Balance
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["balance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["balance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["balance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["balance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["balance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["balance"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["balance"]
                      )}
                    </td>
                  </tr>
                  <tr className="bg-green-300 border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left px-4 py-4 font-medium text-gray-900 dark:text-white">
                      SWP @ 8% (Monthly)
                    </th>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["5"]["swpReturn"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["10"]["swpReturn"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["15"]["swpReturn"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["20"]["swpReturn"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["25"]["swpReturn"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["30"]["swpReturn"]
                      )}
                    </td>
                    <td className="font-bold text-gray-900 text-center px-4 py-4 border">
                      {inputCalculatorRules.formatINR(
                        outputPortfolio["35"]["swpReturn"]
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
