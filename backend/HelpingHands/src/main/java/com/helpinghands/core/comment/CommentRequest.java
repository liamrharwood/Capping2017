package com.helpinghands.core.comment;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

/**
 * De-serialized JSON object used for creating comments.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class CommentRequest {
    @NotNull
    @JsonProperty
    private Integer postId;

    @NotNull
    @JsonProperty
    private String bodyText;

    public CommentRequest() {
        // Jackson deserialization
    }

    public CommentRequest(Integer postId, String bodyText) {
        this.postId = postId;
        this.bodyText = bodyText;
    }

    public Integer getPostId() {
        return postId;
    }

    public String getBodyText() {
        return bodyText;
    }
}
