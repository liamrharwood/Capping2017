package com.helpinghands.auth;

import java.security.Principal;

public class UserPrincipal implements Principal {
    private String username;

    public UserPrincipal(String username) {
        this.username = username;
    }

    @Override
    public String getName() {
        return username;
    }
}
