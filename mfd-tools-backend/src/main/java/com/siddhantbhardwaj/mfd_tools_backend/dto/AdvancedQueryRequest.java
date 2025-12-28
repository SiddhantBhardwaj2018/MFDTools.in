package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class AdvancedQueryRequest {

    private String schemeType;

    private String fundHouse;

    private String indicator;

    private Integer offset;

    public AdvancedQueryRequest() {
    }

    public AdvancedQueryRequest(String schemeType, String fundHouse, String indicator, Integer offset) {
        this.schemeType = schemeType;
        this.fundHouse = fundHouse;
        this.indicator = indicator;
        this.offset = offset;
    }

    public String getSchemeType() {
        return schemeType;
    }

    public void setSchemeType(String schemeType) {
        this.schemeType = schemeType;
    }

    public String getFundHouse() {
        return fundHouse;
    }

    public void setFundHouse(String fundHouse) {
        this.fundHouse = fundHouse;
    }

    public String getIndicator() {
        return indicator;
    }

    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    @Override
    public String toString() {
        return "AdvancedQueryRequest{" +
                "schemeType='" + schemeType + '\'' +
                ", fundHouse='" + fundHouse + '\'' +
                ", indicator='" + indicator + '\'' +
                ", offset=" + offset +
                '}';
    }
}

