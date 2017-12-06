package com.helpinghands.dao;

import com.helpinghands.core.mapper.report.ReportMapper;
import com.helpinghands.core.report.Report;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;

import java.util.List;

/**
 * SQL queries dealing with reports.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public interface ReportDAO {
    @SqlUpdate("INSERT INTO Reports (post_id, user_id, report_reason) VALUES (:postId, :userId, :reportReason)")
    void insertReport(@Bind("postId") int postId, @Bind("userId") int userId, @Bind("reportReason") String reportReason);

    @SqlQuery("SELECT r.post_id, r.user_id, r.report_reason, u.username FROM " +
            "Reports AS r " +
            "JOIN Users AS u ON r.user_id = u.user_id " +
            "JOIN Posts AS p ON r.post_id = p.post_id " +
            "JOIN PostsToCommunities AS pc ON p.post_id = pc.post_id " +
            "WHERE pc.community_id = :communityId")
    @Mapper(ReportMapper.class)
    List<Report> getReportsForCommunity(@Bind("communityId") int communityId);
}
