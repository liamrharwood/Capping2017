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
            "FALSE AS is_following " +
            "FROM Users WHERE user_id = :id")
    @Mapper(UserProfileMapper.class)
    UserProfile getUserProfile(@Bind("id") int id);

    @SqlQuery("SELECT user_id, username, first_name, last_name, " +
            "(SELECT COUNT(*) FROM Follows WHERE followee_id = :userId) AS followers_count, " +
            "(SELECT COUNT(*) FROM Members WHERE user_id = :userId) AS followed_communities_count, " +
            "(SELECT COUNT(*) FROM Follows WHERE follower_id = :userId) AS followed_users_count, " +
            "bio, profile_image_path, " +
            "(SELECT COUNT(*) FROM Posts WHERE user_id = :userId) AS post_count, " +
            "EXISTS(SELECT 1 FROM Follows WHERE followee_id = :userId AND follower_id = :authId) AS is_following " +
            "FROM Users WHERE user_id = :userId")
    @Mapper(UserProfileMapper.class)
    UserProfile getUserProfileWithAuth(@Bind("authId") int authId, @Bind("userId") int userId);


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
}
