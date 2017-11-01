package com.helpinghands.dao;

import com.helpinghands.core.user.User;
import com.helpinghands.core.mapper.user.UserMapper;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.sql.Date;
import java.util.List;

@RegisterMapper(UserMapper.class)
public interface UserDAO {
    String SELECT_FIELDS = "user_id, username, first_name, last_name, email, birth_date, " +
            "location, profile_image_path, bio, reputation_points, is_administrator, ban_status, create_date, update_date";

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Users")
    List<User> getAllUsers();

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Users WHERE username = :username")
    User getUserByUsername(@Bind("username") String username);

    @SqlQuery("SELECT COUNT(*) FROM Follows WHERE followee_id = :id")
    Integer getFollowersCountForUser(@Bind("id") int id);

    @SqlQuery("SELECT COUNT(*) FROM Follows WHERE follower_id = :id")
    Integer getFollowedCountForUser(@Bind("id") int id);

    @SqlQuery("SELECT COUNT(*) FROM Members WHERE user_id = :id")
    Integer getFollowedCommunitiesCountForUser(@Bind("id") int id);

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

}
