package com.helpinghands.core.search;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.helpinghands.core.community.Community;
import com.helpinghands.core.post.PostCard;
import com.helpinghands.core.user.User;

import javax.validation.constraints.NotNull;
import java.util.List;

public class SearchResults {
    @NotNull
    @JsonProperty
    private List<User> users;

    @NotNull
    @JsonProperty
    private List<Community> communities;

    @NotNull
    @JsonProperty
    private List<PostCard> posts;

    public SearchResults() {
        // Jackson deserialization
    }

    public SearchResults(List<User> users, List<Community> communities, List<PostCard> posts) {
        this.users = users;
        this.communities = communities;
        this.posts = posts;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Community> getCommunities() {
        return communities;
    }

    public List<PostCard> getPosts() {
        return posts;
    }
}
