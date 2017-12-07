package com.helpinghands.core.mapper.community;

import com.helpinghands.core.BanStatus;
import com.helpinghands.core.community.Community;
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
public class CommunityMapper implements ResultSetMapper<Community> {
    public Community map(int index, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new Community(resultSet.getInt("community_id"),
                resultSet.getString("name"),
                resultSet.getString("description"),
                resultSet.getBoolean("is_verified"),
                resultSet.getTimestamp("create_date"),
                BanStatus.valueOf(resultSet.getString("ban_status")));
    }
}
