package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class PointReturnCalc {

    private String schemeCode;

    private String previousDate;

    private String nextDate;

    public PointReturnCalc() {
    }

    public PointReturnCalc(String schemeCode, String previousDate, String nextDate) {
        this.schemeCode = schemeCode;
        this.previousDate = previousDate;
        this.nextDate = nextDate;
    }

    public String getSchemeCode() {
        return schemeCode;
    }

    public void setSchemeCode(String schemeCode) {
        this.schemeCode = schemeCode;
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
        return "PointReturnCalc{" +
                "schemeCode='" + schemeCode + '\'' +
                ", previousDate='" + previousDate + '\'' +
                ", nextDate='" + nextDate + '\'' +
                '}';
    }
}

