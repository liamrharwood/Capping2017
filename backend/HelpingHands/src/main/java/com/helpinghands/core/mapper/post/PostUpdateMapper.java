package com.helpinghands.core.mapper.post;

import com.helpinghands.core.post.PostUpdate;
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
public class PostUpdateMapper implements ResultSetMapper<PostUpdate> {
    @Override
    public PostUpdate map(int i, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new PostUpdate(resultSet.getInt("post_update_id"),
                resultSet.getInt("post_id"),
                resultSet.getString("body_text"));
    }
}
