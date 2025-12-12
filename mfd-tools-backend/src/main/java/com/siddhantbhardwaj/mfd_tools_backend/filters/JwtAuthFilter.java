package com.siddhantbhardwaj.mfd_tools_backend.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.siddhantbhardwaj.mfd_tools_backend.security.JwtService;
import com.siddhantbhardwaj.mfd_tools_backend.security.UserInfoDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoDetailsService userInfoDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtService.extractUsername(token);
            } catch (ExpiredJwtException e) {
                handleExpiredJwtException(response, e);
                return;
            } catch (Exception e) {
                handleInvalidJwtException(response, e);
                return;
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userInfoDetails = userInfoDetailsService.loadUserByUsername(username);
            if (jwtService.validateToken(token, userInfoDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userInfoDetails, null, userInfoDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private void handleExpiredJwtException(HttpServletResponse response, ExpiredJwtException e) throws IOException {
        Map<String, Object> unauthorizedMap = new HashMap<>();
        unauthorizedMap.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        unauthorizedMap.put("error", "Unauthorized");
        unauthorizedMap.put("message", "JWT token has expired.");
        unauthorizedMap.put("timestamp", System.currentTimeMillis());
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(new ObjectMapper().writeValueAsString(unauthorizedMap));
    }

    private void handleInvalidJwtException(HttpServletResponse response, Exception e) throws IOException {
        Map<String, Object> unauthorizedMap = new HashMap<>();
        unauthorizedMap.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        unauthorizedMap.put("error", "Unauthorized");
        unauthorizedMap.put("message", "Invalid JWT token.");
        unauthorizedMap.put("timestamp", System.currentTimeMillis());
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(unauthorizedMap));
    }

}
