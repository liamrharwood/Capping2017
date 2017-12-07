package com.helpinghands.core.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

/**
 * Represents a post / prayer request update.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class PostUpdate {
    @NotNull
    @JsonProperty
    private int id;

    @NotNull
    @JsonProperty
    private int postId;

    @NotNull
    @JsonProperty
    private String bodyText;

    public PostUpdate() {
        // Jackson deserialization
    }

    public PostUpdate(int id, int postId, String bodyText) {
        this.id = id;
        this.postId = postId;
        this.bodyText = bodyText;
    }

    public int getId() {
        return id;
    }

    public int getPostId() {
        return postId;
    }

    public String getBodyText() {
        return bodyText;
    }
}
