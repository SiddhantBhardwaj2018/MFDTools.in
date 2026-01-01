package com.siddhantbhardwaj.mfd_tools_backend.service.blueprintservices;

import com.siddhantbhardwaj.mfd_tools_backend.dto.*;

import java.util.List;
import java.util.Map;

public interface MFToolsService {

    public Map<String,Double> calculateFutureValue(double rate, double nper, double pmt, double pv)  throws Exception;

    public Map<String, Double> calculatePresentValue(double rate, double nper, double pmt, double pv) throws Exception;

    public Map<String,Double> calculateExcelPmtValue(double rate, double nper, double pv, double fv) throws Exception;

    public Map<String,Double> calculatePmtValue(double rate, double nper, double pv, double fv) throws Exception;

    public Map<String,Double> calculateGoalInvestPlan(double currentAge, double destinationAge, double corpus, double rate, double inflation, double amountInvest) throws Exception;

    public Map<String, Double> calculateRetirementGoal(double currentAge, double retirementAge, double inflation, double monthlyExpense, double preRetirementReturn, double postRetirementReturn, double lifeExpectancy) throws Exception;

    public Map<String, List<Double>> calculateSIPReturn(double rate, double principal, double years, double stepUp, double inflation, boolean lumpSum, boolean percentMode) throws Exception;

    public Map<String,List<Double>> calculateTotalReturnWithLumpSumAndSIP(double initialLumpsum, double principal, double rate, double years, double inflation) throws Exception;

    public Map<String, Double> calculateRequiredSipAmt(double currentAge, double retirementAge, double currentRate, double inflation, double monthlyExpense, double assumedFutureReturn, double assumedFutureInflation, double residualAmt) throws Exception;

    public Map<String,Double> calculateDifferentialReturnsByAge(double currentAge, double retirementAge, double corpus, double rate, double inflation) throws Exception;

    public Map<String,Double> calculateRetirementPortfolio(double ppfAmt, double ppfRate, double pfAmt, double pfRate, double postalAmt, double postalRate, double bankAmt, double bankRate, double cdAmt, double cdRate, double insureAmt, double insureRate, double equityAmt, double equityRate, double debtAmt, double debtRate, double sipAmt, double sipRate, double rdAmt, double rdRate, double currentAge, double swpRate, double retirementAge, double inflationRate) throws Exception;

    public Map<String,Object> distributorCommissionCalc(double sipAmt, double sipRate,double commissionRate,double time) throws Exception;

    public Map<String,Double> diffBetweenInsuranceAndSIPCommission(double investAmt,double avgInsureCommission, double capApprRate,double trail, double time) throws Exception;

    public Map<String,Double> revenueModelSIPAndOneTimeBookSize(double sipBookSize, double investRate, double commissionRate, double equityAum, double time) throws Exception;

    public Map<String,Double> calculateEMIVersusSIP(double houseValue,double selfFunding,double loanRate,double loanPeriod,double housingInflation,double monthlyRent,double sipGrowthRate) throws Exception;

    public Map<String,Double> humanLifeMethod(double currentIncome, double investGrowthRate, double incomeIncrementRate, double timePeriod) throws Exception;

    public Map<String,Double> needBasedApproach(double currentIncome, double investGrowthRate,double incomeIncrementRate, double timePeriod, double outstandingLoanAmt, double childEducationLiability, double incidentalMarriageLiability, double availableInsuranceDeduct, double investmentBalance) throws Exception;

    public Map<String, Object> limitedPeriodSIP(double sipAmt, double sipInvestPeriod, double totalInvestPeriod, double growthRate) throws Exception;

    public Map<String, Double> calculatePreRetirementSWPReturn(double currentAge, double retirementAge, double currentSIPInvestment, double currentLumpsumInvestment, double investmentPortfolioRate, double swpRate) throws Exception;

    public Map<String,Double> calculatePostRetirementSWPReturn(double retirementCorpus,double investGrowthRate, double swpReturnRate, double corpusLeft) throws Exception;

    public Map<String,Map<Integer,Map<String,Double>>> calculateModelFinancialPortfolio(double ppfAmt, double ppfRate, double pfAmt, double pfRate, double nscAmt, double nscRate, double postalAmt, double postalRate, double bankAmt, double bankRate, double companyAmt, double companyRate, double insuranceAmt, double insuranceRate, double equityAmt, double equityRate, double balancedAmt, double balancedRate, double nonLiquidDebtAmt, double nonLiquidDebtRate, double liquidDebtAmt, double liquidDebtRate, double sipAmt, double sipRate, double rdAmt, double rdRate) throws Exception;

    public Map<String, Object> obtainSchemeReturnView(ReturnViewParam returnViewParam) throws Exception;

    public Map<String,Object> getSchemePointView(PointCalcView pointCalcView) throws Exception;

    public Map<String,Object> getSchemeAdvancedAnalysis(AdvancedQueryRequest advancedQueryRequest) throws Exception;

    public Map<String, Object> getSchemeList(SchemeListQuery schemeListQuery) throws Exception;

    public Map<String,Object> getSchemePerformanceList(Map<String,List<String>> schemeListQuery) throws Exception;

    public Map<String,Object> getSchemeListForSWP(Map<String,String> swpListMap) throws Exception;

    public Map<String,Object> getSchemeListForSIP(Map<String,String> sipListMap) throws Exception;

    public Map<String,Object> calculateSWP(Map<String,Object> swpRequestMap) throws Exception;

    public Map<String,Object> calculateSIP(Map<String,Object> sipRequestMap) throws Exception;

    public Map<String,Object> getDecliningNavSensexPerformance(Map<String,Object> declineNavSensexRequestMap) throws  Exception;

    public Map<String,Object> getNavSensexPerformance(Map<String, String> navSensexRequestMap) throws Exception;

    public Map<String,Object> getWeeklyBestAndWorstMFSchemePerformers() throws Exception;

}
