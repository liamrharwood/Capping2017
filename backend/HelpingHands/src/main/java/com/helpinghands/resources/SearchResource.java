package com.helpinghands.resources;

import com.helpinghands.core.search.SearchResults;
import com.helpinghands.dao.CommunityDAO;
import com.helpinghands.dao.PostDAO;
import com.helpinghands.dao.UserDAO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/search")
@Produces(MediaType.APPLICATION_JSON)
public class SearchResource {
    private CommunityDAO communityDAO;
    private PostDAO postDAO;
    private UserDAO userDAO;

    public SearchResource(CommunityDAO communityDAO,
                          PostDAO postDAO,
                          UserDAO userDAO) {
        this.communityDAO = communityDAO;
        this.postDAO = postDAO;
        this.userDAO = userDAO;
    }

    @GET
    public SearchResults search(@QueryParam("q") String query) {
        query = query.toLowerCase();
        query = "%" + query + "%";

        return new SearchResults(userDAO.searchUsers(query),
                communityDAO.searchCommunities(query),
                postDAO.searchPosts(query));
    }

}
