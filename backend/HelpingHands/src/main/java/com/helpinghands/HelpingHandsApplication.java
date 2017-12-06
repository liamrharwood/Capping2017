package com.helpinghands;

import com.google.common.collect.Lists;
import com.helpinghands.auth.*;
import com.helpinghands.dao.*;
import com.helpinghands.resources.*;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthFilter;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.auth.chained.ChainedAuthFilter;
import io.dropwizard.db.DataSourceFactory;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.migrations.MigrationsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.skife.jdbi.v2.DBI;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import java.util.EnumSet;
import java.util.List;

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
        final CommentDAO commentDAO = jdbi.onDemand(CommentDAO.class);
        final ReportDAO reportDAO = jdbi.onDemand(ReportDAO.class);
        final CommunityDAO communityDAO = jdbi.onDemand(CommunityDAO.class);

        environment.jersey().register(MultiPartFeature.class);
        environment.jersey().register(new UserResource(userDAO));
        environment.jersey().register(new PostResource(postDAO, userDAO, commentDAO, reportDAO));
        environment.jersey().register(new CommunityResource(communityDAO, userDAO));
        environment.jersey().register(new ModeratorResource(userDAO, reportDAO, postDAO));
        environment.jersey().register(new SearchResource(communityDAO, postDAO, userDAO));
        environment.jersey().register(new AdminResource(userDAO, communityDAO));

        BasicCredentialAuthFilter basicCredentialAuthFilter = new BasicCredentialAuthFilter.Builder<UserPrincipal>()
                .setPrefix("Basic")
                .setAuthenticator(new HelpingHandsBasicAuthenticator(userDAO))
                .setAuthorizer(new HelpingHandsAuthorizer())
                .setRealm("SECRET")
                .buildAuthFilter();

        HelpingHandsAuthFilter helpingHandsAuthFilter = new HelpingHandsAuthFilter.Builder<UserPrincipal>()
                .setPrefix("HelpingHands")
                .setAuthenticator(new HelpingHandsTokenAuthenticator(userDAO))
                .setAuthorizer(new HelpingHandsAuthorizer())
                .setRealm("SECRET")
                .buildAuthFilter();

        List<AuthFilter> filters = Lists.newArrayList(basicCredentialAuthFilter, helpingHandsAuthFilter);
        environment.jersey().register(new AuthDynamicFeature(new ChainedAuthFilter(filters)));

        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(UserPrincipal.class));
    }
}
