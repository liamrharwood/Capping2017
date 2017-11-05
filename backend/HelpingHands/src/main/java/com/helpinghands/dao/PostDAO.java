package com.helpinghands.dao;

import com.helpinghands.core.mapper.post.PostCardMapper;
import com.helpinghands.core.post.PostCard;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.List;

@RegisterMapper(PostCardMapper.class)
public interface PostDAO {
    String CARD_SELECT_FIELDS = " p.post_id, p.user_id, u.username, p.upvotes, p.downvotes, " +
            "p.body_text, p.post_title, p.create_date, p.is_complete ";

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + " FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id")
    List<PostCard> getAllPosts();

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + " FROM Posts AS p " +
            "JOIN Follows AS f ON f.followee_id = p.user_id " +
            "JOIN Users   AS u ON u.user_id     = f.followee_id " +
            "WHERE f.follower_id = :userId " +
            "UNION " +
            "SELECT " + CARD_SELECT_FIELDS + " FROM Posts AS p " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "JOIN Members AS m ON m.community_id = pc.community_id " +
            "JOIN Users AS u ON u.user_id = p.user_id " +
            "WHERE m.user_id = :userId")
    List<PostCard> getFollowedPosts(@Bind("userId") int userId);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + " FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "WHERE pc.community_id = :communityId")
    List<PostCard> getPostsForCommunity(@Bind("communityId") int communityId);

    @SqlUpdate("INSERT INTO Posts (user_id, body_text, post_title, post_image_path) " +
            "VALUES (:userId, :bodyText, :postTitle, :postImagePath)")
    @GetGeneratedKeys
    int insertNewPost(@Bind("userId") int userId, @Bind("bodyText") String bodyText, @Bind("postTitle") String postTitle, @Bind("postImagePath") String postImagePath);

    @SqlUpdate("INSERT INTO PostsToCommunities (post_id, community_id) VALUES (:postId, :communityId)")
    void associatePostWithCommunity(@Bind("postId") int postId, @Bind("communityId") int communityId);
}
