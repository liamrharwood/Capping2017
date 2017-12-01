package com.helpinghands.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class LoginObject {
    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private String token;

    @NotNull
    @JsonProperty
    private int id;

    public LoginObject() {
        // Jackson deserialization
    }

    public LoginObject(String username, String token, int id) {
        this.username = username;
        this.token = token;
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    public int getId() {
        return id;
    }
}
