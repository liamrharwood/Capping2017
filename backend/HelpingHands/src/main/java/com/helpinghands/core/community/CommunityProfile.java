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

    public CommunityProfile() {
        // Jackson deserialization
    }

    public CommunityProfile(Integer id, String name, String description, Integer followerCount, Integer postCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.followerCount = followerCount;
        this.postCount = postCount;
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
}
