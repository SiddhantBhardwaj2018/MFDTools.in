package com.siddhantbhardwaj.mfd_tools_backend.service.blueprintservices;

import com.siddhantbhardwaj.mfd_tools_backend.dto.LoginRequest;
import com.siddhantbhardwaj.mfd_tools_backend.dto.RegisterRequest;

import java.util.Map;

public interface AuthService {

    public Map<String,Object> registerUser(RegisterRequest registerRequest) throws Exception;

    public Map<String,String> login(LoginRequest loginRequest) throws Exception;

    public Map<String,String> forgotPassword(String email) throws Exception;

    public Map<String,String> resetPassword(String uid,String password) throws Exception;

    public Map<String,String> checkUserLoggedIn() throws Exception;

}
