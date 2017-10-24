package com.helpinghands.core.mapper.user;

import com.helpinghands.core.BanStatus;
import com.helpinghands.core.user.User;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements ResultSetMapper<User> {
    public User map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new User(
                resultSet.getInt("user_id"),
                resultSet.getString("username"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"),
                resultSet.getString("email"),
                resultSet.getDate("birth_date"),
                resultSet.getString("location"),
                resultSet.getString("profile_image_path"),
                resultSet.getString("bio"),
                resultSet.getInt("reputation_points"),
                resultSet.getBoolean("is_administrator"),
                BanStatus.valueOf(resultSet.getString("ban_status")),
                resultSet.getTimestamp("create_date"),
                resultSet.getTimestamp("update_date"));
    }
}
