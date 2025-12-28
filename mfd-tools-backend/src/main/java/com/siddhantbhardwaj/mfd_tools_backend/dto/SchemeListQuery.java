package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class SchemeListQuery {

    private String fundHouse;

    private String schemeType;

    public SchemeListQuery() {
    }

    public SchemeListQuery(String fundHouse, String schemeType) {
        this.fundHouse = fundHouse;
        this.schemeType = schemeType;
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

    @Override
    public String toString() {
        return "SchemeListQuery{" +
                "fundHouse='" + fundHouse + '\'' +
                ", schemeType='" + schemeType + '\'' +
                '}';
    }
}
