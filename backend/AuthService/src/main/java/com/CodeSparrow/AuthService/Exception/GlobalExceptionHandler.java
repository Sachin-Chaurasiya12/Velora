package com.CodeSparrow.AuthService.Exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<?> handleCommonException(UserAlreadyExistException ex){

        Map<String, Object> error = new HashMap<>();
        error.put("message", ex.getMessage());
        error.put("status", 409);

        return new ResponseEntity<>(error,HttpStatus.CONFLICT);
    }
}
