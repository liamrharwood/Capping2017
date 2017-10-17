package com.helpinghands.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class User {

    @NotNull
    @JsonProperty
    private Integer id;

    @NotNull
    @JsonProperty
    private String firstName;

    public User() {
        // Jackson deserialization
    }

    public User(int id, String firstName) {
        this.id = id;
        this.firstName = firstName;
    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

}
