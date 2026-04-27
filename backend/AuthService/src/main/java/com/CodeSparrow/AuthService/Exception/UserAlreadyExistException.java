package com.CodeSparrow.AuthService.Exception;

public class UserAlreadyExistException extends RuntimeException{

    public UserAlreadyExistException(String message){
        super(message);
    }
    
}
