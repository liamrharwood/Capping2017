package com.helpinghands.auth;

import io.dropwizard.auth.Authorizer;

import java.security.Principal;

public class HelpingHandsAuthorizer implements Authorizer<UserPrincipal> {
    @Override
    public boolean authorize(UserPrincipal principal, String role) {
        return principal.getName().equals("good") && role.equals("good");
    }
}
