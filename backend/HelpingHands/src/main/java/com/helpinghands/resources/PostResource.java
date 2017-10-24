package com.helpinghands.resources;

import com.helpinghands.core.post.Post;
import com.helpinghands.dao.PostDAO;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
    public List<Post> getAllPosts() {
        return postDAO.getAllPosts();
    }
}
