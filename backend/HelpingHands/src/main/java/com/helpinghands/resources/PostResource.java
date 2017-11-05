package com.helpinghands.resources;

import com.helpinghands.core.post.PostCard;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.post.PostRequest;
import com.helpinghands.dao.PostDAO;
import io.dropwizard.auth.Auth;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostResource {
    private PostDAO postDAO;

    public PostResource(PostDAO postDAO) {
        this.postDAO = postDAO;
    }

    @GET
    public List<PostCard> getAllPosts(@Auth Optional<UserPrincipal> userPrincipal) {
        if (userPrincipal.isPresent()) {
            return postDAO.getFollowedPosts(userPrincipal.get().getName());
        }
        return postDAO.getAllPosts();
    }

    @POST
    public void createNewPost(PostRequest postRequest,
                              @Auth UserPrincipal userPrincipal) {
        int postId = postDAO.insertNewPost(postRequest.getUserId(), postRequest.getBodyText(), postRequest.getTitle(), postRequest.getImgPath());
        for (int communityId : postRequest.getCommunityIds()) {
            postDAO.associatePostWithCommunity(postId, communityId);
        }
    }

}
