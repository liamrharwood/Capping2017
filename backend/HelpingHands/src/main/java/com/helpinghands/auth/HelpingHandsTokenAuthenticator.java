package com.helpinghands.auth;

import com.helpinghands.core.user.User;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * Checks Token credentials against the database to make sure they are valid.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class HelpingHandsTokenAuthenticator implements Authenticator<TokenCredentials, UserPrincipal> {
    private UserDAO userDAO;

    public HelpingHandsTokenAuthenticator(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public Optional<UserPrincipal> authenticate(TokenCredentials credentials) throws AuthenticationException {
        Optional<String> accessToken = Optional.ofNullable(userDAO.getAccessTokenForUsername(credentials.getUsername()));

        if (accessToken.isPresent() && accessToken.get().equals(credentials.getToken())) {
            // Tokens expire after 15 minutes
            Timestamp fifteenMinutesAgo = new Timestamp(System.currentTimeMillis() - TimeUnit.MINUTES.toMillis(15));
            if (userDAO.getAccessTokenTimestampForUsername(credentials.getUsername()).before(fifteenMinutesAgo)) {
                return Optional.empty();
            }
            User user = userDAO.getUserByUsername(credentials.getUsername());

            // Extend the expiration date with each successful authentication
            UserPrincipal userPrincipal = new UserPrincipal(credentials.getUsername(), user.getId());
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            userDAO.updateAccessTokenForUser(userPrincipal.getId(), accessToken.get(), timestamp);
            return Optional.of(userPrincipal);
        }

        return Optional.empty();
    }
}
