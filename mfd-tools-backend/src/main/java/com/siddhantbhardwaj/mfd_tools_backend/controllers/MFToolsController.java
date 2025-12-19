package com.siddhantbhardwaj.mfd_tools_backend.controllers;

import com.siddhantbhardwaj.mfd_tools_backend.dto.MFCalculatorRequestDTO;
import com.siddhantbhardwaj.mfd_tools_backend.dto.ModelFinancialPortfolioRequest;
import com.siddhantbhardwaj.mfd_tools_backend.service.blueprintservices.MFToolsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mfTools")
public class MFToolsController {

    private static final Logger mfToolsControllerLogger = LoggerFactory.getLogger(MFToolsController.class);

    @Autowired
    private MFToolsService mfToolsService;

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateFutureValue")
    public Map<String,Double> calculateFutureValue(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,Double> futureValueMap = new HashMap<>();
        try {
            futureValueMap = mfToolsService.calculateFutureValue(
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getNper(),
                    mfCalculatorRequestDTO.getPmt(),
                    mfCalculatorRequestDTO.getPv()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),futureValueMap);
        return futureValueMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculatePresentValue")
    public Map<String,Double> calculatePresentValue(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,Double> presentValueMap = new HashMap<>();
        try {
            presentValueMap = mfToolsService.calculatePresentValue(
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getNper(),
                    mfCalculatorRequestDTO.getPmt(),
                    mfCalculatorRequestDTO.getFv()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),presentValueMap);
        return presentValueMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateExcelPMT")
    public Map<String,Double> calculateExcelPMT(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,Double> excelPMTMap = new HashMap<>();
        try {
            excelPMTMap = mfToolsService.calculateExcelPmtValue(
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getNper(),
                    mfCalculatorRequestDTO.getPv(),
                    mfCalculatorRequestDTO.getFv()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),excelPMTMap);
        return excelPMTMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculatePmtValue")
    public Map<String,Double> calculatePMT(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,Double> pmtValueMap = new HashMap<>();
        try {
            pmtValueMap = mfToolsService.calculatePmtValue(
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getNper(),
                    mfCalculatorRequestDTO.getPv(),
                    mfCalculatorRequestDTO.getFv()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),pmtValueMap);
        return pmtValueMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateGoalInvestPlan")
    public Map<String,Double> calculateGoalInvestPlan(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,Double> goalInvestPlanMap = new HashMap<>();
        try {
            goalInvestPlanMap = mfToolsService.calculateGoalInvestPlan(
                    mfCalculatorRequestDTO.getCurrentAge(),
                    mfCalculatorRequestDTO.getDestinationAge(),
                    mfCalculatorRequestDTO.getCorpus(),
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getInflation(),
                    mfCalculatorRequestDTO.getAmountInvest()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),goalInvestPlanMap);
        return goalInvestPlanMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateRetirementGoal")
    public Map<String, Double> calculateRetirementGoal(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with retirementGoalCalculateRequest {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,Double> retirementGoalMap = new HashMap<>();
        try{
            retirementGoalMap = mfToolsService.calculateRetirementGoal(
                    mfCalculatorRequestDTO.getCurrentAge(),
                    mfCalculatorRequestDTO.getRetirementAge(),
                    mfCalculatorRequestDTO.getInflation(),
                    mfCalculatorRequestDTO.getMonthlyExpense(),
                    mfCalculatorRequestDTO.getPreRetirementReturn(),
                    mfCalculatorRequestDTO.getPostRetirementReturn(),
                    mfCalculatorRequestDTO.getLifeExpectancy()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),mfCalculatorRequestDTO);
        return retirementGoalMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateSIPReturn")
    public Map<String, List<Double>> calculateSIPReturn(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String,List<Double>> sipReturnMap = new HashMap<>();
        try{
            sipReturnMap = mfToolsService.calculateSIPReturn(
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getPrincipal(),
                    mfCalculatorRequestDTO.getYears(),
                    mfCalculatorRequestDTO.getStepUp(),
                    mfCalculatorRequestDTO.getInflation(),
                    mfCalculatorRequestDTO.getLumpSum(),
                    mfCalculatorRequestDTO.getPercentMode()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),sipReturnMap);
        return sipReturnMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateTotalReturnWithLumpSumAndSIP")
    public Map<String, List<Double>> calculateTotalReturnWithLumpSumAndSIP(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, List<Double>> totalReturnMap = new HashMap<>();
        try{
            totalReturnMap = mfToolsService.calculateTotalReturnWithLumpSumAndSIP(
                    mfCalculatorRequestDTO.getInitialLumpsum(),
                    mfCalculatorRequestDTO.getPrincipal(),
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getYears(),
                    mfCalculatorRequestDTO.getInflation()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),mfCalculatorRequestDTO);
        return totalReturnMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateRequiredSipAmt")
    public Map<String,Double> calculateRequiredSipAmt(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> reqdSIPAmtMap = new HashMap<>();
        try{
            reqdSIPAmtMap = mfToolsService.calculateRequiredSipAmt(
                    mfCalculatorRequestDTO.getCurrentAge(),
                    mfCalculatorRequestDTO.getRetirementAge(),
                    mfCalculatorRequestDTO.getCurrentRate(),
                    mfCalculatorRequestDTO.getInflation(),
                    mfCalculatorRequestDTO.getMonthlyExpense(),
                    mfCalculatorRequestDTO.getAssumedFutureReturn(),
                    mfCalculatorRequestDTO.getAssumedFutureInflation(),
                    mfCalculatorRequestDTO.getResidualAmt()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),reqdSIPAmtMap);
        return reqdSIPAmtMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateDifferentialReturns")
    public Map<String,Double> calculateDifferentialReturns(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> differentialReturnsMap = new HashMap<>();
        try{
            differentialReturnsMap = mfToolsService.calculateDifferentialReturnsByAge(
                    mfCalculatorRequestDTO.getCurrentAge(),
                    mfCalculatorRequestDTO.getRetirementAge(),
                    mfCalculatorRequestDTO.getCorpus(),
                    mfCalculatorRequestDTO.getRate(),
                    mfCalculatorRequestDTO.getInflation()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),differentialReturnsMap);
        return differentialReturnsMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateRetirementPortfolio")
    public Map<String, Double> calculateRetirementPortfolio(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> retirementPortfolioMap = new HashMap<>();
        try{
            retirementPortfolioMap = mfToolsService.calculateRetirementPortfolio(
                    mfCalculatorRequestDTO.getPpfAmt(),
                    mfCalculatorRequestDTO.getPpfRate(),
                    mfCalculatorRequestDTO.getPfAmt(),
                    mfCalculatorRequestDTO.getPfRate(),
                    mfCalculatorRequestDTO.getPostalAmt(),
                    mfCalculatorRequestDTO.getPostalRate(),
                    mfCalculatorRequestDTO.getBankAmt(),
                    mfCalculatorRequestDTO.getBankRate(),
                    mfCalculatorRequestDTO.getCdAmt(),
                    mfCalculatorRequestDTO.getCdRate(),
                    mfCalculatorRequestDTO.getInsureAmt(),
                    mfCalculatorRequestDTO.getInsureRate(),
                    mfCalculatorRequestDTO.getEquityAmt(),
                    mfCalculatorRequestDTO.getEquityRate(),
                    mfCalculatorRequestDTO.getDebtAmt(),
                    mfCalculatorRequestDTO.getDebtRate(),
                    mfCalculatorRequestDTO.getSipAmt(),
                    mfCalculatorRequestDTO.getSipRate(),
                    mfCalculatorRequestDTO.getRdAmt(),
                    mfCalculatorRequestDTO.getRdRate(),
                    mfCalculatorRequestDTO.getCurrentAge(),
                    mfCalculatorRequestDTO.getSwpRate(),
                    mfCalculatorRequestDTO.getRetirementAge(),
                    mfCalculatorRequestDTO.getInflationRate()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),retirementPortfolioMap);
        return retirementPortfolioMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @RequestMapping("/distributorCommissionCalc")
    public Map<String,Object> distributorCommissionCalc (@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Object> distributorCommissionCalcMap = new HashMap<>();
        try{
            distributorCommissionCalcMap = mfToolsService.distributorCommissionCalc(
                    mfCalculatorRequestDTO.getSipAmt(),
                    mfCalculatorRequestDTO.getSipRate(),
                    mfCalculatorRequestDTO.getCommissionRate(),
                    mfCalculatorRequestDTO.getTime()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),distributorCommissionCalcMap);
        return distributorCommissionCalcMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/diffBetweenInsuranceAndSIPCommission")
    public Map<String,Double> diffBetweenInsuranceAndSIPCommission(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> diffInsuranceSIPCommissionMap = new HashMap<>();
        try{
            diffInsuranceSIPCommissionMap = mfToolsService.diffBetweenInsuranceAndSIPCommission(
                    mfCalculatorRequestDTO.getInvestAmt(),
                    mfCalculatorRequestDTO.getAvgInsureCommission(),
                    mfCalculatorRequestDTO.getCapApprRate(),
                    mfCalculatorRequestDTO.getTrail(),
                    mfCalculatorRequestDTO.getTime()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),diffInsuranceSIPCommissionMap);
        return diffInsuranceSIPCommissionMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/revenueModelSIPAndOneTimeBookSize")
    public Map<String,Double> revenueModelSIPAndOneTimeBookSize(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> revenueModelMap = new HashMap<>();
        try{
            revenueModelMap = mfToolsService.revenueModelSIPAndOneTimeBookSize(
                    mfCalculatorRequestDTO.getSipBookSize(),
                    mfCalculatorRequestDTO.getInvestRate(),
                    mfCalculatorRequestDTO.getCommissionRate(),
                    mfCalculatorRequestDTO.getEquityAum(),
                    mfCalculatorRequestDTO.getTime()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),revenueModelMap);
        return revenueModelMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateEMIVersusSIP")
    public Map<String,Double> calculateEMIVersusSIP(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> emiVsSIPMap = new HashMap<>();
        try{
            emiVsSIPMap = mfToolsService.calculateEMIVersusSIP(
                    mfCalculatorRequestDTO.getHouseValue(),
                    mfCalculatorRequestDTO.getSelfFunding(),
                    mfCalculatorRequestDTO.getLoanRate(),
                    mfCalculatorRequestDTO.getLoanPeriod(),
                    mfCalculatorRequestDTO.getHousingInflation(),
                    mfCalculatorRequestDTO.getMonthlyRent(),
                    mfCalculatorRequestDTO.getSipGrowthRate()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),emiVsSIPMap);
        return emiVsSIPMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/humanLifeMethod")
    public Map<String,Double> humanLifeMethod(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> humanLifeMethodMap = new HashMap<>();
        try{
            humanLifeMethodMap = mfToolsService.humanLifeMethod(
                    mfCalculatorRequestDTO.getCurrentIncome(),
                    mfCalculatorRequestDTO.getInvestGrowthRate(),
                    mfCalculatorRequestDTO.getIncomeIncrementRate(),
                    mfCalculatorRequestDTO.getTimePeriod()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),humanLifeMethodMap);
        return humanLifeMethodMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/needBasedApproach")
    public Map<String,Double> needBasedApproach(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> needApproachMap = new HashMap<>();
        try{
            needApproachMap = mfToolsService.needBasedApproach(
                    mfCalculatorRequestDTO.getCurrentIncome(),
                    mfCalculatorRequestDTO.getInvestGrowthRate(),
                    mfCalculatorRequestDTO.getIncomeIncrementRate(),
                    mfCalculatorRequestDTO.getTimePeriod(),
                    mfCalculatorRequestDTO.getOutstandingLoanAmt(),
                    mfCalculatorRequestDTO.getChildEducationLiability(),
                    mfCalculatorRequestDTO.getIncidentalMarriageLiability(),
                    mfCalculatorRequestDTO.getAvailableInsuranceDeduct(),
                    mfCalculatorRequestDTO.getInvestmentBalance()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),needApproachMap);
        return needApproachMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/limitedPeriodSIP")
    public Map<String,Object> limitedPeriodSIP(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Object> limitedPeriodSIPMap = new HashMap<>();
        try{
            limitedPeriodSIPMap = mfToolsService.limitedPeriodSIP(
                    mfCalculatorRequestDTO.getSipAmt(),
                    mfCalculatorRequestDTO.getSipInvestPeriod(),
                    mfCalculatorRequestDTO.getTotalInvestPeriod(),
                    mfCalculatorRequestDTO.getGrowthRate()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),limitedPeriodSIPMap);
        return limitedPeriodSIPMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculatePreRetirementSWPReturn")
    public Map<String, Double> calculatePreRetirementSWPReturn(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> preRetirementMap = new HashMap<>();
        try{
            preRetirementMap = mfToolsService.calculatePreRetirementSWPReturn(
                    mfCalculatorRequestDTO.getCurrentAge(),
                    mfCalculatorRequestDTO.getRetirementAge(),
                    mfCalculatorRequestDTO.getCurrentSIPInvestment(),
                    mfCalculatorRequestDTO.getCurrentLumpsumInvestment(),
                    mfCalculatorRequestDTO.getInvestmentPortfolioRate(),
                    mfCalculatorRequestDTO.getSwpRate()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),preRetirementMap);
        return preRetirementMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculatePostRetirementSWPReturn")
    public Map<String,Double> calculatePostRetirementSWPReturn(@RequestBody MFCalculatorRequestDTO mfCalculatorRequestDTO) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with mfCalculatorRequestDTO {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                mfCalculatorRequestDTO);
        Map<String, Double> postRetirementMap = new HashMap<>();
        try{
            postRetirementMap = mfToolsService.calculatePostRetirementSWPReturn(
                    mfCalculatorRequestDTO.getRetirementCorpus(),
                    mfCalculatorRequestDTO.getInvestGrowthRate(),
                    mfCalculatorRequestDTO.getSwpReturnRate(),
                    mfCalculatorRequestDTO.getCorpusLeft()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),postRetirementMap);
        return postRetirementMap;
    }

    @PreAuthorize("hasAuthority('ROLE_BASIC_USER')")
    @PostMapping("/calculateModelFinancialPortfolio")
    public Map<String,Map<Integer,Map<String,Double>>> calculateModelFinancialPortfolio(@RequestBody ModelFinancialPortfolioRequest modelFinancialPortfolioRequest) throws Exception{
        mfToolsControllerLogger.info("Entering {} method with modelFinancialPortfolioRequest {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                modelFinancialPortfolioRequest);
        Map<String,Map<Integer,Map<String,Double>>> modelFinancialPortfolioMap = new HashMap<>();
        try{
            modelFinancialPortfolioMap = mfToolsService.calculateModelFinancialPortfolio(
                    modelFinancialPortfolioRequest.getPpfAmt(),
                    modelFinancialPortfolioRequest.getPpfRate(),
                    modelFinancialPortfolioRequest.getPfAmt(),
                    modelFinancialPortfolioRequest.getPfRate(),
                    modelFinancialPortfolioRequest.getNscAmt(),
                    modelFinancialPortfolioRequest.getNscRate(),
                    modelFinancialPortfolioRequest.getPostalAmt(),
                    modelFinancialPortfolioRequest.getPostalRate(),
                    modelFinancialPortfolioRequest.getBankAmt(),
                    modelFinancialPortfolioRequest.getBankRate(),
                    modelFinancialPortfolioRequest.getCompanyAmt(),
                    modelFinancialPortfolioRequest.getCompanyRate(),
                    modelFinancialPortfolioRequest.getInsuranceAmt(),
                    modelFinancialPortfolioRequest.getInsuranceRate(),
                    modelFinancialPortfolioRequest.getEquityAmt(),
                    modelFinancialPortfolioRequest.getEquityRate(),
                    modelFinancialPortfolioRequest.getBalancedAmt(),
                    modelFinancialPortfolioRequest.getBalancedRate(),
                    modelFinancialPortfolioRequest.getNonLiquidDebtAmt(),
                    modelFinancialPortfolioRequest.getNonLiquidDebtRate(),
                    modelFinancialPortfolioRequest.getLiquidDebtAmt(),
                    modelFinancialPortfolioRequest.getLiquidDebtRate(),
                    modelFinancialPortfolioRequest.getSipAmt(),
                    modelFinancialPortfolioRequest.getSipRate(),
                    modelFinancialPortfolioRequest.getRdAmt(),
                    modelFinancialPortfolioRequest.getRdRate()
            );
        }catch (final Exception e){
            mfToolsControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),modelFinancialPortfolioMap);
        return modelFinancialPortfolioMap;
    }


}
