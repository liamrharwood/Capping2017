package com.helpinghands.core.mapper;

import com.helpinghands.core.user.User;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements ResultSetMapper<User> {
    public User map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new User(resultSet.getInt("user_id"),
                resultSet.getString("username"),
                resultSet.getString("first_name"),
                resultSet.getString("last_name"));
    }
}
