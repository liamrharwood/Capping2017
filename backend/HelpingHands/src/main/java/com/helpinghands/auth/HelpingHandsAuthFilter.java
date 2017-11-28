package com.helpinghands.auth;

import com.google.common.io.BaseEncoding;
import io.dropwizard.auth.AuthFilter;

import javax.annotation.Nullable;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Principal;

public class HelpingHandsAuthFilter<P extends Principal> extends AuthFilter<TokenCredentials, P> {
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        TokenCredentials credentials = this.getCredentials(requestContext.getHeaders().getFirst("Authorization"));
        if (!this.authenticate(requestContext, credentials, "HELPINGHANDS")) {
            throw new WebApplicationException(this.unauthorizedHandler.buildResponse(this.prefix, this.realm));
        }
    }

    @Nullable
    private TokenCredentials getCredentials(String header) {
        if (header == null) {
            return null;
        } else {
            int space = header.indexOf(32);
            if (space <= 0) {
                return null;
            } else {
                String method = header.substring(0, space);
                if (!this.prefix.equalsIgnoreCase(method)) {
                    return null;
                } else {
                    String decoded;
                    try {
                        decoded = new String(BaseEncoding.base64().decode(header.substring(space + 1)), StandardCharsets.UTF_8);
                    } catch (IllegalArgumentException var8) {
                        this.logger.warn("Error decoding credentials", var8);
                        return null;
                    }

                    int i = decoded.indexOf(58);
                    if (i <= 0) {
                        return null;
                    } else {
                        String token = decoded.substring(i + 1);
                        String username = decoded.substring(0, i);
                        return new TokenCredentials(token, username);
                    }
                }
            }
        }
    }

    public static class Builder<P extends Principal> extends AuthFilterBuilder<TokenCredentials, P, HelpingHandsAuthFilter<P>> {
        public Builder() {
        }

        protected HelpingHandsAuthFilter<P> newInstance() {
            return new HelpingHandsAuthFilter();
        }
    }
}
