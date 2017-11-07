package com.helpinghands.resources;

import com.helpinghands.core.post.PostCard;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.post.PostRequest;
import com.helpinghands.core.post.VoteRequest;
import com.helpinghands.dao.PostDAO;
import com.helpinghands.dao.UserDAO;
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
    private UserDAO userDAO;

    public PostResource(PostDAO postDAO,
                        UserDAO userDAO) {
        this.postDAO = postDAO;
        this.userDAO = userDAO;
    }

    @GET
    public List<PostCard> getPosts(@Auth Optional<UserPrincipal> userPrincipal,
                                   @QueryParam("community_id") Optional<Integer> communityId) {
        if (communityId.isPresent()) {
            return postDAO.getPostsForCommunity(communityId.get());
        }

        if (userPrincipal.isPresent()) {
            int userId  = userDAO.getUserByUsername(userPrincipal.get().getName()).getId();
            return postDAO.getFollowedPosts(userId);
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

    @POST
    @Path("vote")
    public void voteOnPost(@Auth UserPrincipal userPrincipal,
                           VoteRequest voteRequest) {
        int userId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        postDAO.voteOnPost(userId, voteRequest.getPostId(), voteRequest.getDirection());
    }

}
