package com.helpinghands.core.mapper.user;

import com.helpinghands.core.user.UserProfile;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserProfileMapper implements ResultSetMapper<UserProfile> {
    public UserProfile map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new UserProfile(resultSet.getInt("user_id"),
                resultSet.getString("username"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getInt("followers_count"),
                resultSet.getInt("followed_communities_count"),
                resultSet.getInt("followed_users_count"),
                resultSet.getString("bio"),
                resultSet.getString("profile_image_path"),
                resultSet.getInt("post_count"),
                resultSet.getBoolean("is_following"),
                resultSet.getInt("pray_points"),
                resultSet.getInt("answered_points"),
                resultSet.getInt("report_points"),
                resultSet.getInt("upvote_points"),
                resultSet.getInt("reputation_points"),
                resultSet.getString("email"));
    }
}
