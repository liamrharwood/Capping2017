package com.helpinghands.core.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

/**
 * Represents a user profile as seen on the UI.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
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

    @NotNull
    @JsonProperty
    private Integer postCount;

    @NotNull
    @JsonProperty
    private boolean following;

    @NotNull
    @JsonProperty
    private Integer prayPoints;

    @NotNull
    @JsonProperty
    private Integer answeredPoints;

    @NotNull
    @JsonProperty
    private Integer reportPoints;

    @NotNull
    @JsonProperty
    private Integer upvotePoints;

    @NotNull
    @JsonProperty
    private Integer overallReputationPoints;

    @JsonProperty
    private String email;

    public UserProfile(Integer userId, String username, String firstName, String lastName, Integer followersCount, Integer followedCommunitiesCount, Integer followedUsersCount, String bio, String profileImagePath, Integer postCount, boolean following, Integer prayPoints, Integer answeredPoints, Integer reportPoints, Integer upvotePoints, Integer overallReputationPoints, String email) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.followersCount = followersCount;
        this.followedCommunitiesCount = followedCommunitiesCount;
        this.followedUsersCount = followedUsersCount;
        this.bio = bio;
        this.profileImagePath = profileImagePath;
        this.postCount = postCount;
        this.following = following;
        this.prayPoints = prayPoints;
        this.answeredPoints = answeredPoints;
        this.reportPoints = reportPoints;
        this.upvotePoints = upvotePoints;
        this.overallReputationPoints = overallReputationPoints;
        this.email = email;
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

    public Integer getPostCount() {
        return postCount;
    }

    public boolean isFollowing() {
        return following;
    }

    public Integer getPrayPoints() {
        return prayPoints;
    }

    public Integer getAnsweredPoints() {
        return answeredPoints;
    }

    public Integer getReportPoints() {
        return reportPoints;
    }

    public Integer getUpvotePoints() {
        return upvotePoints;
    }

    public Integer getOverallReputationPoints() {
        return overallReputationPoints;
    }

    public String getEmail() {
        return email;
    }
}
