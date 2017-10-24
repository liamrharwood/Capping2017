package com.helpinghands.core.mapper.post;

import com.helpinghands.core.post.Post;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PostMapper implements ResultSetMapper<Post> {
    public Post map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new Post(resultSet.getInt("post_id"),
                resultSet.getInt("user_id"),
                resultSet.getInt("upvotes"),
                resultSet.getInt("downvotes"),
                resultSet.getString("body_text"),
                resultSet.getString("post_title"),
                resultSet.getString("post_image_path"),
                resultSet.getTimestamp("create_date"),
                resultSet.getBoolean("is_complete"));
    }
}
