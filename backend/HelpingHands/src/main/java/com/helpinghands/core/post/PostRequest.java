package com.helpinghands.core.post;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.List;

public class PostRequest {
    @NotNull
    @JsonProperty
    private String title;

    @NotNull
    @JsonProperty
    private Integer userId;

    @JsonProperty
    private String bodyText;

    @JsonProperty
    private String imgPath;

    @NotNull
    @JsonProperty
    private List<Integer> communityIds;

    public PostRequest() {
        // Jackson deserialization
    }

    public PostRequest(String title, Integer userId, String bodyText, String imgPath, List<Integer> communityIds) {
        this.title = title;
        this.userId = userId;
        this.bodyText = bodyText;
        this.imgPath = imgPath;
        this.communityIds = communityIds;
    }

    public String getTitle() {
        return title;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getBodyText() {
        return bodyText;
    }

    public String getImgPath() {
        return imgPath;
    }

    public List<Integer> getCommunityIds() {
        return communityIds;
    }
}
