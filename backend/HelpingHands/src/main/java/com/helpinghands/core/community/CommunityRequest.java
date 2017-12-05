package com.helpinghands.core.community;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class CommunityRequest {
    @NotNull
    @JsonProperty
    private String name;

    @NotNull
    @JsonProperty
    private String description;

    public CommunityRequest() {
        // Jackson deserialization
    }

    public CommunityRequest(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
