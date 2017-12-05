package com.helpinghands.dao;

import com.helpinghands.core.mapper.user.UserProfileMapper;
import com.helpinghands.core.user.User;
import com.helpinghands.core.mapper.user.UserMapper;
import com.helpinghands.core.user.UserProfile;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

public interface UserDAO {
    String SELECT_FIELDS = "user_id, username, first_name, last_name, email, birth_date, " +
            "location, profile_image_path, bio, reputation_points, is_administrator, ban_status, create_date, update_date";

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Users")
    @Mapper(UserMapper.class)
    List<User> getAllUsers();

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Users WHERE username = :username")
    @Mapper(UserMapper.class)
    User getUserByUsername(@Bind("username") String username);

    @SqlQuery("SELECT user_id, username, first_name, last_name, " +
            "(SELECT COUNT(*) FROM Follows WHERE followee_id = :id) AS followers_count, " +
            "(SELECT COUNT(*) FROM Members WHERE user_id = :id) AS followed_communities_count, " +
            "(SELECT COUNT(*) FROM Follows WHERE follower_id = :id) AS followed_users_count, " +
            "bio, profile_image_path, " +
            "(SELECT COUNT(*) FROM Posts WHERE user_id = :id) AS post_count, " +
            "FALSE AS is_following, " +
            "pray_points, answered_points, report_points, upvote_points, reputation_points " +
            "FROM Users WHERE user_id = :id")
    @Mapper(UserProfileMapper.class)
    UserProfile getUserProfile(@Bind("id") int id);

    @SqlQuery("SELECT user_id, username, first_name, last_name, " +
            "(SELECT COUNT(*) FROM Follows WHERE followee_id = :userId) AS followers_count, " +
            "(SELECT COUNT(*) FROM Members WHERE user_id = :userId) AS followed_communities_count, " +
            "(SELECT COUNT(*) FROM Follows WHERE follower_id = :userId) AS followed_users_count, " +
            "bio, profile_image_path, " +
            "(SELECT COUNT(*) FROM Posts WHERE user_id = :userId) AS post_count, " +
            "EXISTS(SELECT 1 FROM Follows WHERE followee_id = :userId AND follower_id = :authId) AS is_following, " +
            "pray_points, answered_points, report_points, upvote_points, reputation_points " +
            "FROM Users WHERE user_id = :userId")
    @Mapper(UserProfileMapper.class)
    UserProfile getUserProfileWithAuth(@Bind("authId") int authId, @Bind("userId") int userId);

    @SqlQuery("SELECT is_moderator FROM Members WHERE user_id = :userId AND community_id = :communityId")
    boolean isModeratorForCommunity(@Bind("userId") int userId, @Bind("communityId") int communityId);

    @SqlQuery("SELECT password_hash FROM Users WHERE username = :username")
    String getPasswordForUsername(@Bind("username") String username);

    @SqlQuery("SELECT access_token FROM Users WHERE username = :username")
    String getAccessTokenForUsername(@Bind("username") String username);

    @SqlQuery("SELECT access_token_timestamp FROM Users WHERE username = :username")
    Timestamp getAccessTokenTimestampForUsername(@Bind("username") String username);

    @SqlUpdate("UPDATE Users SET access_token = :accessToken, access_token_timestamp = :timestamp " +
            "WHERE user_id = :id")
    void updateAccessTokenForUser(@Bind("id") int id, @Bind("accessToken") String accessToken, @Bind("timestamp") Timestamp timestamp);

    @SqlUpdate("UPDATE Users SET profile_image_path = :imagePath WHERE user_id = :id")
    void updateImagePathForUser(@Bind("id") int id, @Bind("imagePath") String imagePath);

    @SqlUpdate("INSERT INTO Users (username, password_hash, first_name, last_name, email, birth_date)" +
            "VALUES (:username, :password_hash, :first_name, :last_name, :email, :birth_date)")
    void insertNewUser(@Bind("username") String username,
                       @Bind("password_hash") String passwordHash,
                       @Bind("first_name") String firstName,
                       @Bind("last_name") String lastName,
                       @Bind("email") String email,
                       @Bind("birth_date") Date birthDate);

    @SqlUpdate("INSERT INTO Follows (follower_id, followee_id) " +
            "VALUES (:followerId, :followeeId) " +
            "ON CONFLICT DO NOTHING")
    void followUser(@Bind("followerId") int followerId, @Bind("followeeId") int followeeId);

    @SqlUpdate("DELETE FROM Follows WHERE follower_id = :followerId AND followee_id = :followeeId")
    void unfollowUser(@Bind("followerId") int followerId, @Bind("followeeId") int followeeId);

    @SqlUpdate("UPDATE Users SET pray_points = (SELECT COUNT(*) FROM Votes WHERE direction = 1 AND user_id = :voterId) " +
            "WHERE user_id = :voterId; " +
            "UPDATE Users SET upvote_points = " +
            "(SELECT COUNT(*) FROM Votes AS v " +
            "JOIN Posts AS p ON v.post_id = p.post_id " +
            "WHERE v.direction = 1 AND p.user_id = :voteeId) " +
            "WHERE user_id = (SELECT user_id FROM Posts WHERE post_id = :postId);" +
            "UPDATE Users SET reputation_points = (pray_points + 5 * answered_points + 3 * report_points + upvote_points) " +
            "WHERE user_id = :voterId OR " +
            "user_id = (SELECT user_id FROM Posts WHERE post_id = :postId)")
    void onVoteUpdatePoints(@Bind("voterId") int voterId, @Bind("voteeId") int voteeId, @Bind("postId") int postId);

    @SqlUpdate("UPDATE Users SET report_points = " +
            "(SELECT COUNT(*) FROM Reports AS r WHERE r.user_id = users.user_id " +
            "AND (SELECT COUNT(*) FROM Reports WHERE post_id = :postId) > 1) " +
            "WHERE user_id IN (SELECT user_id FROM Reports WHERE post_id = :postId);" +
            "UPDATE Users SET reputation_points = (pray_points + 5 * answered_points + 3 * report_points + upvote_points) " +
            "WHERE user_id IN (SELECT user_id FROM Reports WHERE post_id = :postId);")
    void onReportUpdatePoints(@Bind("reporterId") int reporterId, @Bind("postId") int postId);

    @SqlUpdate("UPDATE Users SET answered_points = answered_points + 1 " +
            "WHERE user_id IN (SELECT user_id FROM Votes WHERE post_id = :postId); " +
            "UPDATE Users SET reputation_points = (pray_points + 5 * answered_points + 3 * report_points + upvote_points) " +
            "WHERE user_id IN (SELECT user_id FROM Votes WHERE post_id = :postId)")
    void onCompletePostUpdatePoints(@Bind("postId") int postId);

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Users " +
            "WHERE lower(username) LIKE :query OR " +
            "lower(bio) LIKE :query OR " +
            "lower(first_name) LIKE :query OR " +
            "lower(last_name) LIKE :query")
    @Mapper(UserMapper.class)
    List<User> searchUsers(@Bind("query") String query);
}
