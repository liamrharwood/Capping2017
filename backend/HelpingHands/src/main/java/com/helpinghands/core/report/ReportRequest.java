package com.helpinghands.core.report;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class ReportRequest {

    @NotNull
    @JsonProperty
    private Integer postId;

    @NotNull
    @JsonProperty
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
