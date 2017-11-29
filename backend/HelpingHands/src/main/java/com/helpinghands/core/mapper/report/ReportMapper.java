package com.helpinghands.core.mapper.report;

import com.helpinghands.core.report.Report;
import org.skife.jdbi.v2.StatementContext;
import org.skife.jdbi.v2.tweak.ResultSetMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReportMapper implements ResultSetMapper<Report> {

    @Override
    public Report map(int i, ResultSet resultSet, StatementContext statementContext) throws SQLException {
        return new Report(resultSet.getInt("user_id"),
                resultSet.getInt("post_id"),
                resultSet.getString("username"),
                resultSet.getString("report_reason"));
    }
}
