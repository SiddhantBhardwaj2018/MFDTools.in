package com.siddhantbhardwaj.mfd_tools_backend.controllers;

import com.siddhantbhardwaj.mfd_tools_backend.dto.ForgotPasswordRequest;
import com.siddhantbhardwaj.mfd_tools_backend.dto.LoginRequest;
import com.siddhantbhardwaj.mfd_tools_backend.dto.RegisterRequest;
import com.siddhantbhardwaj.mfd_tools_backend.service.blueprintservices.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger authControllerLogger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Map<String,Object> registerUser(@RequestBody RegisterRequest registerRequest) throws Exception{
        authControllerLogger.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),registerRequest);
        Map<String,Object> registerRequestMap = new HashMap<>();
        try{
            registerRequestMap = authService.registerUser(registerRequest);
        }catch (final Exception e){
            authControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        return registerRequestMap;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@RequestBody LoginRequest loginRequest) throws Exception{
        authControllerLogger.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginRequest);
        Map<String,String> loginUserMap = new HashMap<>();
        try{
            loginUserMap  = authService.login(loginRequest);
        }catch (final Exception e){
            authControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }finally {
            if(loginUserMap.isEmpty()){
                loginUserMap.put("error","failed");
                authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginUserMap);
                return ResponseEntity.internalServerError().body(loginUserMap);
            }
            authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginUserMap);
            return ResponseEntity.ok(loginUserMap);
        }
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<Map<String,String>> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws Exception{
        authControllerLogger.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),forgotPasswordRequest);
        Map<String,String> loginUserMap = new HashMap<>();
        try{
            loginUserMap  = authService.forgotPassword(forgotPasswordRequest.getEmail());
        }catch (final Exception e){
            authControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }finally {
            if(loginUserMap.isEmpty()){
                loginUserMap.put("error","failed");
                authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginUserMap);
                return ResponseEntity.internalServerError().body(loginUserMap);
            }
            authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginUserMap);
            return ResponseEntity.ok(loginUserMap);
        }
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<Map<String,String>> resetPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws Exception{
        authControllerLogger.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),forgotPasswordRequest);
        Map<String,String> resetPasswordMap = new HashMap<>();
        try{
            resetPasswordMap  = authService.resetPassword(forgotPasswordRequest.getUid(),forgotPasswordRequest.getPassword());
        }catch (final Exception e){
            authControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }finally {
            if(resetPasswordMap.isEmpty()){
                resetPasswordMap.put("error","failed");
                authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),resetPasswordMap);
                return ResponseEntity.internalServerError().body(resetPasswordMap);
            }
            authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),resetPasswordMap);
            return ResponseEntity.ok(resetPasswordMap);
        }
    }


    @PostMapping("/checkUserLoggedIn")
    public Map<String,String> checkUserLoggedIn() throws Exception{
        authControllerLogger.info("Entering {} method",Thread.currentThread().getStackTrace()[2].getMethodName());
        Map<String,String> loggedInStatusMap = new HashMap<>();
        try{
            loggedInStatusMap = authService.checkUserLoggedIn();
        }catch (final Exception e){
            authControllerLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        authControllerLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loggedInStatusMap);
        return loggedInStatusMap;
    }


}
