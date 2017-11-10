package com.helpinghands.resources;

import com.helpinghands.core.comment.Comment;
import com.helpinghands.core.comment.CommentRequest;
import com.helpinghands.core.post.PostCard;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.post.PostRequest;
import com.helpinghands.core.post.VoteRequest;
import com.helpinghands.dao.CommentDAO;
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
    private CommentDAO commentDAO;

    public PostResource(PostDAO postDAO,
                        UserDAO userDAO,
                        CommentDAO commentDAO) {
        this.postDAO = postDAO;
        this.userDAO = userDAO;
        this.commentDAO = commentDAO;
    }

    @GET
    public List<PostCard> getPosts(@Auth Optional<UserPrincipal> userPrincipal,
                                   @QueryParam("post_id") Optional<Integer> postId,
                                   @QueryParam("community_id") Optional<Integer> communityId,
                                   @QueryParam("user_id") Optional<Integer> userId) {
        if (userPrincipal.isPresent()) {
            int authId  = userDAO.getUserByUsername(userPrincipal.get().getName()).getId();
            if (postId.isPresent()) {
                return postDAO.getPostByIdWithVoteHistory(authId, postId.get());
            }
            if (communityId.isPresent() && !userId.isPresent()) {
                return postDAO.getPostsForCommunityWithVoteHistory(authId, communityId.get());
            }
            if (!communityId.isPresent() && userId.isPresent()) {
                return postDAO.getPostsForUserWithVoteHistory(authId, userId.get());
            }
            if (communityId.isPresent() && userId.isPresent()) {
                return postDAO.getPostsForUserInCommunityWithVoteHistory(authId, userId.get(), communityId.get());
            }
            return postDAO.getFollowedPosts(authId);
        } else if (postId.isPresent()) {
            return postDAO.getPostById(postId.get());
        } else if (communityId.isPresent() && !userId.isPresent()) {
            return postDAO.getPostsForCommunity(communityId.get());
        } else if (!communityId.isPresent() && userId.isPresent()) {
            return postDAO.getPostsForUser(userId.get());
        } else if (communityId.isPresent() && userId.isPresent()) {
            return postDAO.getPostsForUserInCommunity(userId.get(), communityId.get());
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

    @GET
    @Path("comments")
    public List<Comment> getComments(@QueryParam("post_id") int postId) {
        return commentDAO.getCommentsForPost(postId);
    }

    @POST
    @Path("comments")
    public void createCommentOnPost(@Auth UserPrincipal userPrincipal,
                                    CommentRequest commentRequest) {
        int userId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        commentDAO.insertComment(userId, commentRequest.getPostId(), commentRequest.getBodyText());
    }

    @POST
    @Path("vote")
    public void voteOnPost(@Auth UserPrincipal userPrincipal,
                           VoteRequest voteRequest) {
        int userId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        postDAO.voteOnPost(userId, voteRequest.getPostId(), voteRequest.getDirection());
    }

}
