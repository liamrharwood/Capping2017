package com.helpinghands.auth;

import com.helpinghands.core.user.User;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;

import java.security.Principal;
import java.util.Optional;

public class HelpingHandsAuthenticator implements Authenticator<BasicCredentials, Principal> {
    private UserDAO userDAO;

    public HelpingHandsAuthenticator(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public Optional<Principal> authenticate(BasicCredentials credentials) throws AuthenticationException {
        Optional<String> password = Optional.ofNullable(userDAO.getPasswordForUsername(credentials.getUsername()));

        if (password.isPresent()) {
            PasswordEncryption passwordEncryption = new PasswordEncryption();
            boolean isValid = passwordEncryption.authenticate(credentials.getPassword().toCharArray(), password.get());
            if (isValid) {
                return Optional.of(new Principal() {
                    @Override
                    public String getName() {
                        return null;
                    }
                });
            }
        }

        return Optional.empty();
    }
}
