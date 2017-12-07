package com.helpinghands.core.mapper.community;

import com.helpinghands.core.community.CommunityProfile;
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
public class CommunityProfileMapper implements ResultSetMapper<CommunityProfile> {
    public CommunityProfile map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new CommunityProfile(resultSet.getInt("community_id"),
                resultSet.getString("name"),
                resultSet.getString("description"),
                resultSet.getInt("follower_count"),
                resultSet.getInt("post_count"),
                resultSet.getBoolean("is_following"),
                false);
    }
}
