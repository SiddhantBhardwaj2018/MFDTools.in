package com.siddhantbhardwaj.mfd_tools_backend.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Map<String,Object>> handleExpiredJwtException(ExpiredJwtException e){
        Map<String,Object> unauthorizedMap = new HashMap<>();
        unauthorizedMap.put("status", HttpStatus.UNAUTHORIZED.value());
        unauthorizedMap.put("error", "Unauthorized");
        unauthorizedMap.put("message", "JWT token has expired.");
        unauthorizedMap.put("timestamp", System.currentTimeMillis());
        return new ResponseEntity<>(unauthorizedMap,HttpStatus.UNAUTHORIZED);
    }

}
