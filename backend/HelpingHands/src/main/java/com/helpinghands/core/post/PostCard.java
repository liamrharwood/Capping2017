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
    private Integer score;

    @JsonProperty
    private Integer vote;

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

    @JsonProperty
    private String imgPath;

    public PostCard(Integer id, Integer userId, String username, Integer score, Integer vote, String bodyText, String title, Timestamp createDate, boolean complete, String imgPath) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.score = score;
        this.vote = vote;
        this.bodyText = bodyText;
        this.title = title;
        this.createDate = createDate;
        this.complete = complete;
        this.imgPath = imgPath;
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

    public Integer getScore() {
        return score;
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

    public String getImgPath() {
        return imgPath;
    }
}
