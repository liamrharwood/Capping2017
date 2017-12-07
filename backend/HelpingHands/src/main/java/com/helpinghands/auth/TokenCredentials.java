package com.helpinghands.auth;

/**
 * Used for Token authentication, holds the access token and the username of the user being authenticated
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
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
