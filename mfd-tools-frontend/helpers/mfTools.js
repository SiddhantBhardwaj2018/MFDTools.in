import axios from "axios";
import { NEXT_URL } from "../config/url";

const calculateGoalInvestPlan = (
  currentAge,
  destinationAge,
  corpus,
  rate,
  inflation,
  amountInvest
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateGoalInvestPlan`, {
    token,
    currentAge,
    destinationAge,
    corpus,
    rate,
    inflation,
    amountInvest,
  });
};

const calculateRetirementPlan = (
  currentAge,
  retirementAge,
  lifeExpectancy,
  monthlyExpense,
  preRetirementReturn,
  postRetirementReturn,
  inflation
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateRetirementPlan`, {
    token,
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpense,
    preRetirementReturn,
    postRetirementReturn,
    inflation,
  });
};

const calculateDeferredSWPPlanning = (
  currentAge,
  retirementAge,
  currentSIPInvestment,
  currentLumpsumInvestment,
  investmentPortfolioRate,
  swpRate
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateDeferredSWPPlanning`, {
    token,
    currentAge,
    retirementAge,
    currentSIPInvestment,
    currentLumpsumInvestment,
    investmentPortfolioRate,
    swpRate,
  });
};

const calculateImmediateSWPPlanning = (
  retirementCorpus,
  investGrowthRate,
  swpReturnRate,
  corpusLeft
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateImmediateSWPPlanning`, {
    token,
    retirementCorpus,
    investGrowthRate,
    swpReturnRate,
    corpusLeft,
  });
};

const calculateEMIVersusSIP = (
  houseValue,
  selfFunding,
  loanRate,
  loanPeriod,
  housingInflation
) => {
  let token = localStorage.getItem("token");
  let monthlyRent = (0.03 / 12) * houseValue;
  let sipGrowthRate = 0.12;
  return axios.post(`${NEXT_URL}/api/mfTools/calculateEMIVersusSIP`, {
    token,
    houseValue,
    selfFunding,
    loanRate,
    loanPeriod,
    housingInflation,
    monthlyRent,
    sipGrowthRate,
  });
};

const calculatePMT = (rate, nper, pv, fv = 0) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculatePMT`, {
    token,
    rate,
    nper,
    pv,
    fv,
  });
};

const calculateFV = (rate, nper, pmt, pv) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mftools/calculateFutureValue`, {
    token,
    rate,
    nper,
    pmt,
    pv,
  });
};

export default {
  calculateGoalInvestPlan,
  calculateRetirementPlan,
  calculateDeferredSWPPlanning,
  calculateImmediateSWPPlanning,
  calculateEMIVersusSIP,
  calculatePMT,
  calculateFV
};
