package com.helpinghands.auth;

public class TokenCredentials {
    private String token;
    private String username;

    public TokenCredentials(String token, String username) {
        this.token = token;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }
}
