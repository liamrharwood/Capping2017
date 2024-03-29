package com.helpinghands.resources;

import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.community.Community;
import com.helpinghands.core.community.CommunityProfile;
import com.helpinghands.core.community.CommunityRequest;
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

/**
 * API endpoints dealing with communities. All paths begin with /communities.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
@Path("/communities")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
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
        int userId = userPrincipal.getId();
        return communityDAO.getFollowedCommunities(userId);
    }

    @GET
    @Path("profile")
    public CommunityProfile getCommunityProfile(@Auth Optional<UserPrincipal> userPrincipal,
                                                @QueryParam("id") int communityId) {
        // If the user is auth'd, check if they are a moderator
        if (userPrincipal.isPresent()) {
            int authId = userPrincipal.get().getId();
            CommunityProfile communityProfile = communityDAO.getCommunityProfileWithAuth(authId, communityId);
            communityProfile.setModerating(userDAO.isModeratorForCommunity(authId, communityProfile.getId()));
            return communityProfile;
        }
        return communityDAO.getCommunityProfile(communityId);
    }

    @PUT
    @Path("follow")
    public void followCommunity(@Auth UserPrincipal userPrincipal,
                                @QueryParam("community_id") int communityId) {
        int userId = userPrincipal.getId();
        communityDAO.followCommunity(userId, communityId);
    }

    @PUT
    @Path("unfollow")
    public void unfollowCommunity(@Auth UserPrincipal userPrincipal,
                                @QueryParam("community_id") int communityId) {
        int userId = userPrincipal.getId();
        communityDAO.unfollowCommunity(userId, communityId);
    }

    @POST
    public void createCommunity(@Auth UserPrincipal userPrincipal,
                                CommunityRequest communityRequest) {
        Optional<Community> community = Optional.ofNullable(communityDAO.getCommunityByName(communityRequest.getName()));
        if (community.isPresent()) {
            throw new WebApplicationException("A community with that name already exists.", 400);
        }

        int communityId = communityDAO.insertCommunity(communityRequest.getName(), communityRequest.getDescription());
        communityDAO.addModerator(userPrincipal.getId(), communityId);
    }

}
