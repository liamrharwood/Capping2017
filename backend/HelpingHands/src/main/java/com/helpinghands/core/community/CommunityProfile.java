package com.helpinghands.core.community;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class CommunityProfile {
    @NotNull
    @JsonProperty
    private Integer id;

    @NotNull
    @JsonProperty
    private String name;

    @NotNull
    @JsonProperty
    private String description;

    @NotNull
    @JsonProperty
    private Integer followerCount;

    @NotNull
    @JsonProperty
    private Integer postCount;

    @NotNull
    @JsonProperty
    private boolean following;

    @NotNull
    @JsonProperty
    private boolean moderating;

    public CommunityProfile() {
        // Jackson deserialization
    }

    public CommunityProfile(Integer id, String name, String description, Integer followerCount, Integer postCount, boolean following, boolean moderating) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.followerCount = followerCount;
        this.postCount = postCount;
        this.following = following;
        this.moderating = moderating;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Integer getFollowerCount() {
        return followerCount;
    }

    public Integer getPostCount() {
        return postCount;
    }

    public boolean isFollowing() {
        return following;
    }

    public boolean isModerating() {
        return moderating;
    }

    public void setModerating(boolean moderating) {
        this.moderating = moderating;
    }
}
