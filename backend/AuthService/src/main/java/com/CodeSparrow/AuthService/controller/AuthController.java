package com.CodeSparrow.AuthService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CodeSparrow.AuthService.model.DTO.RegisterDTO;
import com.CodeSparrow.AuthService.model.DTO.RequestDTO;
import com.CodeSparrow.AuthService.model.DTO.ResponseDTO;
import com.CodeSparrow.AuthService.service.interfaces.IUserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IUserService service;
    public AuthController(IUserService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestDTO req){
        return ResponseEntity.ok("login");
    }
    @PostMapping("/register")
    public ResponseDTO register(@RequestBody RegisterDTO dto){
        return service.Register(dto);
    }
}
