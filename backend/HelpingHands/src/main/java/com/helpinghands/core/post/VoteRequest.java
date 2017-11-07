package com.helpinghands.core.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class VoteRequest {
    @NotNull
    @JsonProperty
    private int postId;

    @NotNull
    @JsonProperty
    private int direction;

    public VoteRequest() {
        // Jackson deserialization
    }

    public VoteRequest(int postId, int direction) {
        this.postId = postId;
        this.direction = direction;
    }

    public int getPostId() {
        return postId;
    }

    public int getDirection() {
        return direction;
    }
}
