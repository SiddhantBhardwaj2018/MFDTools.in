package com.siddhantbhardwaj.mfd_tools_backend.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.siddhantbhardwaj.mfd_tools_backend.dto.LoginRequest;
import com.siddhantbhardwaj.mfd_tools_backend.dto.RegisterRequest;
import com.siddhantbhardwaj.mfd_tools_backend.models.ERole;
import com.siddhantbhardwaj.mfd_tools_backend.models.Role;
import com.siddhantbhardwaj.mfd_tools_backend.models.User;
import com.siddhantbhardwaj.mfd_tools_backend.repository.RoleRepository;
import com.siddhantbhardwaj.mfd_tools_backend.repository.UserRepository;
import com.siddhantbhardwaj.mfd_tools_backend.security.JwtService;
import com.siddhantbhardwaj.mfd_tools_backend.security.UserInfoDetails;
import com.siddhantbhardwaj.mfd_tools_backend.security.UserInfoDetailsService;
import com.siddhantbhardwaj.mfd_tools_backend.service.blueprintservices.AuthService;
import com.siddhantbhardwaj.mfd_tools_backend.utils.events.MFDToolsEventListener;
import com.siddhantbhardwaj.mfd_tools_backend.utils.events.MFDToolsEventPublisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private static final Logger authServiceImplLogger = LoggerFactory.getLogger(AuthServiceImpl.class);

    private static final String registrationDelimiter = "MFD8TOOLS9IN10";
    private static final int timeOut = (60 * 60 * 1000);

    @Value("${aes.classEncryptor}")
    private String secretKey;

    @Value("${host.emailLink}")
    private String emailLinkHost;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserInfoDetailsService userInfoDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MFDToolsEventPublisher mfdToolsEventPublisher;

    @Autowired
    private MFDToolsEventListener mfdToolsEventListener;


    @Override
    public Map<String, Object> registerUser(RegisterRequest registerRequest) throws Exception {
        authServiceImplLogger.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),registerRequest);
        User user = null;
        Map<String, Object> registerUserMap = new HashMap<>();
        try{
            Optional<Role> optionalRole = roleRepository.findByName(ERole.ROLE_BASIC_USER);
            if(optionalRole.isPresent()){
                user = new User();
                user.setEmail(registerRequest.getEmail());
                user.setRole(optionalRole.get());
                user.setPassword(registerRequest.getPassword());
                userInfoDetailsService.addUser(user);
                registerUserMap.put("status","success");
            }else{
                throw new Exception("Role was not found !");
            }
        }catch (final Exception e){
            authServiceImplLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        if(registerUserMap.isEmpty()){
            registerUserMap.put("status","failure");
        }
        authServiceImplLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),user);
        return registerUserMap;
    }

    @Override
    public Map<String, String> login(LoginRequest loginRequest) throws Exception {
        authServiceImplLogger.info("Entering {} method with input {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginRequest);
        Map<String,String> loginUserMap = new HashMap<>();
        try{
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),loginRequest.getPassword()));
            if(authentication.isAuthenticated()){
                UserInfoDetails userInfoDetails = (UserInfoDetails) authentication.getPrincipal();
                if(userInfoDetails.getAuthorities().iterator().next().getAuthority().equals(ERole.ROLE_ADMIN.name())){
                    User user = userRepository.findByEmail(userInfoDetails.getUsername()).get();
                    Optional<User> adminOptional = userRepository.findByUserId(user.getUserId());
                    if(adminOptional.isPresent()){
                        loginUserMap.put("token",jwtService.generateToken(loginRequest.getEmail()));
                        loginUserMap.put("role",userInfoDetails.getAuthorities().iterator().next().getAuthority());
                    }else{
                        loginUserMap.put("status","Error");
                    }
                }else{
                    loginUserMap.put("token",jwtService.generateToken(loginRequest.getEmail()));
                    loginUserMap.put("role",userInfoDetails.getAuthorities().iterator().next().getAuthority());
                }
            }else{
                loginUserMap.put("status","Error");
            }
        }catch (final Exception e){
            authServiceImplLogger.error("Error occurred: {}",e);
            e.printStackTrace();
            throw e;
        }
        authServiceImplLogger.info("Returning from method {} with output {}",Thread.currentThread().getStackTrace()[2].getMethodName(),loginUserMap);
        return loginUserMap;
    }


    @Override
    public Map<String, String> forgotPassword(String email) throws Exception {
        return Map.of();
    }

    @Override
    public Map<String, String> resetPassword(String uid, String password) throws Exception {
        return Map.of();
    }

    @Override
    public Map<String, String> checkUserLoggedIn() throws Exception {
        return Map.of();
    }
}
