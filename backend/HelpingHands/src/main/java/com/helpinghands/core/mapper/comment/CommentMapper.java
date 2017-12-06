package com.helpinghands.core.mapper.comment;

import com.helpinghands.core.comment.Comment;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Mapper for JDBC result sets.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class CommentMapper implements ResultSetMapper<Comment> {
    public Comment map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new Comment(resultSet.getInt("comment_id"),
                resultSet.getInt("user_id"),
                resultSet.getString("username"),
                resultSet.getInt("post_id"),
                resultSet.getString("body_text"),
                resultSet.getTimestamp("create_date"));
    }
}
