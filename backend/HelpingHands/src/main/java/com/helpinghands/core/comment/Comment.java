package com.helpinghands.core.comment;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Represents a comment on a post.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class Comment {
    @NotNull
    @JsonProperty
    private Integer id;

    @NotNull
    @JsonProperty
    private Integer userId;

    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private Integer postId;

    @NotNull
    @JsonProperty
    private String bodyText;

    @NotNull
    @JsonProperty
    private Timestamp createDate;

    public Comment() {
        // Jackson deserialization
    }

    public Comment(Integer id, Integer userId, String username, Integer postId, String bodyText, Timestamp createDate) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.postId = postId;
        this.bodyText = bodyText;
        this.createDate = createDate;
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public Integer getPostId() {
        return postId;
    }

    public String getBodyText() {
        return bodyText;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }
}
