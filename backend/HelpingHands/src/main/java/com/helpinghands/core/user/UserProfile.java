package com.helpinghands.core.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class UserProfile {
    @NotNull
    @JsonProperty
    private Integer userId;

    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private String firstName;

    @NotNull
    @JsonProperty
    private String lastName;

    @NotNull
    @JsonProperty
    private Integer followersCount;

    @NotNull
    @JsonProperty
    private Integer followedCommunitiesCount;

    @NotNull
    @JsonProperty
    private Integer followedUsersCount;

    @JsonProperty
    private String bio;

    @JsonProperty
    private String profileImagePath;

    public UserProfile(Integer userId, String username, String firstName, String lastName, Integer followersCount, Integer followedCommunitiesCount, Integer followedUsersCount, String bio, String profileImagePath) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.followersCount = followersCount;
        this.followedCommunitiesCount = followedCommunitiesCount;
        this.followedUsersCount = followedUsersCount;
        this.bio = bio;
        this.profileImagePath = profileImagePath;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Integer getFollowersCount() {
        return followersCount;
    }

    public Integer getFollowedCommunitiesCount() {
        return followedCommunitiesCount;
    }

    public Integer getFollowedUsersCount() {
        return followedUsersCount;
    }

    public String getBio() {
        return bio;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }
}
