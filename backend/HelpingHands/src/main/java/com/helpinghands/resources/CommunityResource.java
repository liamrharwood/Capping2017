package com.helpinghands.resources;

import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.community.Community;
import com.helpinghands.core.community.CommunityProfile;
import com.helpinghands.core.report.Report;
import com.helpinghands.core.user.User;
import com.helpinghands.dao.CommunityDAO;
import com.helpinghands.dao.ReportDAO;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Optional;

@Path("/communities")
@Produces(MediaType.APPLICATION_JSON)
public class CommunityResource {
    private CommunityDAO communityDAO;
    private UserDAO userDAO;

    public CommunityResource(CommunityDAO communityDAO,
                             UserDAO userDAO) {
        this.communityDAO = communityDAO;
        this.userDAO = userDAO;
    }

    @GET
    public List<Community> getCommunities(@Auth UserPrincipal userPrincipal) {
        int userId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        return communityDAO.getFollowedCommunities(userId);
    }

    @GET
    @Path("profile")
    public CommunityProfile getCommunityProfile(@Auth Optional<UserPrincipal> userPrincipal,
                                                @QueryParam("id") int communityId) {
        if (userPrincipal.isPresent()) {
            int authId = userDAO.getUserByUsername(userPrincipal.get().getName()).getId();
            return communityDAO.getCommunityProfileWithAuth(authId, communityId);
        }
        return communityDAO.getCommunityProfile(communityId);
    }

    @PUT
    @Path("follow")
    public void followCommunity(@Auth UserPrincipal userPrincipal,
                                @QueryParam("community_id") int communityId) {
        int userId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        communityDAO.followCommunity(userId, communityId);
    }

    @PUT
    @Path("unfollow")
    public void unfollowCommunity(@Auth UserPrincipal userPrincipal,
                                @QueryParam("community_id") int communityId) {
        int userId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        communityDAO.unfollowCommunity(userId, communityId);
    }


}
