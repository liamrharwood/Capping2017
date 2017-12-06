package com.helpinghands.auth;

import com.helpinghands.core.user.User;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;

import java.util.Optional;

/**
 * Checks Basic Auth credentials against the database to make sure they are valid.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class HelpingHandsBasicAuthenticator implements Authenticator<BasicCredentials, UserPrincipal> {
    private UserDAO userDAO;

    public HelpingHandsBasicAuthenticator(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public Optional<UserPrincipal> authenticate(BasicCredentials credentials) throws AuthenticationException {
        Optional<String> password = Optional.ofNullable(userDAO.getPasswordForUsername(credentials.getUsername()));

        if (password.isPresent()) {
            User user = userDAO.getUserByUsername(credentials.getUsername());
            PasswordEncryption passwordEncryption = new PasswordEncryption();
            boolean isValid = passwordEncryption.authenticate(credentials.getPassword().toCharArray(), password.get());
            if (isValid) {
                UserPrincipal userPrincipal = new UserPrincipal(credentials.getUsername(), user.getId());
                return Optional.of(userPrincipal);
            }
        }

        return Optional.empty();
    }
}
