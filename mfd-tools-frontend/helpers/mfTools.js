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
  return axios.post(`${NEXT_URL}/api/mfTools/calculateFV`, {
    token,
    rate,
    nper,
    pmt,
    pv,
  });
};

const calculateLimitedPeriodSip = (
  sipAmt,
  sipInvestPeriod,
  totalInvestPeriod,
  growthRate
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateLimitedPeriodSip`, {
    token,
    sipAmt,
    sipInvestPeriod,
    totalInvestPeriod,
    growthRate,
  });
};

const calculateHumanLifeValue = (
  currentIncome,
  investGrowthRate,
  incomeIncrementRate,
  timePeriod
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateHumanLifeValue`, {
    token,
    currentIncome,
    investGrowthRate,
    incomeIncrementRate,
    timePeriod,
  });
};

const calculateNeedsBasedInsurance = (
  currentIncome,
  investGrowthRate,
  incomeIncrementRate,
  timePeriod,
  outstandingLoanAmt,
  childEducationLiability,
  incidentalMarriageLiability,
  availableInsuranceDeduct,
  investmentBalance
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateNeedsBasedInsurance`, {
    token,
    currentIncome,
    investGrowthRate,
    incomeIncrementRate,
    timePeriod,
    outstandingLoanAmt,
    childEducationLiability,
    incidentalMarriageLiability,
    availableInsuranceDeduct,
    investmentBalance,
  });
};

const calculateSIPReturn = (
  rate,
  principal,
  years,
  stepUp = 0,
  inflation = 0,
  lumpSum = false,
  percentMode = false
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateSIPReturn`, {
    token,
    rate,
    principal,
    years,
    stepUp,
    inflation,
    lumpSum,
    percentMode,
  });
};

const calculateTotalReturn = (
  initialLumpsum,
  principal,
  rate,
  years,
  inflation = 0
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateTotalReturn`, {
    token,
    initialLumpsum,
    principal,
    rate,
    years,
    inflation,
  });
};

const calculateDifferentialReturnsByAge = (
  currentAge,
  retirementAge,
  corpus,
  rate,
  inflation = 0
) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/calculateDifferentialReturnsByAge`,
    {
      token,
      currentAge,
      retirementAge,
      corpus,
      rate,
      inflation,
    }
  );
};

const calculateSipBrokerage = (sipAmt, sipRate, commissionRate, time) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/distributorCommissionCalc`, {
    token,
    sipAmt,
    sipRate,
    commissionRate,
    time,
  });
};

const diffBetweenInsuranceAndSIPCommission = (
  investAmt,
  avgInsureCommission,
  capApprRate,
  trail,
  time
) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/diffBetweenInsuranceAndSIPCommission`,
    {
      token,
      investAmt,
      avgInsureCommission,
      capApprRate,
      trail,
      time,
    }
  );
};

const revenueModelSIPAndOneTimeBookSize = (
  sipBookSize,
  investRate,
  commissionRate,
  equityAum,
  time
) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/revenueModelSIPAndOneTimeBookSize`,
    {
      token,
      sipBookSize,
      investRate,
      commissionRate,
      equityAum,
      time,
    }
  );
};

const calculateModelFinancialPortfolio = (
  ppfAmt,
  ppfRate,
  pfAmt,
  pfRate,
  nscAmt,
  nscRate,
  postalAmt,
  postalRate,
  bankAmt,
  bankRate,
  companyAmt,
  companyRate,
  insuranceAmt,
  insuranceRate,
  equityAmt,
  equityRate,
  balancedAmt,
  balancedRate,
  nonLiquidDebtAmt,
  nonLiquidDebtRate,
  liquidDebtAmt,
  liquidDebtRate,
  sipAmt,
  sipRate,
  rdAmt,
  rdRate
) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/calculateModelFinancialPortfolio`,
    {
      token,
      ppfAmt,
      ppfRate,
      pfAmt,
      pfRate,
      nscAmt,
      nscRate,
      postalAmt,
      postalRate,
      bankAmt,
      bankRate,
      companyAmt,
      companyRate,
      insuranceAmt,
      insuranceRate,
      equityAmt,
      equityRate,
      balancedAmt,
      balancedRate,
      nonLiquidDebtAmt,
      nonLiquidDebtRate,
      liquidDebtAmt,
      liquidDebtRate,
      sipAmt,
      sipRate,
      rdAmt,
      rdRate,
    }
  );
};

const getSchemeReturnsView = (fundHouse, schemeType, timePeriod, offset) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemeReturnsView`, {
    token,
    fundHouse,
    schemeType,
    timePeriod,
    offset,
  });
};

const getSchemePointView = (fundHouse, schemeType, previousDate, nextDate) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemeReturnsView`, {
    token,
    fundHouse,
    schemeType,
    previousDate,
    nextDate,
  });
};

const getSchemeAdvancedAnalysis = (
  fundHouse,
  schemeType,
  indicator,
  offset
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemeReturnsView`, {
    token,
    fundHouse,
    schemeType,
    indicator,
    offset,
  });
};

const getSchemeList = (fundHouse, schemeType) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemeList`, {
    token,
    fundHouse,
    schemeType,
  });
};

const getSchemePerformanceList = (fundHouse, schemeType) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemePerformanceList`, {
    token,
    fundHouse,
    schemeType,
  });
};

const getSchemeListForSWP = (
  fundHouse,
  investDate,
  schemeType,
  withdrawalDate
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemeListForSWP`, {
    token,
    fundHouse,
    investDate,
    schemeType,
    withdrawalDate,
  });
};

const getSchemeListForSIP = (fundHouse, investDate, schemeType) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/getSchemeListForSIP`, {
    token,
    fundHouse,
    investDate,
    schemeType,
  });
};

const calculateSWP = (
  investDate,
  lumpsum,
  schemeName,
  withdrawPercent,
  withdrawalDate
) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateSWP`, {
    token,
    investDate,
    lumpsum,
    schemeName,
    withdrawPercent,
    withdrawalDate,
  });
};

const calculateSIP = (investDate, lumpsum, schemeName) => {
  let token = localStorage.getItem("token");
  return axios.post(`${NEXT_URL}/api/mfTools/calculateSWP`, {
    token,
    investDate,
    lumpsum,
    schemeName,
  });
};

const getDecliningNavSensexPerformance = (fundHouse, schemeType) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/getDecliningNavSensexPerformance`,
    {
      token,
      fundHouse,
      schemeType,
    }
  );
};

const getNavSensexPerformance = (fundHouse, schemeType) => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/getDecliningNavSensexPerformance`,
    {
      token,
      fundHouse,
      schemeType,
    }
  );
};

const getWeeklyBestAndWorstMFSchemePerformers = () => {
  let token = localStorage.getItem("token");
  return axios.post(
    `${NEXT_URL}/api/mfTools/getDecliningNavSensexPerformance`,
    {
      token,
    }
  );
}

export default {
  calculateGoalInvestPlan,
  calculateRetirementPlan,
  calculateDeferredSWPPlanning,
  calculateImmediateSWPPlanning,
  calculateEMIVersusSIP,
  calculatePMT,
  calculateFV,
  calculateLimitedPeriodSip,
  calculateHumanLifeValue,
  calculateNeedsBasedInsurance,
  calculateSIPReturn,
  calculateTotalReturn,
  calculateDifferentialReturnsByAge,
  calculateSipBrokerage,
  diffBetweenInsuranceAndSIPCommission,
  revenueModelSIPAndOneTimeBookSize,
  calculateModelFinancialPortfolio,
  getSchemeReturnsView,
  getSchemePointView,
  getSchemeAdvancedAnalysis,
  getSchemeList,
  getSchemePerformanceList,
  getSchemeListForSWP,
  getSchemeListForSIP,
  calculateSWP,
  calculateSIP,
  getDecliningNavSensexPerformance,
  getNavSensexPerformance,
  getWeeklyBestAndWorstMFSchemePerformers
};
