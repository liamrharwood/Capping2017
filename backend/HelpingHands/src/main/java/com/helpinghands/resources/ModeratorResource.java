package com.helpinghands.resources;

import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.report.Report;
import com.helpinghands.dao.ReportDAO;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("moderators")
@Produces(MediaType.APPLICATION_JSON)
public class ModeratorResource {
    private UserDAO userDAO;
    private ReportDAO reportDAO;

    public ModeratorResource(UserDAO userDAO,
                             ReportDAO reportDAO) {
        this.userDAO = userDAO;
        this.reportDAO = reportDAO;
    }

    @GET
    @Path("reports")
    public List<Report> getReportsForCommunity (@Auth UserPrincipal userPrincipal,
                                                @QueryParam("community_id") int communityId) throws AuthenticationException {
        if (!userDAO.isModeratorForCommunity(userPrincipal.getId(), communityId)) {
            throw new WebApplicationException(401);
        }

        return reportDAO.getReportsForCommunity(communityId);
    }
}
