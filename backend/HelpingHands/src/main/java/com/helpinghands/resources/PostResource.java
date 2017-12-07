package com.helpinghands.resources;

import com.helpinghands.core.comment.Comment;
import com.helpinghands.core.comment.CommentRequest;
import com.helpinghands.core.post.*;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.report.ReportRequest;
import com.helpinghands.dao.CommentDAO;
import com.helpinghands.dao.PostDAO;
import com.helpinghands.dao.ReportDAO;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.Auth;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

/**
 * API endpoints dealing with posts. All paths begin with /posts.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostResource {
    private PostDAO postDAO;
    private UserDAO userDAO;
    private CommentDAO commentDAO;
    private ReportDAO reportDAO;

    public PostResource(PostDAO postDAO,
                        UserDAO userDAO,
                        CommentDAO commentDAO,
                        ReportDAO reportDAO) {
        this.postDAO = postDAO;
        this.userDAO = userDAO;
        this.commentDAO = commentDAO;
        this.reportDAO = reportDAO;
    }

    /*
        Endpoint to handle ALL fetching of posts. Can take optional auth, user id, and/or community id.
        Also handles pagination: callDate determines when to get posts from, startNum and endNum determine index of
        the fetched results.
     */
    @GET
    public List<PostCard> getPosts(@Auth Optional<UserPrincipal> userPrincipal,
                                   @QueryParam("post_id") Optional<Integer> postId,
                                   @QueryParam("community_id") Optional<Integer> communityId,
                                   @QueryParam("user_id") Optional<Integer> userId,
                                   @QueryParam("callDate") long callDate,
                                   @QueryParam("startNum") int startNum,
                                   @QueryParam("endNum") int endNum) {
        // Turn callData millis into a Timestamp
        Timestamp callTimestamp = new Timestamp(callDate);
        // Calculate the number of posts to get
        int limit = endNum - startNum + 1;
        if (limit < 0) {
            throw new WebApplicationException("Invalid range of posts.", 400);
        }

        // Check if auth'd, if there is a user id, and if there is a community id, and filter accordingly
        if (userPrincipal.isPresent()) {
            int authId  = userPrincipal.get().getId();
            if (postId.isPresent()) {
                return postDAO.getPostByIdWithVoteHistory(authId, postId.get());
            }
            if (communityId.isPresent() && !userId.isPresent()) {
                return postDAO.getPostsForCommunityWithVoteHistory(authId, communityId.get(),
                        callTimestamp, startNum, limit);
            }
            if (!communityId.isPresent() && userId.isPresent()) {
                return postDAO.getPostsForUserWithVoteHistory(authId, userId.get(),
                        callTimestamp, startNum, limit);
            }
            if (communityId.isPresent() && userId.isPresent()) {
                return postDAO.getPostsForUserInCommunityWithVoteHistory(authId, userId.get(), communityId.get(),
                        callTimestamp, startNum, limit);
            }
            return postDAO.getFollowedPosts(authId,
                    callTimestamp, startNum, limit);
        } else if (postId.isPresent()) {
            return postDAO.getPostById(postId.get());
        } else if (communityId.isPresent() && !userId.isPresent()) {
            return postDAO.getPostsForCommunity(communityId.get(),
                    callTimestamp, startNum, limit);
        } else if (!communityId.isPresent() && userId.isPresent()) {
            return postDAO.getPostsForUser(userId.get(),
                    callTimestamp, startNum, limit);
        } else if (communityId.isPresent() && userId.isPresent()) {
            return postDAO.getPostsForUserInCommunity(userId.get(), communityId.get(),
                    callTimestamp, startNum, limit);
        }
        return postDAO.getAllPosts(callTimestamp, startNum, limit);
    }

    @POST
    public void createNewPost(PostRequest postRequest,
                              @Auth UserPrincipal userPrincipal) {
        int postId = postDAO.insertNewPost(userPrincipal.getId(), postRequest.getBodyText(), postRequest.getTitle(), postRequest.getImgPath());
        for (int communityId : postRequest.getCommunityIds()) {
            postDAO.associatePostWithCommunity(postId, communityId);
        }
    }

    @POST
    @Path("updates")
    public void createNewPostUpdate(@Auth UserPrincipal userPrincipal,
                                    PostUpdateRequest postUpdateRequest) {
        PostCard post = postDAO.getPostById(postUpdateRequest.getPostId()).get(0);
        if (post.isComplete()) {
            throw new WebApplicationException("You cannot update a complete post.", 400);
        }

        int userId = post.getUserId();
        if (userPrincipal.getId() == userId) {
            postDAO.insertNewPostUpdate(postUpdateRequest.getPostId(),
                    postUpdateRequest.getBodyText(),
                    postUpdateRequest.isComplete());
            if (postUpdateRequest.isComplete()) {
                // Update answeredPoints for users involved.
                userDAO.onCompletePostUpdatePoints(postUpdateRequest.getPostId());
            }
        } else {
            throw new WebApplicationException("You are not the owner of this post", 401);
        }
    }

    @GET
    @Path("updates")
    public List<PostUpdate> getUpdates(@QueryParam("post_id") int postId) {
        return postDAO.getUpdatesForPost(postId);
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
        int userId = userPrincipal.getId();
        commentDAO.insertComment(userId, commentRequest.getPostId(), commentRequest.getBodyText());
    }

    @POST
    @Path("reports")
    public void reportPost(@Auth UserPrincipal userPrincipal,
                           ReportRequest reportRequest) {
        reportDAO.insertReport(reportRequest.getPostId(), userPrincipal.getId(), reportRequest.getReportReason());
        // Update reportPoints for users involved
        userDAO.onReportUpdatePoints(userPrincipal.getId(), reportRequest.getPostId());
    }

    @POST
    @Path("vote")
    public void voteOnPost(@Auth UserPrincipal userPrincipal,
                           VoteRequest voteRequest) {
        int userId = userPrincipal.getId();
        int voteeId = postDAO.getPostById(voteRequest.getPostId()).get(0).getUserId();
        postDAO.voteOnPost(userId, voteRequest.getPostId(), voteRequest.getDirection());
        // Update prayPoints and upvotePoints for users involved
        userDAO.onVoteUpdatePoints(userId, voteeId, voteRequest.getPostId());
    }

}
