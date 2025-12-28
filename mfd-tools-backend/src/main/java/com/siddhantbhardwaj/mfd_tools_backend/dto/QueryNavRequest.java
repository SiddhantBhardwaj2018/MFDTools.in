package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class QueryNavRequest {

    private String schemeCode;

    private String date;

    public QueryNavRequest() {
    }

    public QueryNavRequest(String schemeCode, String date) {
        this.schemeCode = schemeCode;
        this.date = date;
    }

    public String getSchemeCode() {
        return schemeCode;
    }

    public void setSchemeCode(String schemeCode) {
        this.schemeCode = schemeCode;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "QueryNavRequest{" +
                "schemeCode='" + schemeCode + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}

