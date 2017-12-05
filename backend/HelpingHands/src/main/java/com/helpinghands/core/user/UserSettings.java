package com.helpinghands.core.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;

public class UserSettings {
    @NotNull
    @JsonProperty
    private String firstName;

    @NotNull
    @JsonProperty
    private String lastName;

    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private String email;

    @NotNull
    @JsonProperty
    private String bio;

    public UserSettings() {
        // Jackson deserialization
    }

    public UserSettings(String firstName, String lastName, String username, String email, String bio) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.bio = bio;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getBio() {
        return bio;
    }
}
