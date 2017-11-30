package com.helpinghands.auth;

import com.helpinghands.core.user.User;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

public class HelpingHandsTokenAuthenticator implements Authenticator<TokenCredentials, UserPrincipal> {
    private UserDAO userDAO;

    public HelpingHandsTokenAuthenticator(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public Optional<UserPrincipal> authenticate(TokenCredentials credentials) throws AuthenticationException {
        Optional<String> accessToken = Optional.ofNullable(userDAO.getAccessTokenForUsername(credentials.getUsername()));

        if (accessToken.isPresent() && accessToken.get().equals(credentials.getToken())) {
            Timestamp fifteenMinutesAgo = new Timestamp(System.currentTimeMillis() - TimeUnit.MINUTES.toMillis(15));
            if (userDAO.getAccessTokenTimestampForUsername(credentials.getUsername()).before(fifteenMinutesAgo)) {
                return Optional.empty();
            }
            User user = userDAO.getUserByUsername(credentials.getUsername());
            UserPrincipal userPrincipal = new UserPrincipal(credentials.getUsername(), user.getId());
            return Optional.of(userPrincipal);
        }

        return Optional.empty();
    }
}
