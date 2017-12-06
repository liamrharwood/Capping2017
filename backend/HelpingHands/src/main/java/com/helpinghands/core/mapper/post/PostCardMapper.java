package com.helpinghands.core.mapper.post;

import com.helpinghands.core.post.Post;
import com.helpinghands.core.post.PostCard;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class PostCardMapper implements ResultSetMapper<PostCard> {
    public PostCard map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new PostCard(resultSet.getInt("post_id"),
                resultSet.getInt("user_id"),
                resultSet.getString("username"),
                resultSet.getInt("score"),
                resultSet.getInt("vote"),
                resultSet.getString("body_text"),
                resultSet.getString("post_title"),
                resultSet.getTimestamp("create_date"),
                resultSet.getBoolean("is_complete"),
                resultSet.getString("post_image_path"));
    }
}
