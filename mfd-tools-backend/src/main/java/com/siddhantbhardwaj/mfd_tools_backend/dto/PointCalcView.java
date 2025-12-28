package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class PointCalcView {

    private String fundHouse;

    private String schemeType;

    private String previousDate;

    private String nextDate;

    public PointCalcView() {
    }

    public PointCalcView(String fundHouse, String schemeType, String previousDate, String nextDate) {
        this.fundHouse = fundHouse;
        this.schemeType = schemeType;
        this.previousDate = previousDate;
        this.nextDate = nextDate;
    }

    public String getFundHouse() {
        return fundHouse;
    }

    public void setFundHouse(String fundHouse) {
        this.fundHouse = fundHouse;
    }

    public String getSchemeType() {
        return schemeType;
    }

    public void setSchemeType(String schemeType) {
        this.schemeType = schemeType;
    }

    public String getPreviousDate() {
        return previousDate;
    }

    public void setPreviousDate(String previousDate) {
        this.previousDate = previousDate;
    }

    public String getNextDate() {
        return nextDate;
    }

    public void setNextDate(String nextDate) {
        this.nextDate = nextDate;
    }

    @Override
    public String toString() {
        return "PointCalcView{" +
                "fundHouse='" + fundHouse + '\'' +
                ", schemeType='" + schemeType + '\'' +
                ", previousDate='" + previousDate + '\'' +
                ", nextDate='" + nextDate + '\'' +
                '}';
    }
}
