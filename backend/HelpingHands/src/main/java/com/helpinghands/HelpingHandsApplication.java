package com.helpinghands;

import com.helpinghands.auth.HelpingHandsAuthenticator;
import com.helpinghands.auth.HelpingHandsAuthorizer;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.dao.CommunityDAO;
import com.helpinghands.dao.PostDAO;
import com.helpinghands.dao.UserDAO;
import com.helpinghands.resources.CommunityResource;
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
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.skife.jdbi.v2.DBI;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.security.Principal;
import java.util.EnumSet;

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
        // Enable CORS headers
        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "*");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");


        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, configuration.getDataSourceFactory(), "postgresql");
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);
        final PostDAO postDAO = jdbi.onDemand(PostDAO.class);
        final CommunityDAO communityDAO = jdbi.onDemand(CommunityDAO.class);

        environment.jersey().register(new UserResource(userDAO));
        environment.jersey().register(new PostResource(postDAO, userDAO));
        environment.jersey().register(new CommunityResource(communityDAO, userDAO));
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
