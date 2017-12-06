package com.helpinghands.resources;

import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.report.Report;
import com.helpinghands.core.user.UserProfile;
import com.helpinghands.dao.PostDAO;
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
    private PostDAO postDAO;

    public ModeratorResource(UserDAO userDAO,
                             ReportDAO reportDAO,
                             PostDAO postDAO) {
        this.userDAO = userDAO;
        this.reportDAO = reportDAO;
        this.postDAO = postDAO;
    }

    @GET
    @Path("reports")
    public List<Report> getReportsForCommunity (@Auth UserPrincipal userPrincipal,
                                                @QueryParam("community_id") int communityId) {
        if (!userDAO.isModeratorForCommunity(userPrincipal.getId(), communityId)) {
            throw new WebApplicationException("You are not a moderator for this community.", 401);
        }

        return reportDAO.getReportsForCommunity(communityId);
    }

    @DELETE
    @Path("posts")
    public void deletePost(@Auth UserPrincipal userPrincipal,
                           @QueryParam("post_id") int postId,
                           @QueryParam("community_id") int communityId) {
        if (!userDAO.isModeratorForCommunity(userPrincipal.getId(), communityId)) {
            throw new WebApplicationException("You are not a moderator for this community.", 401);
        }

        postDAO.deletePostFromCommunity(postId, communityId);
    }

    @GET
    @Path("users")
    public List<UserProfile> getUsersForCommunity(@Auth UserPrincipal userPrincipal,
                                                  @QueryParam("community_id") int communityId) {
        if (!userDAO.isModeratorForCommunity(userPrincipal.getId(), communityId)) {
            throw new WebApplicationException("You are not a moderator for this community.", 401);
        }

        return userDAO.getUsersForCommunity(communityId);
    }
}
