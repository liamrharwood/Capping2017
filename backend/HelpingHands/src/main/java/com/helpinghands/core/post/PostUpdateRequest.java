package com.helpinghands.core.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class PostUpdateRequest {
    @NotNull
    @JsonProperty
    private int postId;

    @NotNull
    @JsonProperty
    private String bodyText;

    @NotNull
    @JsonProperty
    private boolean complete;

    public PostUpdateRequest() {
        // Jackson deserialization
    }

    public PostUpdateRequest(int postId, String bodyText) {
        this.postId = postId;
        this.bodyText = bodyText;
    }

    public int getPostId() {
        return postId;
    }

    public String getBodyText() {
        return bodyText;
    }

    public boolean isComplete() {
        return complete;
    }
}
