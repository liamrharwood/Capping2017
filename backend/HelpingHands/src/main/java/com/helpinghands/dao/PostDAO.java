package com.helpinghands.dao;

import com.helpinghands.core.mapper.post.PostCardMapper;
import com.helpinghands.core.mapper.post.PostUpdateMapper;
import com.helpinghands.core.post.PostCard;
import com.helpinghands.core.post.PostUpdate;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.GetGeneratedKeys;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.sql.Timestamp;
import java.util.List;

public interface PostDAO {
    String CARD_SELECT_FIELDS = " p.post_id, p.user_id, u.username, " +
            "(SELECT SUM(direction) FROM Votes AS v WHERE v.post_id = p.post_id) AS score, " +
            "p.body_text, p.post_title, p.create_date, p.is_complete ";

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "NULL AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "WHERE post_id = :postId")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostById(@Bind("postId") int postId);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "(SELECT direction FROM Votes AS v WHERE v.user_id = :authId AND v.post_id = p.post_id) AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "WHERE post_id = :postId")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostByIdWithVoteHistory(@Bind("authId") int authId, @Bind("postId") int postId);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "NULL AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "WHERE p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getAllPosts(@Bind("callDate") Timestamp callDate, @Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "(SELECT direction FROM Votes AS v WHERE v.user_id = :userId AND v.post_id = p.post_id) AS vote " +
            "FROM Posts AS p " +
            "JOIN Follows AS f ON f.followee_id = p.user_id " +
            "JOIN Users   AS u ON u.user_id     = f.followee_id " +
            "WHERE f.follower_id = :userId AND p.create_date < :callDate " +
            "UNION " +
            "SELECT " + CARD_SELECT_FIELDS + ", " +
            "(SELECT direction FROM Votes AS v WHERE v.user_id = :userId AND v.post_id = p.post_id) AS vote " +
            "FROM Posts AS p " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "JOIN Members AS m ON m.community_id = pc.community_id " +
            "JOIN Users AS u ON u.user_id = p.user_id " +
            "WHERE m.user_id = :userId AND p.create_date < :callDate " +
            "ORDER BY create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getFollowedPosts(@Bind("userId") int userId,
                                    @Bind("callDate") Timestamp callDate,@Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "NULL AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "WHERE p.user_id = :userId AND p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostsForUser(@Bind("userId") int userId,
                                   @Bind("callDate") Timestamp callDate,@Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "(SELECT direction FROM Votes AS v WHERE v.user_id = :authId AND v.post_id = p.post_id) AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "WHERE p.user_id = :userId AND p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostsForUserWithVoteHistory(@Bind("authId") int authId, @Bind("userId") int userId,
                                                  @Bind("callDate") Timestamp callDate, @Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "NULL AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "WHERE pc.community_id = :communityId AND p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostsForCommunity(@Bind("communityId") int communityId,
                                        @Bind("callDate") Timestamp callDate, @Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + "," +
            "(SELECT direction FROM Votes AS v WHERE v.user_id = :userId AND v.post_id = p.post_id) AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "WHERE pc.community_id = :communityId AND p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostsForCommunityWithVoteHistory(@Bind("userId") int userId, @Bind("communityId") int communityId,
                                                       @Bind("callDate") Timestamp callDate, @Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "NULL AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "WHERE pc.community_id = :communityId AND p.user_id = :userId AND p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostsForUserInCommunity(@Bind("userId") int userId, @Bind("communityId") int communityId,
                                              @Bind("callDate") Timestamp callDate, @Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + "," +
            "(SELECT direction FROM Votes AS v WHERE v.user_id = :authId AND v.post_id = p.post_id) AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "WHERE pc.community_id = :communityId AND p.user_id = :userId AND p.create_date < :callDate " +
            "ORDER BY p.create_date DESC " +
            "LIMIT :limit " +
            "OFFSET :startNum ")
    @Mapper(PostCardMapper.class)
    List<PostCard> getPostsForUserInCommunityWithVoteHistory(@Bind("authId") int authId, @Bind("userId") int userId, @Bind("communityId") int communityId,
                                                             @Bind("callDate") Timestamp callDate, @Bind("startNum") int startNum, @Bind("limit") int limit);

    @SqlQuery("SELECT post_update_id, post_id, body_text FROM PostUpdates WHERE post_id = :postId")
    @Mapper(PostUpdateMapper.class)
    List<PostUpdate> getUpdatesForPost(@Bind("postId") int postId);

    @SqlUpdate("INSERT INTO Posts (user_id, body_text, post_title, post_image_path) " +
            "VALUES (:userId, :bodyText, :postTitle, :postImagePath)")
    @GetGeneratedKeys
    int insertNewPost(@Bind("userId") int userId, @Bind("bodyText") String bodyText, @Bind("postTitle") String postTitle, @Bind("postImagePath") String postImagePath);

    @SqlUpdate("INSERT INTO PostUpdates (post_id, body_text) VALUES (:postId, :bodyText); " +
            "UPDATE Posts SET is_complete = :complete WHERE post_id = :postId")
    void insertNewPostUpdate(@Bind("postId") int postId, @Bind("bodyText") String bodyText, @Bind("complete") boolean complete);

    @SqlUpdate("INSERT INTO PostsToCommunities (post_id, community_id) VALUES (:postId, :communityId)")
    void associatePostWithCommunity(@Bind("postId") int postId, @Bind("communityId") int communityId);

    @SqlUpdate("INSERT INTO Votes (user_id, post_id, direction) VALUES (:userId, :postId, :direction) " +
            "ON CONFLICT ON CONSTRAINT votes_pkey DO UPDATE SET direction = :direction")
    void voteOnPost(@Bind("userId") int userId, @Bind("postId") int postId, @Bind("direction") int direction);

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + ", " +
            "NULL AS vote " +
            "FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id " +
            "WHERE lower(p.post_title) LIKE :query OR lower(p.body_text) LIKE :query " +
            "ORDER BY p.create_date DESC")
    @Mapper(PostCardMapper.class)
    List<PostCard> searchPosts(@Bind("query") String query);
}
