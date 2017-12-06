package com.helpinghands.resources;

import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.dao.CommunityDAO;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.Auth;

import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;

/**
 * API endpoints for admins. All paths begin with /admin.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
@Path("admin")
public class AdminResource {
    private UserDAO userDAO;
    private CommunityDAO communityDAO;

    public AdminResource(UserDAO userDAO, CommunityDAO communityDAO) {
        this.userDAO = userDAO;
        this.communityDAO = communityDAO;
    }

    /*
        Change a user's ban status; The "b" query param is either -1, 0, or 1.
     */
    @PUT
    @Path("users/ban_status")
    public void changeUserBanStatus(@Auth UserPrincipal userPrincipal,
                                    @QueryParam("b") int banStatus,
                                    @QueryParam("user_id") int userId) {
        if (!userDAO.isAdministrator(userPrincipal.getId())) {
            throw new WebApplicationException("You are not an administrator.", 401);
        }
        switch (banStatus) {
            case -1:
                userDAO.setUserNotBanned(userId);
                break;
            case 0:
                userDAO.setUserPending(userId);
                break;
            case 1:
                userDAO.setUserBanned(userId);
                break;
            default:
                throw new WebApplicationException("Invalid parameter.", 400);
        }
    }

    /*
        Change a community's ban status; The "b" query param is either -1, 0, or 1.
     */
    @PUT
    @Path("communities/ban_status")
    public void changeCommunityBanStatus(@Auth UserPrincipal userPrincipal,
                                         @QueryParam("b") int banStatus,
                                         @QueryParam("community_id") int communityId) {
        if (!userDAO.isAdministrator(userPrincipal.getId())) {
            throw new WebApplicationException("You are not an administrator.", 401);
        }
        switch (banStatus) {
            case -1:
                communityDAO.setCommunityNotBanned(communityId);
                break;
            case 0:
                communityDAO.setCommunityPending(communityId);
                break;
            case 1:
                communityDAO.setCommunityBanned(communityId);
                break;
            default:
                throw new WebApplicationException("Invalid parameter.", 400);
        }
    }

    @PUT
    @Path("communities/verification")
    public void changeCommunityVerification(@Auth UserPrincipal userPrincipal,
                                            @QueryParam("v") boolean verified,
                                            @QueryParam("community_id") int communityId) {
        if (!userDAO.isAdministrator(userPrincipal.getId())) {
            throw new WebApplicationException("You are not an administrator.", 401);
        }
        communityDAO.updateCommunityVerification(verified, communityId);
    }
}
