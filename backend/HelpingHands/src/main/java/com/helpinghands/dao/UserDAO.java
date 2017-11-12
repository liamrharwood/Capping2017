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
            "(SELECT COUNT(*) FROM Posts WHERE user_id = :id) AS post_count " +
            "FROM Users WHERE user_id = :id")
    @Mapper(UserProfileMapper.class)
    UserProfile getUserProfile(@Bind("id") int id);

    @SqlQuery("SELECT password_hash FROM Users WHERE username = :username")
    String getPasswordForUsername(@Bind("username") String username);

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
