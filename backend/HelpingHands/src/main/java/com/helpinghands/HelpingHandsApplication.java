package com.helpinghands;

import com.helpinghands.dao.UserDAO;
import com.helpinghands.resources.UserResource;
import io.dropwizard.Application;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Environment;
import org.skife.jdbi.v2.DBI;

public class HelpingHandsApplication extends Application<HelpingHandsConfiguration> {
    public static void main(String[] args) throws Exception {
        new HelpingHandsApplication().run(args);
    }

    @Override
    public void run(HelpingHandsConfiguration configuration, Environment environment) {
        final DBIFactory factory = new DBIFactory();
        final DBI jdbi = factory.build(environment, configuration.getDataSourceFactory(), "postgresql");
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);

        environment.jersey().register(new UserResource(userDAO));
    }
}
