package com.helpinghands.core.report;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class Report {
    @NotNull
    @JsonProperty
    private int userId;

    @NotNull
    @JsonProperty
    private int postId;

    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private String reportReason;

    public Report() {
        // Jackson deserialization
    }

    public Report(int userId, int postId, String username, String reportReason) {
        this.userId = userId;
        this.postId = postId;
        this.username = username;
        this.reportReason = reportReason;
    }

    public int getUserId() {
        return userId;
    }

    public int getPostId() {
        return postId;
    }

    public String getUsername() {
        return username;
    }

    public String getReportReason() {
        return reportReason;
    }
}
