package com.helpinghands.core.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

public class Post {
    @NotNull
    @JsonProperty
    private Integer id;

    @NotNull
    @JsonProperty
    private Integer userId;

    @JsonProperty
    private String bodyText;

    @NotNull
    @JsonProperty
    private String title;

    @JsonProperty
    private String imagePath;

    @NotNull
    @JsonProperty
    private Timestamp createDate;

    @NotNull
    @JsonProperty
    private boolean complete;

    public Post(Integer id,
                Integer userId,
                String bodyText,
                String title,
                String imagePath,
                Timestamp createDate,
                boolean complete) {
        this.id = id;
        this.userId = userId;
        this.bodyText = bodyText;
        this.title = title;
        this.imagePath = imagePath;
        this.createDate = createDate;
        this.complete = complete;
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getBodyText() {
        return bodyText;
    }

    public String getTitle() {
        return title;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public boolean isComplete() {
        return complete;
    }

}
