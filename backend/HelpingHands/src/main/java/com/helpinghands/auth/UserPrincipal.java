package com.helpinghands.auth;

import java.security.Principal;

/**
 * Represents an authenticated user of the API.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class UserPrincipal implements Principal {
    private String username;
    private int id;

    public UserPrincipal(String username, int id) {
        this.username = username;
        this.id = id;
    }

    @Override
    public String getName() {
        return username;
    }

    public int getId() {
        return id;
    }
}
