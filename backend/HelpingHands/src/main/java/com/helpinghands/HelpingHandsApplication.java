package com.helpinghands;

import com.helpinghands.auth.HelpingHandsAuthenticator;
import com.helpinghands.auth.HelpingHandsAuthorizer;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.dao.PostDAO;
import com.helpinghands.dao.UserDAO;
import com.helpinghands.resources.PostResource;
import com.helpinghands.resources.UserResource;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.skife.jdbi.v2.DBI;

import java.security.Principal;

public class HelpingHandsApplication extends Application<HelpingHandsConfiguration> {
    public static void main(String[] args) throws Exception {
        new HelpingHandsApplication().run(args);
    }

    @Override
    public void initialize(Bootstrap<HelpingHandsConfiguration> bootstrap) {
        bootstrap.addBundle(new MigrationsBundle<HelpingHandsConfiguration>() {
            @Override
            public DataSourceFactory getDataSourceFactory(HelpingHandsConfiguration configuration) {
                return configuration.getDataSourceFactory();
            }
        });
    }

    @Override
    public void run(HelpingHandsConfiguration configuration, Environment environment) {
        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, configuration.getDataSourceFactory(), "postgresql");
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);
        final PostDAO postDAO = jdbi.onDemand(PostDAO.class);

        environment.jersey().register(new UserResource(userDAO));
        environment.jersey().register(new PostResource(postDAO));
        environment.jersey().register(new AuthDynamicFeature(
                new BasicCredentialAuthFilter.Builder<UserPrincipal>()
                    .setAuthenticator(new HelpingHandsAuthenticator(userDAO))
                    .setAuthorizer(new HelpingHandsAuthorizer())
                    .setRealm("SECRET")
                    .buildAuthFilter()
        ));
        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(UserPrincipal.class));
    }
}
