package com.helpinghands.core.mapper;

import com.helpinghands.core.User;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements ResultSetMapper<User> {
    public User map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new User(resultSet.getInt("user_id"), resultSet.getString("first_name"));
    }
}
