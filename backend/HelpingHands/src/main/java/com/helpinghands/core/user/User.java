package com.helpinghands.core.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class User {

    @NotNull
    @JsonProperty
    private Integer id;

    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private String firstName;

    @NotNull
    @JsonProperty
    private String lastName;

    public User() {
        // Jackson deserialization
    }

    public User(int id, String username, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;

    }

    public Integer getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

}
