package com.CodeSparrow.AuthService.service.interfaces;

import org.springframework.stereotype.Service;

import com.CodeSparrow.AuthService.model.DTO.RegisterDTO;
import com.CodeSparrow.AuthService.model.DTO.ResponseDTO;

@Service
public interface IUserService {
    public ResponseDTO Register(RegisterDTO register);
    public String login(RegisterDTO register);
}
