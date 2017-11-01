package com.helpinghands.core.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

public class PostCard {
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
    private Integer upvotes;

    @NotNull
    @JsonProperty
    private Integer downvotes;

    @JsonProperty
    private String bodyText;

    @NotNull
    @JsonProperty
    private String title;

    @NotNull
    @JsonProperty
    private Timestamp createDate;

    @NotNull
    @JsonProperty
    private boolean complete;

    public PostCard(Integer id, Integer userId, String username, Integer upvotes, Integer downvotes, String bodyText, String title, Timestamp createDate, boolean complete) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.bodyText = bodyText;
        this.title = title;
        this.createDate = createDate;
        this.complete = complete;
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

    public Integer getUpvotes() {
        return upvotes;
    }

    public Integer getDownvotes() {
        return downvotes;
    }

    public String getBodyText() {
        return bodyText;
    }

    public String getTitle() {
        return title;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public boolean isComplete() {
        return complete;
    }
}
