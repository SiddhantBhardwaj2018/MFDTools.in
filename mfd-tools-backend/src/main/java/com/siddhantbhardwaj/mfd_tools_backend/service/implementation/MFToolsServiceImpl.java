package com.siddhantbhardwaj.mfd_tools_backend.service.implementation;

import com.siddhantbhardwaj.mfd_tools_backend.service.blueprintservices.MFToolsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Service
public class MFToolsServiceImpl implements MFToolsService {

    private static final Logger mfToolsServiceLogger = LoggerFactory.getLogger(MFToolsServiceImpl.class);

    @Override
    public Map<String, Double> calculateFutureValue(double rate, double nper, double pmt, double pv) throws Exception{
        mfToolsServiceLogger.info("Entering {} method with rate {} , nper {} , pmt {} and pv {}",Thread.currentThread().getStackTrace()[2].getMethodName(),rate, nper,pmt,pv);
        Map<String,Double> futureValueMap = new HashMap<>();
        Double fv;
        try{
            if(rate != 0){
                fv = pv * Math.pow(1 + rate,nper) + pmt * ((Math.pow(1 + rate,nper) - 1) / rate);
            }else{
                fv = pv + pmt * nper;
            }
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        futureValueMap.put("futureValue",Math.round(fv * 100.0) / 100.0);
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),futureValueMap);
        return futureValueMap;
    }

    @Override
    public Map<String, Double> calculatePresentValue(double rate, double nper, double pmt, double fv) throws Exception{
        mfToolsServiceLogger.info("Entering {} method with rate {} , nper {} , pmt {} and fv {}",Thread.currentThread().getStackTrace()[2].getMethodName(),rate, nper,pmt,fv);
        Map<String,Double> presentValueMap = new HashMap<>();
        Double pv;
        try{
            if(rate == 0){
                pv = fv + pmt * nper;
            }else{
                pv = pmt * ((1 - Math.pow(1 + rate,-nper)) / rate) + fv / Math.pow(1 + rate,nper);
            }
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        presentValueMap.put("presentValue",pv);
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),presentValueMap);
        return presentValueMap;
    }

    @Override
    public Map<String, Double> calculateExcelPmtValue(double rate, double nper, double pv, double fv) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with rate {} , nper {} , pv {} and fv {}",Thread.currentThread().getStackTrace()[2].getMethodName(),rate, nper,pv,fv);
        Map<String,Double> excelPmtMap = new HashMap<>();
        Double pmt;
        try{
            if(nper == 0){
                pmt  = (double) 0;
            } else if (rate == 0) {
                pmt = -1 * (pv + fv) / nper;
            }else{
                pmt = (rate * pv) / (1 - Math.pow(1 + rate, -nper));
            }
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        excelPmtMap.put("excelPmt",pmt);
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),excelPmtMap);
        return excelPmtMap;
    }

    @Override
    public Map<String, Double> calculatePmtValue(double rate, double nper, double pv, double fv) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with rate {} , nper {} , pv {} and fv {}",Thread.currentThread().getStackTrace()[2].getMethodName(),rate, nper,pv,fv);
        Map<String,Double> pmtMap = new HashMap<>();
        Double pmt;
        try{
            if(nper == 0){
                pmt = (double) 0;
            } else if (rate == 0) {
                pmt =  -(pv + fv) / nper;
            }else{
                pmt = (rate * (pv + fv)) / (Math.pow(1 + rate, nper) - 1);
            }
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        pmtMap.put("pmt",pmt);
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),pmtMap);
        return pmtMap;
    }

    @Override
    public Map<String, Double> calculateGoalInvestPlan(double currentAge, double destinationAge, double corpus, double rate, double inflation, double amountInvest) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentAge {} , destinationAge {} , corpus {}, rate {}, inflation {} and amountInvest {}",Thread.currentThread().getStackTrace()[2].getMethodName(),currentAge, destinationAge,corpus,rate, inflation, amountInvest);
        Map<String,Double> goalInvestMap = new HashMap<>();
        try {
            Double futureCost =
                    calculateFutureValue(
                            inflation,
                            destinationAge - currentAge,
                            0,
                            corpus
                    ).get("futureValue");
            Double investAppAmt = calculateFutureValue(
                    rate, destinationAge - currentAge, 0, amountInvest
            ).get("futureValue");
            Double deficitCorpus = futureCost - investAppAmt;
            Double lumpsumAmt = calculatePresentValue(
                    rate,destinationAge - currentAge,0,deficitCorpus
            ).get("presentValue");
            Double monthlyInvestReqd = calculatePmtValue(
                    rate / 12, (destinationAge - currentAge) * 12,0,deficitCorpus
            ).get("pmt");
            goalInvestMap.put("futureCost",futureCost);
            goalInvestMap.put("investAppAmt",investAppAmt);
            goalInvestMap.put("deficitCorpus",deficitCorpus);
            goalInvestMap.put("lumpsumAmt",lumpsumAmt);
            goalInvestMap.put("monthlyInvestReqd",monthlyInvestReqd);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),goalInvestMap);
        return goalInvestMap;
    }

    @Override
    public Map<String, Double> calculateRetirementGoal(double currentAge, double retirementAge, double inflation, double monthlyExpense, double preRetirementReturn, double postRetirementReturn, double lifeExpectancy) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentAge {} , retirementAge {} , inflation {}, monthlyExpense {}, preRetirementReturn {}, postRetirementReturn {} and lifeExpectancy {}",Thread.currentThread().getStackTrace()[2].getMethodName(),currentAge,retirementAge, inflation, monthlyExpense, preRetirementReturn, postRetirementReturn, lifeExpectancy );
        Map<String,Double> goalInvestMap = new HashMap<>();
        try{
            Double monthlyRequirementAtRetirement = calculateFutureValue(
                    inflation,
                    retirementAge - currentAge,
                    0,
                    monthlyExpense
            ).get("futureValue");
            Double corpusAtRetirement = calculatePresentValue(
                    postRetirementReturn / 12,
                    (lifeExpectancy - retirementAge) * 12,
                    monthlyRequirementAtRetirement,
                    0
            ).get("presentValue");
            Double monthlySIPAmtForInvestment = calculatePmtValue(
                    preRetirementReturn / 12,
                    (retirementAge - currentAge) * 12,
                    0,
                    corpusAtRetirement
            ).get("pmt");
            goalInvestMap.put("monthlyRequirementAtRetirement",monthlyRequirementAtRetirement);
            goalInvestMap.put("corpusAtRetirement",corpusAtRetirement);
            goalInvestMap.put("monthlySIPAmtForInvestment",monthlySIPAmtForInvestment);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),goalInvestMap);
        return goalInvestMap;
    }

    @Override
    public Map<String, List<Double>> calculateSIPReturn(double rate, double principal, double years, double stepUp, double inflation, boolean lumpSum,boolean percentMode) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with rate {} , principal {} , years {}, stepUp {}, inflation {}, and lumpSum {}",Thread.currentThread().getStackTrace()[2].getMethodName(),rate,principal, years, stepUp, inflation, lumpSum );
        Map<String,List<Double>> sipReturnMap = new HashMap<>();
        List<Double> sipReturnList = new ArrayList<>();
        List<Double> sipInvestList = new ArrayList<>();
        List<Double> sipInvestWithoutStepUpList = new ArrayList<>();
        List<Double> sipReturnWithoutStepUpList = new ArrayList<>();
        try{
            if(!lumpSum) {
                double prevYrMonthlyInvestment = principal;
                double maturityAmt = 0;
                double annualInvestment = 0;
                double maturityAmtWithoutStepUp = 0;
                if(percentMode){
                    double annualInvestWithoutStepUp = 0;
                    for(int year = 1;year < (years + 1);year++){
                        if(year > 1){
                            prevYrMonthlyInvestment = prevYrMonthlyInvestment * (1 + stepUp);
                        }
                        annualInvestment = annualInvestment + (prevYrMonthlyInvestment * 12);
                        annualInvestWithoutStepUp = annualInvestWithoutStepUp + (principal * 12);
                        sipInvestList.add(annualInvestment);
                        sipInvestWithoutStepUpList.add(annualInvestWithoutStepUp);
                        if(year > 1){
                            maturityAmt = calculateFutureValue(
                                    (rate - inflation)/12,12,prevYrMonthlyInvestment,maturityAmt
                            ).get("futureValue");
                            maturityAmtWithoutStepUp = calculateFutureValue(
                                    (rate - inflation)/12,12,principal,maturityAmtWithoutStepUp
                            ).get("futureValue");
                        }else{
                            maturityAmt  =  calculateFutureValue(
                                    (rate - inflation)/12,12,prevYrMonthlyInvestment,0
                            ).get("futureValue");
                            maturityAmtWithoutStepUp  =  calculateFutureValue(
                                    (rate - inflation)/12,12,principal,0
                            ).get("futureValue");
                        }
                        sipReturnList.add(
                                Math.round(maturityAmt * 100.0) / 100.0
                        );
                        sipReturnWithoutStepUpList.add(
                                Math.round(maturityAmtWithoutStepUp * 100.0) / 100.0
                        );
                    }
                    sipReturnMap.put("sipInvestList",sipInvestList);
                    sipReturnMap.put("sipInvestWithoutStepUpList",sipInvestWithoutStepUpList);
                    sipReturnMap.put("sipReturnWithoutStepUpList",sipReturnWithoutStepUpList);
                }else{
                    for(int i = 1;i < (years + 1);i++){
                        double months = i * 12;
                        double monthlyReturn = 0;
                        for(int j = 0;j < months;j++){
                            monthlyReturn =
                                    (principal + (j > 12 ? stepUp : 0) + monthlyReturn) *
                                            (1 + (rate - inflation) / 12);
                        }
                        sipReturnList.add(
                                Math.round(monthlyReturn * 100.0) / 100.0
                        );
                    }
                }
            }else{
                IntStream.range(1, ((int) years + 1)).forEach(year -> {
                    sipReturnList.add(
                            Math.round(
                                    (principal * Math.pow(1 + (rate - inflation), year)) * 100.0
                            ) / 100.0
                    );
                });

            }
            sipReturnMap.put("sipReturnList",sipReturnList);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),sipReturnMap);
        return sipReturnMap;
    }

    @Override
    public Map<String, List<Double>> calculateTotalReturnWithLumpSumAndSIP(double initialLumpsum, double principal, double rate, double years, double inflation) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with initialLumpsum {} , principal {} , rate {}, years {}, and inflation {}",Thread.currentThread().getStackTrace()[2].getMethodName(),initialLumpsum, principal, rate,years, inflation );
        Map<String,List<Double>> totalReturnMap = new HashMap<>();
        try{
            List<Double> returnList = new ArrayList<>();
            IntStream.range(1, ((int) years + 1)).forEach(year -> {
                double totalReturn = 0;
                try {
                    totalReturn = calculateFutureValue(
                            (rate - inflation) / 12,
                            year * 12,
                            principal,
                            initialLumpsum
                    ).get("futureValue");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
                returnList.add(totalReturn);
            });

            totalReturnMap.put("totalReturnList",returnList);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),totalReturnMap);
        return totalReturnMap;
    }

    @Override
    public Map<String, Double> calculateRequiredSipAmt(double currentAge, double retirementAge, double currentRate, double inflation, double monthlyExpense, double assumedFutureReturn, double assumedFutureInflation, double residualAmt) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentAge {} , retirementAge {} , currentRate {}, inflation {}, monthlyExpense {}, assumedFutureReturn {}, assumedFutureInflation {} and residualAmt {}",Thread.currentThread().getStackTrace()[2].getMethodName(),currentAge, retirementAge, currentRate, inflation, monthlyExpense,  assumedFutureReturn, assumedFutureInflation,residualAmt );
        Map<String,Double> requiredSIPMap = new HashMap<>();
        try{
            double amountReqdMonthly  = calculateFutureValue(
                    inflation,
                    retirementAge - currentAge,
                    0,
                    monthlyExpense
            ).get("futureValue");
            double reqdCapital = calculatePresentValue(
                    (assumedFutureReturn - assumedFutureInflation) / 12,
                    12 * (90 - retirementAge),
                    amountReqdMonthly,
                    residualAmt
            ).get("presentValue");
            double reqdSIPAmt = calculatePmtValue(
                    (currentRate - inflation) / 12,
                    12 * (retirementAge - currentAge),
                    0,
                    reqdCapital
            ).get("pmt");
            requiredSIPMap.put("amountReqdMonthly",amountReqdMonthly);
            requiredSIPMap.put("reqdCapital",reqdCapital);
            requiredSIPMap.put("reqdSIPAmt",reqdSIPAmt);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),requiredSIPMap);
        return requiredSIPMap;
    }

    @Override
    public Map<String, Double> calculateDifferentialReturnsByAge(double currentAge, double retirementAge, double corpus, double rate, double inflation) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentAge {} , retirementAge {} , corpus {}, rate {} and inflation {}",Thread.currentThread().getStackTrace()[2].getMethodName(),currentAge, retirementAge, corpus, rate, inflation);
        Map<String,Double> differentialReturnsMap = new HashMap<>();
        try {
            double currentYr = calculatePmtValue(
                    (rate - inflation) / 12,
                    (retirementAge - currentAge) * 12,
                    0,
                    corpus
            ).get("pmt");
            double prevTenYr = calculatePmtValue(
                    (rate - inflation) / 12,
                    (retirementAge - (currentAge - 10)) * 12,
                    0,
                    corpus
            ).get("pmt");
            double nextTenYr = calculatePmtValue(
                    (rate - inflation) / 12,
                    (retirementAge - (currentAge + 10)) * 12,
                    0,
                    corpus
            ).get("pmt");
            differentialReturnsMap.put("currentYr",currentYr);
            differentialReturnsMap.put("prevTenYr",prevTenYr);
            differentialReturnsMap.put("nextTenYr",nextTenYr);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),differentialReturnsMap);
        return differentialReturnsMap;
    }

    @Override
    public Map<String, Double> calculateRetirementPortfolio(double ppfAmt, double ppfRate, double pfAmt, double pfRate, double postalAmt, double postalRate, double bankAmt, double bankRate, double cdAmt, double cdRate, double insureAmt, double insureRate, double equityAmt, double equityRate, double debtAmt, double debtRate, double sipAmt, double sipRate, double rdAmt, double rdRate, double currentAge, double swpRate, double retirementAge, double inflationRate) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with ppfAmt {} , ppfRate {} , pfAmt {}, pfRate {}, postalAmt {}, postalRate {}, bankAmt {}, bankRate {}, cdAmt {}, cdRate {}, insureAmt {}, insureRate {}, equityAmt {}, equityRate {}, debtAmt {}, debtRate {}, sipAmt {}, sipRate {}, rdAmt {}, rdRate {}, currentAge {}, swpRate {}, retirementAge {}, and inflationRate {}",Thread.currentThread().getStackTrace()[2].getMethodName(),ppfAmt,ppfRate, pfAmt,pfRate,postalAmt,postalRate,bankAmt,bankRate,cdAmt,cdRate,insureAmt,insureRate,equityAmt,equityRate,debtAmt,debtAmt,sipAmt,sipRate,rdAmt,rdRate,currentAge,swpRate,retirementAge,inflationRate);
        Map<String,Double> retirementPortfolioMap = new HashMap<>();
        try{
            double finalVal = 0;
            double finalSWP = 0;
            Map<String, List<Double>> retirementTracker = new HashMap<>();
            for(int i = 0;i < (retirementAge - currentAge);i++){
                if(i == 0){
                    retirementTracker.put("ppf",List.of(new Double[]{ calculateFutureValue((ppfRate - inflationRate),1,0,ppfAmt).get("futureValue") }));
                    retirementTracker.put("pf",List.of(new Double[]{ calculateFutureValue((pfRate - inflationRate),1,0,pfAmt).get("futureValue") }));
                    retirementTracker.put("postal",List.of(new Double[]{ calculateFutureValue((postalRate - inflationRate),1,0,postalAmt).get("futureValue") }));
                    retirementTracker.put("bank",List.of(new Double[]{ calculateFutureValue((bankRate - inflationRate),1,0,bankAmt).get("futureValue") }));
                    retirementTracker.put("cd",List.of(new Double[]{ calculateFutureValue((cdRate - inflationRate),1,0,cdAmt).get("futureValue") }));
                    retirementTracker.put("insure",List.of(new Double[]{ calculateFutureValue((insureRate - inflationRate),1,0,insureAmt).get("futureValue") }));
                    retirementTracker.put("equity",List.of(new Double[]{ calculateFutureValue((equityRate - inflationRate),1,0,equityAmt).get("futureValue") }));
                    retirementTracker.put("debt",List.of(new Double[]{ calculateFutureValue((debtRate - inflationRate),1,0,debtAmt).get("futureValue") }));
                    retirementTracker.put("sip",List.of(new Double[]{ calculateFutureValue((sipRate - inflationRate) / 12,(i + 1) * 12,sipAmt,0).get("futureValue") }));
                    retirementTracker.put("rd",List.of(new Double[]{ calculateFutureValue((rdRate - inflationRate),1,rdAmt,0).get("futureValue") }));
                }else{

                    retirementTracker.put("ppf",
                            Stream.of(
                                    retirementTracker.get("ppf"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (ppfRate - inflationRate),
                                                    1,0,retirementTracker.get("ppf").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("pf",
                            Stream.of(
                                    retirementTracker.get("pf"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (pfRate - inflationRate),
                                                    1,0,retirementTracker.get("pf").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("postal",
                            Stream.of(
                                    retirementTracker.get("postal"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (postalRate - inflationRate),
                                                    1,0,retirementTracker.get("pf").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("bank",
                            Stream.of(
                                    retirementTracker.get("bank"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (bankRate - inflationRate),
                                                    1,0,retirementTracker.get("bank").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("cd",
                            Stream.of(
                                    retirementTracker.get("cd"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (cdRate - inflationRate),
                                                    1,0,retirementTracker.get("cd").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("insure",
                            Stream.of(
                                    retirementTracker.get("insure"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (insureRate - inflationRate),
                                                    1,0,retirementTracker.get("insure").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("equity",
                            Stream.of(
                                    retirementTracker.get("equity"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (equityRate - inflationRate),
                                                    1,0,retirementTracker.get("equity").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("debt",
                            Stream.of(
                                    retirementTracker.get("debt"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (debtRate - inflationRate),
                                                    1,0,retirementTracker.get("debt").get(i - 1)
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("sip",
                            Stream.of(
                                    retirementTracker.get("sip"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (sipRate - inflationRate) / 12,
                                                    (i + 1) * 12,0,sipAmt
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                    retirementTracker.put("rd",
                            Stream.of(
                                    retirementTracker.get("rd"),
                                    List.of(new Double[]{
                                            calculateFutureValue(
                                                    (rdRate - inflationRate) / 12,
                                                    (i + 1) * 12,0,rdAmt
                                            ).get("futureValue")
                                    })
                            ).flatMap(Collection::stream).collect(Collectors.toList()));
                }
            }
            for(String scheme : retirementTracker.keySet()){
                finalVal += retirementTracker.get(scheme).get((int) (retirementAge - currentAge - 1));
            }
            finalSWP = (swpRate * finalVal) / 12;
            retirementPortfolioMap.put("finalVal",finalVal);
            retirementPortfolioMap.put("finalSWP",finalSWP);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),retirementPortfolioMap);
        return retirementPortfolioMap;
    }

    @Override
    public Map<String, Object> distributorCommissionCalc(double sipAmt, double sipRate, double commissionRate, double time) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with sipAmt {}, sipRate {}, commissionRate {}, time {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                sipAmt,sipRate,commissionRate,time);
        Map<String,Object> distributorCommissionCalcMap = new HashMap<>();
        try{
            List<Map<String,Double>> valueList = new ArrayList<>();
            for(int i = 0;i < time;i++){
                Map<String,Double> info = new HashMap<>();
                info.put("aum",calculateFutureValue(sipRate / 12,(i + 1) * 12,sipAmt,0).get("futureValue"));
                info.put("commission",commissionRate * info.get("aum"));
                valueList.add(info);
            }
            double totalCommission = 0;
            distributorCommissionCalcMap.put("val",valueList);
            for(Map<String,Double> info : valueList){
                totalCommission += info.get("commission");
            }
            distributorCommissionCalcMap.put("totalCommission",totalCommission);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),distributorCommissionCalcMap);
        return distributorCommissionCalcMap;
    }

    @Override
    public Map<String, Double> diffBetweenInsuranceAndSIPCommission(double investAmt, double avgInsureCommission, double capApprRate, double trail, double time) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with investAmt {}, avgInsureCommission {}, capApprRate {}, trail {} and time {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                investAmt,avgInsureCommission,capApprRate,trail,time);
        Map<String,Double> diffInsuranceSIPCommissionMap = new HashMap<>();
        try{
            List<Map<String,Double>> valueList = new ArrayList<>();
            for(int i = 0;i < time;i++){
                Map<String,Double> info = new HashMap<>();
                info.put("insurance_paid_amount",avgInsureCommission * investAmt);
                if(i == 0){
                    info.put("cap_appreciation",capApprRate * investAmt);
                    info.put("cumulative_value",investAmt + info.get("cap_appreciation"));
                }else{
                    info.put("cap_appreciation", (investAmt + valueList.get(i - 1).get("cumulative_value")) * capApprRate);
                    info.put("cumulative_value",valueList.get(i - 1).get("cumulative_value") + investAmt + info.get("cap_appreciation"));
                }
                info.put("upfront_tail",trail  * info.get("cumulative_value"));
                valueList.add(info);
            }
            double totalInsuranceCommission = 0;
            double totalUpfrontTrail  = 0;
            for(int i = 0;i < valueList.size();i++){
                totalInsuranceCommission += valueList.get(i).get("insurance_paid_amount");
                totalUpfrontTrail += valueList.get(i).get("upfront_tail");
            }
            diffInsuranceSIPCommissionMap.put("totalInsureCommission",totalInsuranceCommission);
            diffInsuranceSIPCommissionMap.put("totalUpfrontTrail",totalUpfrontTrail);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),diffInsuranceSIPCommissionMap);
        return diffInsuranceSIPCommissionMap;
    }

    @Override
    public Map<String, Double> revenueModelSIPAndOneTimeBookSize(double sipBookSize, double investRate, double commissionRate, double equityAum, double time) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with sipBookSize {}, investRate {}, capApprRate {}, commissionRate {}, equityAum {} and time {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                sipBookSize,investRate,commissionRate,equityAum,time);
        Map<String,Double> revenueModelMap = new HashMap<>();
        try{
            double sipBookSizeFutureValue = 0;
            double sipBookSizeCommission = 0;
            double equityAUMFutureValue = 0;
            double equityAUMCommission = 0;
            double grossCommission = 0;
            for (int i = 0; i < time; i++) {
                sipBookSizeFutureValue = calculateFutureValue(
                        investRate / 12,
                        (i + 1) * 12,
                        sipBookSize,
                        0
                ).get("futureValue");
                sipBookSizeCommission = commissionRate * sipBookSizeFutureValue;
                equityAUMFutureValue = calculateFutureValue(investRate, i + 1, 0, equityAum).get("futureValue");
                equityAUMCommission = commissionRate * equityAUMFutureValue;
                grossCommission += sipBookSizeCommission + equityAUMCommission;
            }
            revenueModelMap.put("grossCommission",grossCommission);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),revenueModelMap);
        return revenueModelMap;
    }

    @Override
    public Map<String, Double> calculateEMIVersusSIP(double houseValue, double selfFunding, double loanRate, double loanPeriod, double housingInflation, double monthlyRent, double sipGrowthRate) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with houseValue {}, selfFunding {}, loanRate {}, loanPeriod {}, housingInflation {}, monthlyRent {} and sipGrowthRate {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                houseValue,selfFunding,loanRate,loanPeriod,housingInflation,monthlyRent, sipGrowthRate);
        Map<String,Double> emiVsSIPMap = new HashMap<>();
        try{
            double bankFunding = Math.round(houseValue - selfFunding);
            double emiAmt = Math.round(
                    calculateExcelPmtValue(
                            loanRate / 12,
                            loanPeriod * 12,
                            bankFunding,
                            0
                    ).get("excelPmt"));
            double totalLoanPayment = Math.round(12 * emiAmt * loanPeriod);
            double loanInterestPeriod = Math.round(totalLoanPayment - bankFunding);
            double emiPaymentBalance = Math.round(emiAmt - monthlyRent);
            double sipInvestFV = Math.round(
                    calculateFutureValue(sipGrowthRate / 12,loanPeriod * 12,emiPaymentBalance,0).get("futureValue")
            );
            double houseCostFV = Math.round(
                    calculateFutureValue(
                            housingInflation,
                            loanPeriod,
                            0,
                            houseValue
                    ).get("futureValue")
            );
            List<Double> downpaymentFVList = calculateSIPReturn(
                    sipGrowthRate,
                    selfFunding,
                    loanPeriod,
                    0,
                    0,
                    true,
                    false
            ).get("sipReturnList");
            double downpaymentFV = Math.round(
                    downpaymentFVList.get(downpaymentFVList.size() - 1)
            );
            double profitSIPInvest = Math.round(
                    (sipInvestFV + downpaymentFV) - houseCostFV
            );
            emiVsSIPMap.put("bankFunding",bankFunding);
            emiVsSIPMap.put("emiAmt",emiAmt);
            emiVsSIPMap.put("totalLoanPayment",totalLoanPayment);
            emiVsSIPMap.put("loanInterestPaid",loanInterestPeriod);
            emiVsSIPMap.put("emiPaymentBalance",emiPaymentBalance);
            emiVsSIPMap.put("sipInvestFV",sipInvestFV);
            emiVsSIPMap.put("houseCostFV",houseCostFV);
            emiVsSIPMap.put("profitSIPInvest",profitSIPInvest);
            emiVsSIPMap.put("downpaymentFV",downpaymentFV);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),emiVsSIPMap);
        return emiVsSIPMap;
    }

    @Override
    public Map<String, Double> humanLifeMethod(double currentIncome, double investGrowthRate, double incomeIncrementRate, double timePeriod) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentIncome {}, investGrowthRate {}, incomeIncrementRate {}, timePeriod {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                currentIncome,investGrowthRate,incomeIncrementRate,timePeriod);
        Map<String,Double> humanLifeMethodMap = new HashMap<>();
        try{
            double adjustRateReturn = ((1 + investGrowthRate) / (1 + incomeIncrementRate)) - 1;
            double reqdCorpus = calculatePresentValue(adjustRateReturn,timePeriod,currentIncome,0).get("presentValue");
            humanLifeMethodMap.put("reqdCorpus",reqdCorpus);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),humanLifeMethodMap);
        return humanLifeMethodMap;
    }

    @Override
    public Map<String, Double> needBasedApproach(double currentIncome, double investGrowthRate, double incomeIncrementRate, double timePeriod, double outstandingLoanAmt, double childEducationLiability, double incidentalMarriageLiability, double availableInsuranceDeduct, double investmentBalance) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentIncome {}, investGrowthRate {}, incomeIncrementRate {}, timePeriod {}, outstandingLoanAmt {}, childEducationLiability {}, incidentalMarriageLiability {}, availableInsuranceDeduct {}, investmentBalance {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                currentIncome,investGrowthRate,incomeIncrementRate,timePeriod);
        Map<String,Double> needApproachMap = new HashMap<>();
        try{
            Map<String,Double> humanLifeMethodMap = humanLifeMethod(
                    currentIncome,
                    investGrowthRate,
                    incomeIncrementRate,
                    timePeriod
            );
            Double additionalReqdCorpus = (humanLifeMethodMap.get("reqdCorpus") + outstandingLoanAmt + childEducationLiability + incidentalMarriageLiability ) - ( availableInsuranceDeduct + investmentBalance) ;
            needApproachMap.put("reqdCorpus",humanLifeMethodMap.get("reqdCorpus"));
            needApproachMap.put("additionalReqdCorpus",additionalReqdCorpus);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),needApproachMap);
        return needApproachMap;
    }

    @Override
    public Map<String, Object> limitedPeriodSIP(double sipAmt, double sipInvestPeriod, double totalInvestPeriod, double growthRate) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with sipAmt {}, sipInvestPeriod {}, totalInvestPeriod {}, and growthRate {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                sipAmt,sipInvestPeriod,totalInvestPeriod,growthRate);
        Map<String,Object> limitedPeriodSipMap = new HashMap<>();
        try{
            double months = sipInvestPeriod * 12;
            List<Double> returnArray = new ArrayList<>();
            double monthlyReturn = 0;
            double result = 0;
            for(int i = 0;i < months;i++){
                monthlyReturn = (sipAmt + monthlyReturn) * (1 + (growthRate / 12));
                if(i % 12 == 0){
                    returnArray.add((double) Math.round(monthlyReturn));
                }
            }
            result = monthlyReturn * Math.pow((1 + growthRate),(totalInvestPeriod - sipInvestPeriod));
            for(int i = 0;i < (totalInvestPeriod - sipInvestPeriod);i++){
                returnArray.add((double) Math.round(monthlyReturn * Math.pow((1 + growthRate),i)));
            }
            limitedPeriodSipMap.put("result",result);
            limitedPeriodSipMap.put("returnArr",returnArray);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),limitedPeriodSipMap);
        return limitedPeriodSipMap;
    }

    @Override
    public Map<String, Double> calculatePreRetirementSWPReturn(double currentAge, double retirementAge, double currentSIPInvestment, double currentLumpsumInvestment, double investmentPortfolioRate, double swpRate) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with currentAge {}, retirementAge {}, currentSIPInvestment {}, currentLumpsumInvestment {}, investmentPortfolioRate {} and swpRate {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                currentAge,retirementAge,currentSIPInvestment,currentLumpsumInvestment,investmentPortfolioRate,swpRate);
        Map<String,Double> preRetirementMap = new HashMap<>();
        try{
            List<Double> totalReturnList = calculateTotalReturnWithLumpSumAndSIP(
                    currentLumpsumInvestment,
                    currentSIPInvestment,
                    investmentPortfolioRate,
                    retirementAge - currentAge,
                    0
            ).get("totalReturnList");
            Double totalReturn = totalReturnList.get(totalReturnList.size() - 1);
            double swpReturn = (swpRate / 12) * totalReturn;
            preRetirementMap.put("totalReturn",totalReturn);
            preRetirementMap.put("swpReturn",swpReturn);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),preRetirementMap);
        return preRetirementMap;
    }

    @Override
    public Map<String, Double> calculatePostRetirementSWPReturn(double retirementCorpus, double investGrowthRate, double swpReturnRate, double corpusLeft) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with retirementCorpus {}, investGrowthRate {}, swpReturnRate {}, corpusLeft {}",Thread.currentThread().getStackTrace()[2].getMethodName(),
                retirementCorpus,investGrowthRate,swpReturnRate,corpusLeft);
        Map<String,Double> postRetirementMap = new HashMap<>();
        try{
            double swpAmt = (swpReturnRate / 12) * retirementCorpus;
            double maturityCorpusAmt = calculateFutureValue(
                    investGrowthRate - swpReturnRate,
                    corpusLeft,
                    0,
                    retirementCorpus
            ).get("futureValue");
            postRetirementMap.put("swpAmt",swpAmt);
            postRetirementMap.put("maturityCorpusAmt",maturityCorpusAmt);
        }catch (final Exception e){
            mfToolsServiceLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        mfToolsServiceLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),postRetirementMap);
        return postRetirementMap;
    }

    @Override
    public Map<String,Map<Integer,Map<String,Double>>> calculateModelFinancialPortfolio(double ppfAmt, double ppfRate, double pfAmt, double pfRate, double nscAmt, double nscRate, double postalAmt, double postalRate, double bankAmt, double bankRate, double companyAmt, double companyRate, double insuranceAmt, double insuranceRate, double equityAmt, double equityRate, double balancedAmt, double balancedRate, double nonLiquidDebtAmt, double nonLiquidDebtRate, double liquidDebtAmt, double liquidDebtRate, double sipAmt, double sipRate, double rdAmt, double rdRate) throws Exception {
        mfToolsServiceLogger.info("Entering {} method with input amounts and rates",
                Thread.currentThread().getStackTrace()[1].getMethodName());

        Map<Integer, Map<String, Double>> outputPortfolioResult = new HashMap<>();
        Map<String, Map<Integer, Map<String,Double>>> outputPortfolio = new HashMap<>();
        int[] yrCalcArr = {5, 10, 15, 20, 25, 30, 35};
        double swpRate = 0.08;

        try {
            for (int year : yrCalcArr) {
                Map<String, Double> yrPortfolioOutput = new HashMap<>();

                yrPortfolioOutput.put("ppf", calculateFutureValue(ppfRate, year, 0, ppfAmt).get("futureValue"));
                yrPortfolioOutput.put("pf", calculateFutureValue(pfRate, year, 0, pfAmt).get("futureValue"));
                yrPortfolioOutput.put("nsc", calculateFutureValue(nscRate, year, 0, nscAmt).get("futureValue"));
                yrPortfolioOutput.put("postal", calculateFutureValue(postalRate, year, 0, postalAmt).get("futureValue"));
                yrPortfolioOutput.put("bank", calculateFutureValue(bankRate, year, 0, bankAmt).get("futureValue"));
                yrPortfolioOutput.put("company", calculateFutureValue(companyRate, year, 0, companyAmt).get("futureValue"));
                yrPortfolioOutput.put("insurance", calculateFutureValue(insuranceRate, year, 0, insuranceAmt).get("futureValue"));
                yrPortfolioOutput.put("equity", calculateFutureValue(equityRate, year, 0, equityAmt).get("futureValue"));
                yrPortfolioOutput.put("balancedPortfolio", calculateFutureValue(balancedRate, year, 0, balancedAmt).get("futureValue"));
                yrPortfolioOutput.put("nonLiquidDebtPortfolio", calculateFutureValue(nonLiquidDebtRate, year, 0, nonLiquidDebtAmt).get("futureValue"));
                yrPortfolioOutput.put("liquidPortfolio", calculateFutureValue(liquidDebtRate, year, 0, liquidDebtAmt).get("futureValue"));
                yrPortfolioOutput.put("sip", calculateFutureValue(sipRate / 12, year * 12, sipAmt, 0).get("futureValue"));
                yrPortfolioOutput.put("rd", calculateFutureValue(rdRate / 12, year * 12, rdAmt, 0).get("futureValue"));

                double balance = yrPortfolioOutput.values().stream().mapToDouble(Double::doubleValue).sum();
                yrPortfolioOutput.put("balance", balance);
                yrPortfolioOutput.put("swpReturn", (swpRate * balance) / 12);

                outputPortfolioResult.put(year, yrPortfolioOutput);
                outputPortfolio.put("outputPortfolio",outputPortfolioResult);
            }
        } catch (Exception e) {
            mfToolsServiceLogger.error("Error occurred: {}", e.getMessage());
            e.printStackTrace();
            throw e;
        }

        mfToolsServiceLogger.info("Returning from method {} with output {}",
                Thread.currentThread().getStackTrace()[1].getMethodName(), outputPortfolio);
        return outputPortfolio;
    }

}
