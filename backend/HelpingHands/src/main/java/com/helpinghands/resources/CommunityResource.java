package com.helpinghands.resources;

import com.helpinghands.core.community.CommunityProfile;
import com.helpinghands.dao.CommunityDAO;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/communities")
@Produces(MediaType.APPLICATION_JSON)
public class CommunityResource {
    private CommunityDAO communityDAO;

    public CommunityResource(CommunityDAO communityDAO) {
        this.communityDAO = communityDAO;
    }

    @GET
    @Path("profile")
    public CommunityProfile getCommunityProfile(@QueryParam("id") int communityId) {
        return communityDAO.getCommunityProfile(communityId);
    }
}
