package com.helpinghands.core.report;

public class ReportRequest {
    private Integer postId;

    private String reportReason;

    public ReportRequest() {
        // Jackson deserialization
    }

    public ReportRequest(Integer postId, String reportReason) {
        this.postId = postId;
        this.reportReason = reportReason;
    }

    public Integer getPostId() {
        return postId;
    }

    public String getReportReason() {
        return reportReason;
    }
}
