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

export default {
  calculateGoalInvestPlan,
  calculateRetirementPlan
};
