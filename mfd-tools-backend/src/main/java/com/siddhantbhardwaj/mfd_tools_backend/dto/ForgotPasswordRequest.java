package com.siddhantbhardwaj.mfd_tools_backend.dto;

public class ForgotPasswordRequest {

    private String uid;

    private String password;

    private String email;

    public ForgotPasswordRequest() {
    }

    public ForgotPasswordRequest(String uid, String password, String email) {
        this.uid = uid;
        this.password = password;
        this.email = email;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "ForgotPasswordRequest{" +
                "uid='" + uid + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
