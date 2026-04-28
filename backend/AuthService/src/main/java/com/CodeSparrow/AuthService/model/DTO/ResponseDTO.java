package com.CodeSparrow.AuthService.model.DTO;

public class ResponseDTO {
    private String message;
    private String email;
    private String accessToken;
    private String refreshToken;

    public String getEmail() {
        return email;
    }public void setEmail(String email) {
        this.email = email;
    }
    public String getmessage() {
        return message;
    }
    public void setId(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public void setAccessToken(String accessToken) {
        // TODO Auto-generated method stub
        this.accessToken = accessToken;
    }
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    public String getAccessToken() {
        return accessToken;
    }
    public String getRefreshToken() {
        return refreshToken;
    }
}
