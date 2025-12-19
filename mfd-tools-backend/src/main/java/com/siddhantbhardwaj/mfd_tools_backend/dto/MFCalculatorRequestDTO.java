package com.siddhantbhardwaj.mfd_tools_backend.dto;

import java.util.List;

public class MFCalculatorRequestDTO {

    private String name;
    private String email;
    private String distributorPhone;
    private String distributorName;
    private String type;
    private double rate;
    private double nper;
    private double pv;
    private double fv;
    private double pmt;
    private double currentAge;
    private double destinationAge;
    private double corpus;
    private double inflation;
    private double amountInvest;
    private double retirementAge;
    private double currentRate;
    private double monthlyExpense;
    private double assumedFutureReturn;
    private double assumedFutureInflation;
    private double residualAmt;
    private double preRetirementReturn;
    private double postRetirementReturn;
    private double lifeExpectancy;
    private double principal;
    private double years;
    private double stepUp;
    private boolean lumpSum;
    private double initialLumpsum;
    private double ppfAmt;
    private double ppfRate;
    private double pfAmt;
    private double pfRate;
    private double postalAmt;
    private double postalRate;
    private double bankAmt;
    private double bankRate;
    private double cdAmt;
    private double cdRate;
    private double insureAmt;
    private double insureRate;
    private double equityAmt;
    private double equityRate;
    private double debtAmt;
    private double debtRate;
    private double sipAmt;
    private double sipRate;
    private double rdAmt;
    private double rdRate;
    private double swpRate;
    private double inflationRate;
    private double commissionRate;
    private double time;
    private double investAmt;
    private double avgInsureCommission;
    private double capApprRate;
    private double trail;
    private double sipBookSize;
    private double investRate;
    private double equityAum;
    private double houseValue;
    private double selfFunding;
    private double loanRate;
    private double loanPeriod;
    private double housingInflation;
    private double monthlyRent;
    private double sipGrowthRate;
    private double currentIncome;
    private double investGrowthRate;
    private double incomeIncrementRate;
    private double timePeriod;
    private double outstandingLoanAmt;
    private double childEducationLiability;
    private double incidentalMarriageLiability;
    private double availableInsuranceDeduct;
    private double investmentBalance;
    private double sipInvestPeriod;
    private double totalInvestPeriod;
    private double growthRate;
    private double currentSIPInvestment;
    private double currentLumpsumInvestment;
    private double investmentPortfolioRate;
    private double retirementCorpus;
    private double swpReturnRate;
    private double corpusLeft;
    private double nscAmt;
    private double nscRate;
    private double companyAmt;
    private double companyRate;
    private double insuranceAmt;
    private double insuranceRate;
    private double balancedAmt;
    private double balancedRate;
    private double nonLiquidDebtAmt;
    private double nonLiquidDebtRate;
    private double liquidDebtAmt;
    private double liquidDebtRate;
    private boolean percentMode;
    private List<String> timePeriods;

    public MFCalculatorRequestDTO() {
    }

    public MFCalculatorRequestDTO(String name, String email, String distributorPhone, String distributorName, String type, double rate, double nper, double pv, double fv, double pmt, double currentAge, double destinationAge, double corpus, double inflation, double amountInvest, double retirementAge, double currentRate, double monthlyExpense, double assumedFutureReturn, double assumedFutureInflation, double residualAmt, double preRetirementReturn, double postRetirementReturn, double lifeExpectancy, double principal, double years, double stepUp, boolean lumpSum, double initialLumpsum, double ppfAmt, double ppfRate, double pfAmt, double pfRate, double postalAmt, double postalRate, double bankAmt, double bankRate, double cdAmt, double cdRate, double insureAmt, double insureRate, double equityAmt, double equityRate, double debtAmt, double debtRate, double sipAmt, double sipRate, double rdAmt, double rdRate, double swpRate, double inflationRate, double commissionRate, double time, double investAmt, double avgInsureCommission, double capApprRate, double trail, double sipBookSize, double investRate, double equityAum, double houseValue, double selfFunding, double loanRate, double loanPeriod, double housingInflation, double monthlyRent, double sipGrowthRate, double currentIncome, double investGrowthRate, double incomeIncrementRate, double timePeriod, double outstandingLoanAmt, double childEducationLiability, double incidentalMarriageLiability, double availableInsuranceDeduct, double investmentBalance, double sipInvestPeriod, double totalInvestPeriod, double growthRate, double currentSIPInvestment, double currentLumpsumInvestment, double investmentPortfolioRate, double retirementCorpus, double swpReturnRate, double corpusLeft, double nscAmt, double nscRate, double companyAmt, double companyRate, double insuranceAmt, double insuranceRate, double balancedAmt, double balancedRate, double nonLiquidDebtAmt, double nonLiquidDebtRate, double liquidDebtAmt, double liquidDebtRate, boolean percentMode, List<String> timePeriods) {
        this.name = name;
        this.email = email;
        this.distributorPhone = distributorPhone;
        this.distributorName = distributorName;
        this.type = type;
        this.rate = rate;
        this.nper = nper;
        this.pv = pv;
        this.fv = fv;
        this.pmt = pmt;
        this.currentAge = currentAge;
        this.destinationAge = destinationAge;
        this.corpus = corpus;
        this.inflation = inflation;
        this.amountInvest = amountInvest;
        this.retirementAge = retirementAge;
        this.currentRate = currentRate;
        this.monthlyExpense = monthlyExpense;
        this.assumedFutureReturn = assumedFutureReturn;
        this.assumedFutureInflation = assumedFutureInflation;
        this.residualAmt = residualAmt;
        this.preRetirementReturn = preRetirementReturn;
        this.postRetirementReturn = postRetirementReturn;
        this.lifeExpectancy = lifeExpectancy;
        this.principal = principal;
        this.years = years;
        this.stepUp = stepUp;
        this.lumpSum = lumpSum;
        this.initialLumpsum = initialLumpsum;
        this.ppfAmt = ppfAmt;
        this.ppfRate = ppfRate;
        this.pfAmt = pfAmt;
        this.pfRate = pfRate;
        this.postalAmt = postalAmt;
        this.postalRate = postalRate;
        this.bankAmt = bankAmt;
        this.bankRate = bankRate;
        this.cdAmt = cdAmt;
        this.cdRate = cdRate;
        this.insureAmt = insureAmt;
        this.insureRate = insureRate;
        this.equityAmt = equityAmt;
        this.equityRate = equityRate;
        this.debtAmt = debtAmt;
        this.debtRate = debtRate;
        this.sipAmt = sipAmt;
        this.sipRate = sipRate;
        this.rdAmt = rdAmt;
        this.rdRate = rdRate;
        this.swpRate = swpRate;
        this.inflationRate = inflationRate;
        this.commissionRate = commissionRate;
        this.time = time;
        this.investAmt = investAmt;
        this.avgInsureCommission = avgInsureCommission;
        this.capApprRate = capApprRate;
        this.trail = trail;
        this.sipBookSize = sipBookSize;
        this.investRate = investRate;
        this.equityAum = equityAum;
        this.houseValue = houseValue;
        this.selfFunding = selfFunding;
        this.loanRate = loanRate;
        this.loanPeriod = loanPeriod;
        this.housingInflation = housingInflation;
        this.monthlyRent = monthlyRent;
        this.sipGrowthRate = sipGrowthRate;
        this.currentIncome = currentIncome;
        this.investGrowthRate = investGrowthRate;
        this.incomeIncrementRate = incomeIncrementRate;
        this.timePeriod = timePeriod;
        this.outstandingLoanAmt = outstandingLoanAmt;
        this.childEducationLiability = childEducationLiability;
        this.incidentalMarriageLiability = incidentalMarriageLiability;
        this.availableInsuranceDeduct = availableInsuranceDeduct;
        this.investmentBalance = investmentBalance;
        this.sipInvestPeriod = sipInvestPeriod;
        this.totalInvestPeriod = totalInvestPeriod;
        this.growthRate = growthRate;
        this.currentSIPInvestment = currentSIPInvestment;
        this.currentLumpsumInvestment = currentLumpsumInvestment;
        this.investmentPortfolioRate = investmentPortfolioRate;
        this.retirementCorpus = retirementCorpus;
        this.swpReturnRate = swpReturnRate;
        this.corpusLeft = corpusLeft;
        this.nscAmt = nscAmt;
        this.nscRate = nscRate;
        this.companyAmt = companyAmt;
        this.companyRate = companyRate;
        this.insuranceAmt = insuranceAmt;
        this.insuranceRate = insuranceRate;
        this.balancedAmt = balancedAmt;
        this.balancedRate = balancedRate;
        this.nonLiquidDebtAmt = nonLiquidDebtAmt;
        this.nonLiquidDebtRate = nonLiquidDebtRate;
        this.liquidDebtAmt = liquidDebtAmt;
        this.liquidDebtRate = liquidDebtRate;
        this.percentMode = percentMode;
        this.timePeriods=timePeriods;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDistributorPhone() {
        return distributorPhone;
    }

    public void setDistributorPhone(String distributorPhone) {
        this.distributorPhone = distributorPhone;
    }

    public String getDistributorName() {
        return distributorName;
    }

    public void setDistributorName(String distributorName) {
        this.distributorName = distributorName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public double getNper() {
        return nper;
    }

    public void setNper(double nper) {
        this.nper = nper;
    }

    public double getPv() {
        return pv;
    }

    public void setPv(double pv) {
        this.pv = pv;
    }

    public double getFv() {
        return fv;
    }

    public void setFv(double fv) {
        this.fv = fv;
    }

    public double getPmt() {
        return pmt;
    }

    public void setPmt(double pmt) {
        this.pmt = pmt;
    }

    public double getCurrentAge() {
        return currentAge;
    }

    public void setCurrentAge(double currentAge) {
        this.currentAge = currentAge;
    }

    public double getDestinationAge() {
        return destinationAge;
    }

    public void setDestinationAge(double destinationAge) {
        this.destinationAge = destinationAge;
    }

    public double getCorpus() {
        return corpus;
    }

    public void setCorpus(double corpus) {
        this.corpus = corpus;
    }

    public double getInflation() {
        return inflation;
    }

    public void setInflation(double inflation) {
        this.inflation = inflation;
    }

    public double getAmountInvest() {
        return amountInvest;
    }

    public void setAmountInvest(double amountInvest) {
        this.amountInvest = amountInvest;
    }

    public double getRetirementAge() {
        return retirementAge;
    }

    public void setRetirementAge(double retirementAge) {
        this.retirementAge = retirementAge;
    }

    public double getCurrentRate() {
        return currentRate;
    }

    public void setCurrentRate(double currentRate) {
        this.currentRate = currentRate;
    }

    public double getMonthlyExpense() {
        return monthlyExpense;
    }

    public void setMonthlyExpense(double monthlyExpense) {
        this.monthlyExpense = monthlyExpense;
    }

    public double getAssumedFutureReturn() {
        return assumedFutureReturn;
    }

    public void setAssumedFutureReturn(double assumedFutureReturn) {
        this.assumedFutureReturn = assumedFutureReturn;
    }

    public double getAssumedFutureInflation() {
        return assumedFutureInflation;
    }

    public void setAssumedFutureInflation(double assumedFutureInflation) {
        this.assumedFutureInflation = assumedFutureInflation;
    }

    public double getResidualAmt() {
        return residualAmt;
    }

    public void setResidualAmt(double residualAmt) {
        this.residualAmt = residualAmt;
    }

    public double getPreRetirementReturn() {
        return preRetirementReturn;
    }

    public void setPreRetirementReturn(double preRetirementReturn) {
        this.preRetirementReturn = preRetirementReturn;
    }

    public double getPostRetirementReturn() {
        return postRetirementReturn;
    }

    public void setPostRetirementReturn(double postRetirementReturn) {
        this.postRetirementReturn = postRetirementReturn;
    }

    public double getLifeExpectancy() {
        return lifeExpectancy;
    }

    public void setLifeExpectancy(double lifeExpectancy) {
        this.lifeExpectancy = lifeExpectancy;
    }

    public double getPrincipal() {
        return principal;
    }

    public void setPrincipal(double principal) {
        this.principal = principal;
    }

    public double getYears() {
        return years;
    }

    public void setYears(double years) {
        this.years = years;
    }

    public double getStepUp() {
        return stepUp;
    }

    public void setStepUp(double stepUp) {
        this.stepUp = stepUp;
    }

    public boolean getLumpSum() {
        return lumpSum;
    }

    public void setLumpSum(boolean lumpSum) {
        this.lumpSum = lumpSum;
    }

    public double getInitialLumpsum() {
        return initialLumpsum;
    }

    public void setInitialLumpsum(double initialLumpsum) {
        this.initialLumpsum = initialLumpsum;
    }

    public boolean isLumpSum() {
        return lumpSum;
    }

    public double getPpfAmt() {
        return ppfAmt;
    }

    public void setPpfAmt(double ppfAmt) {
        this.ppfAmt = ppfAmt;
    }

    public double getPpfRate() {
        return ppfRate;
    }

    public void setPpfRate(double ppfRate) {
        this.ppfRate = ppfRate;
    }

    public double getPfAmt() {
        return pfAmt;
    }

    public void setPfAmt(double pfAmt) {
        this.pfAmt = pfAmt;
    }

    public double getPfRate() {
        return pfRate;
    }

    public void setPfRate(double pfRate) {
        this.pfRate = pfRate;
    }

    public double getPostalAmt() {
        return postalAmt;
    }

    public void setPostalAmt(double postalAmt) {
        this.postalAmt = postalAmt;
    }

    public double getPostalRate() {
        return postalRate;
    }

    public void setPostalRate(double postalRate) {
        this.postalRate = postalRate;
    }

    public double getBankAmt() {
        return bankAmt;
    }

    public void setBankAmt(double bankAmt) {
        this.bankAmt = bankAmt;
    }

    public double getBankRate() {
        return bankRate;
    }

    public void setBankRate(double bankRate) {
        this.bankRate = bankRate;
    }

    public double getCdAmt() {
        return cdAmt;
    }

    public void setCdAmt(double cdAmt) {
        this.cdAmt = cdAmt;
    }

    public double getCdRate() {
        return cdRate;
    }

    public void setCdRate(double cdRate) {
        this.cdRate = cdRate;
    }

    public double getInsureAmt() {
        return insureAmt;
    }

    public void setInsureAmt(double insureAmt) {
        this.insureAmt = insureAmt;
    }

    public double getInsureRate() {
        return insureRate;
    }

    public void setInsureRate(double insureRate) {
        this.insureRate = insureRate;
    }

    public double getEquityAmt() {
        return equityAmt;
    }

    public void setEquityAmt(double equityAmt) {
        this.equityAmt = equityAmt;
    }

    public double getEquityRate() {
        return equityRate;
    }

    public void setEquityRate(double equityRate) {
        this.equityRate = equityRate;
    }

    public double getDebtAmt() {
        return debtAmt;
    }

    public void setDebtAmt(double debtAmt) {
        this.debtAmt = debtAmt;
    }

    public double getDebtRate() {
        return debtRate;
    }

    public void setDebtRate(double debtRate) {
        this.debtRate = debtRate;
    }

    public double getSipAmt() {
        return sipAmt;
    }

    public void setSipAmt(double sipAmt) {
        this.sipAmt = sipAmt;
    }

    public double getSipRate() {
        return sipRate;
    }

    public void setSipRate(double sipRate) {
        this.sipRate = sipRate;
    }

    public double getRdAmt() {
        return rdAmt;
    }

    public void setRdAmt(double rdAmt) {
        this.rdAmt = rdAmt;
    }

    public double getRdRate() {
        return rdRate;
    }

    public void setRdRate(double rdRate) {
        this.rdRate = rdRate;
    }

    public double getSwpRate() {
        return swpRate;
    }

    public void setSwpRate(double swpRate) {
        this.swpRate = swpRate;
    }

    public double getInflationRate() {
        return inflationRate;
    }

    public void setInflationRate(double inflationRate) {
        this.inflationRate = inflationRate;
    }

    public double getCommissionRate() {
        return commissionRate;
    }

    public void setCommissionRate(double commissionRate) {
        this.commissionRate = commissionRate;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public double getInvestAmt() {
        return investAmt;
    }

    public void setInvestAmt(double investAmt) {
        this.investAmt = investAmt;
    }

    public double getAvgInsureCommission() {
        return avgInsureCommission;
    }

    public void setAvgInsureCommission(double avgInsureCommission) {
        this.avgInsureCommission = avgInsureCommission;
    }

    public double getCapApprRate() {
        return capApprRate;
    }

    public void setCapApprRate(double capApprRate) {
        this.capApprRate = capApprRate;
    }

    public double getTrail() {
        return trail;
    }

    public void setTrail(double trail) {
        this.trail = trail;
    }

    public double getSipBookSize() {
        return sipBookSize;
    }

    public void setSipBookSize(double sipBookSize) {
        this.sipBookSize = sipBookSize;
    }

    public double getInvestRate() {
        return investRate;
    }

    public void setInvestRate(double investRate) {
        this.investRate = investRate;
    }

    public double getEquityAum() {
        return equityAum;
    }

    public void setEquityAum(double equityAum) {
        this.equityAum = equityAum;
    }

    public double getHouseValue() {
        return houseValue;
    }

    public void setHouseValue(double houseValue) {
        this.houseValue = houseValue;
    }

    public double getSelfFunding() {
        return selfFunding;
    }

    public void setSelfFunding(double selfFunding) {
        this.selfFunding = selfFunding;
    }

    public double getLoanRate() {
        return loanRate;
    }

    public void setLoanRate(double loanRate) {
        this.loanRate = loanRate;
    }

    public double getLoanPeriod() {
        return loanPeriod;
    }

    public void setLoanPeriod(double loanPeriod) {
        this.loanPeriod = loanPeriod;
    }

    public double getHousingInflation() {
        return housingInflation;
    }

    public void setHousingInflation(double housingInflation) {
        this.housingInflation = housingInflation;
    }

    public double getMonthlyRent() {
        return monthlyRent;
    }

    public void setMonthlyRent(double monthlyRent) {
        this.monthlyRent = monthlyRent;
    }

    public double getSipGrowthRate() {
        return sipGrowthRate;
    }

    public void setSipGrowthRate(double sipGrowthRate) {
        this.sipGrowthRate = sipGrowthRate;
    }

    public double getCurrentIncome() {
        return currentIncome;
    }

    public void setCurrentIncome(double currentIncome) {
        this.currentIncome = currentIncome;
    }

    public double getInvestGrowthRate() {
        return investGrowthRate;
    }

    public void setInvestGrowthRate(double investGrowthRate) {
        this.investGrowthRate = investGrowthRate;
    }

    public double getIncomeIncrementRate() {
        return incomeIncrementRate;
    }

    public void setIncomeIncrementRate(double incomeIncrementRate) {
        this.incomeIncrementRate = incomeIncrementRate;
    }

    public double getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(double timePeriod) {
        this.timePeriod = timePeriod;
    }

    public double getOutstandingLoanAmt() {
        return outstandingLoanAmt;
    }

    public void setOutstandingLoanAmt(double outstandingLoanAmt) {
        this.outstandingLoanAmt = outstandingLoanAmt;
    }

    public double getChildEducationLiability() {
        return childEducationLiability;
    }

    public void setChildEducationLiability(double childEducationLiability) {
        this.childEducationLiability = childEducationLiability;
    }

    public double getIncidentalMarriageLiability() {
        return incidentalMarriageLiability;
    }

    public void setIncidentalMarriageLiability(double incidentalMarriageLiability) {
        this.incidentalMarriageLiability = incidentalMarriageLiability;
    }

    public double getAvailableInsuranceDeduct() {
        return availableInsuranceDeduct;
    }

    public void setAvailableInsuranceDeduct(double availableInsuranceDeduct) {
        this.availableInsuranceDeduct = availableInsuranceDeduct;
    }

    public double getInvestmentBalance() {
        return investmentBalance;
    }

    public void setInvestmentBalance(double investmentBalance) {
        this.investmentBalance = investmentBalance;
    }

    public double getSipInvestPeriod() {
        return sipInvestPeriod;
    }

    public void setSipInvestPeriod(double sipInvestPeriod) {
        this.sipInvestPeriod = sipInvestPeriod;
    }

    public double getTotalInvestPeriod() {
        return totalInvestPeriod;
    }

    public void setTotalInvestPeriod(double totalInvestPeriod) {
        this.totalInvestPeriod = totalInvestPeriod;
    }

    public double getGrowthRate() {
        return growthRate;
    }

    public void setGrowthRate(double growthRate) {
        this.growthRate = growthRate;
    }

    public double getCurrentSIPInvestment() {
        return currentSIPInvestment;
    }

    public void setCurrentSIPInvestment(double currentSIPInvestment) {
        this.currentSIPInvestment = currentSIPInvestment;
    }

    public double getCurrentLumpsumInvestment() {
        return currentLumpsumInvestment;
    }

    public void setCurrentLumpsumInvestment(double currentLumpsumInvestment) {
        this.currentLumpsumInvestment = currentLumpsumInvestment;
    }

    public double getInvestmentPortfolioRate() {
        return investmentPortfolioRate;
    }

    public void setInvestmentPortfolioRate(double investmentPortfolioRate) {
        this.investmentPortfolioRate = investmentPortfolioRate;
    }

    public double getRetirementCorpus() {
        return retirementCorpus;
    }

    public void setRetirementCorpus(double retirementCorpus) {
        this.retirementCorpus = retirementCorpus;
    }

    public double getSwpReturnRate() {
        return swpReturnRate;
    }

    public void setSwpReturnRate(double swpReturnRate) {
        this.swpReturnRate = swpReturnRate;
    }

    public double getCorpusLeft() {
        return corpusLeft;
    }

    public void setCorpusLeft(double corpusLeft) {
        this.corpusLeft = corpusLeft;
    }

    public double getNscAmt() {
        return nscAmt;
    }

    public void setNscAmt(double nscAmt) {
        this.nscAmt = nscAmt;
    }

    public double getNscRate() {
        return nscRate;
    }

    public void setNscRate(double nscRate) {
        this.nscRate = nscRate;
    }

    public double getCompanyAmt() {
        return companyAmt;
    }

    public void setCompanyAmt(double companyAmt) {
        this.companyAmt = companyAmt;
    }

    public double getCompanyRate() {
        return companyRate;
    }

    public void setCompanyRate(double companyRate) {
        this.companyRate = companyRate;
    }

    public double getInsuranceAmt() {
        return insuranceAmt;
    }

    public void setInsuranceAmt(double insuranceAmt) {
        this.insuranceAmt = insuranceAmt;
    }

    public double getInsuranceRate() {
        return insuranceRate;
    }

    public void setInsuranceRate(double insuranceRate) {
        this.insuranceRate = insuranceRate;
    }

    public double getBalancedAmt() {
        return balancedAmt;
    }

    public void setBalancedAmt(double balancedAmt) {
        this.balancedAmt = balancedAmt;
    }

    public double getBalancedRate() {
        return balancedRate;
    }

    public void setBalancedRate(double balancedRate) {
        this.balancedRate = balancedRate;
    }

    public double getNonLiquidDebtAmt() {
        return nonLiquidDebtAmt;
    }

    public void setNonLiquidDebtAmt(double nonLiquidDebtAmt) {
        this.nonLiquidDebtAmt = nonLiquidDebtAmt;
    }

    public double getNonLiquidDebtRate() {
        return nonLiquidDebtRate;
    }

    public void setNonLiquidDebtRate(double nonLiquidDebtRate) {
        this.nonLiquidDebtRate = nonLiquidDebtRate;
    }

    public double getLiquidDebtAmt() {
        return liquidDebtAmt;
    }

    public void setLiquidDebtAmt(double liquidDebtAmt) {
        this.liquidDebtAmt = liquidDebtAmt;
    }

    public double getLiquidDebtRate() {
        return liquidDebtRate;
    }

    public void setLiquidDebtRate(double liquidDebtRate) {
        this.liquidDebtRate = liquidDebtRate;
    }

    public boolean getPercentMode() {
        return percentMode;
    }

    public void setPercentMode(boolean percentMode) {
        this.percentMode = percentMode;
    }

    public List<String> getTimePeriods() {
        return timePeriods;
    }

    public void setTimePeriods(List<String> timePeriods) {
        this.timePeriods = timePeriods;
    }

    @Override
    public String toString() {
        return "MFCalculatorRequestDTO{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", distributorPhone='" + distributorPhone + '\'' +
                ", distributorName='" + distributorName + '\'' +
                ", type='" + type + '\'' +
                ", rate=" + rate +
                ", nper=" + nper +
                ", pv=" + pv +
                ", fv=" + fv +
                ", pmt=" + pmt +
                ", currentAge=" + currentAge +
                ", destinationAge=" + destinationAge +
                ", corpus=" + corpus +
                ", inflation=" + inflation +
                ", amountInvest=" + amountInvest +
                ", retirementAge=" + retirementAge +
                ", currentRate=" + currentRate +
                ", monthlyExpense=" + monthlyExpense +
                ", assumedFutureReturn=" + assumedFutureReturn +
                ", assumedFutureInflation=" + assumedFutureInflation +
                ", residualAmt=" + residualAmt +
                ", preRetirementReturn=" + preRetirementReturn +
                ", postRetirementReturn=" + postRetirementReturn +
                ", lifeExpectancy=" + lifeExpectancy +
                ", principal=" + principal +
                ", years=" + years +
                ", stepUp=" + stepUp +
                ", lumpSum=" + lumpSum +
                ", initialLumpsum=" + initialLumpsum +
                ", ppfAmt=" + ppfAmt +
                ", ppfRate=" + ppfRate +
                ", pfAmt=" + pfAmt +
                ", pfRate=" + pfRate +
                ", postalAmt=" + postalAmt +
                ", postalRate=" + postalRate +
                ", bankAmt=" + bankAmt +
                ", bankRate=" + bankRate +
                ", cdAmt=" + cdAmt +
                ", cdRate=" + cdRate +
                ", insureAmt=" + insureAmt +
                ", insureRate=" + insureRate +
                ", equityAmt=" + equityAmt +
                ", equityRate=" + equityRate +
                ", debtAmt=" + debtAmt +
                ", debtRate=" + debtRate +
                ", sipAmt=" + sipAmt +
                ", sipRate=" + sipRate +
                ", rdAmt=" + rdAmt +
                ", rdRate=" + rdRate +
                ", swpRate=" + swpRate +
                ", inflationRate=" + inflationRate +
                ", commissionRate=" + commissionRate +
                ", time=" + time +
                ", investAmt=" + investAmt +
                ", avgInsureCommission=" + avgInsureCommission +
                ", capApprRate=" + capApprRate +
                ", trail=" + trail +
                ", sipBookSize=" + sipBookSize +
                ", investRate=" + investRate +
                ", equityAum=" + equityAum +
                ", houseValue=" + houseValue +
                ", selfFunding=" + selfFunding +
                ", loanRate=" + loanRate +
                ", loanPeriod=" + loanPeriod +
                ", housingInflation=" + housingInflation +
                ", monthlyRent=" + monthlyRent +
                ", sipGrowthRate=" + sipGrowthRate +
                ", currentIncome=" + currentIncome +
                ", investGrowthRate=" + investGrowthRate +
                ", incomeIncrementRate=" + incomeIncrementRate +
                ", timePeriod=" + timePeriod +
                ", outstandingLoanAmt=" + outstandingLoanAmt +
                ", childEducationLiability=" + childEducationLiability +
                ", incidentalMarriageLiability=" + incidentalMarriageLiability +
                ", availableInsuranceDeduct=" + availableInsuranceDeduct +
                ", investmentBalance=" + investmentBalance +
                ", sipInvestPeriod=" + sipInvestPeriod +
                ", totalInvestPeriod=" + totalInvestPeriod +
                ", growthRate=" + growthRate +
                ", currentSIPInvestment=" + currentSIPInvestment +
                ", currentLumpsumInvestment=" + currentLumpsumInvestment +
                ", investmentPortfolioRate=" + investmentPortfolioRate +
                ", retirementCorpus=" + retirementCorpus +
                ", swpReturnRate=" + swpReturnRate +
                ", corpusLeft=" + corpusLeft +
                ", nscAmt=" + nscAmt +
                ", nscRate=" + nscRate +
                ", companyAmt=" + companyAmt +
                ", companyRate=" + companyRate +
                ", insuranceAmt=" + insuranceAmt +
                ", insuranceRate=" + insuranceRate +
                ", balancedAmt=" + balancedAmt +
                ", balancedRate=" + balancedRate +
                ", nonLiquidDebtAmt=" + nonLiquidDebtAmt +
                ", nonLiquidDebtRate=" + nonLiquidDebtRate +
                ", liquidDebtAmt=" + liquidDebtAmt +
                ", liquidDebtRate=" + liquidDebtRate +
                ", percentMode=" + percentMode +
                ", timePeriods=" + timePeriods +
                '}';
    }

}
