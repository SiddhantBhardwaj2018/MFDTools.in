package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class ReturnViewParam {

    private String fundHouse;

    private String schemeType;

    private String timePeriod;

    private Integer offset;

    public ReturnViewParam() {
    }

    public ReturnViewParam(String fundHouse, String schemeType, String timePeriod, Integer offset) {
        this.fundHouse = fundHouse;
        this.schemeType = schemeType;
        this.timePeriod = timePeriod;
        this.offset = offset;
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

    public String getTimePeriod() {
        return timePeriod;
    }

    public void setTimePeriod(String timePeriod) {
        this.timePeriod = timePeriod;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    @Override
    public String toString() {
        return "ReturnViewParam{" +
                "fundHouse='" + fundHouse + '\'' +
                ", schemeType='" + schemeType + '\'' +
                ", timePeriod='" + timePeriod + '\'' +
                ", offset=" + offset +
                '}';
    }
}
