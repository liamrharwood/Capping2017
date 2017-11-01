package com.helpinghands.resources;

import com.helpinghands.core.post.PostCard;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.dao.PostDAO;
import io.dropwizard.auth.Auth;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.security.Principal;
import java.util.List;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostResource {
    private PostDAO postDAO;

    public PostResource(PostDAO postDAO) {
        this.postDAO = postDAO;
    }

    @GET
    public List<PostCard> getAllPosts() {
        return postDAO.getAllPosts();
    }

    /*
    @Path("following")
    @GET
    public List<Post> getFollowedPosts(@Auth UserPrincipal user) {
        return postDAO.getFollowedPosts(user.getName());
    }
    */
}
