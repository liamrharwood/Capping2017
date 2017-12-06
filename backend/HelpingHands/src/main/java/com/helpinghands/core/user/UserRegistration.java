package com.helpinghands.core.user;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.sql.Date;

/**
 * De-serialized JSON object used for creating users.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class UserRegistration {
    @NotNull
    @JsonProperty
    private String username;

    @NotNull
    @JsonProperty
    private String password;

    @NotNull
    @JsonProperty
    private String firstName;

    @NotNull
    @JsonProperty
    private String lastName;

    @NotNull
    @JsonProperty
    private String email;

    @NotNull
    @JsonProperty
    private Date birthDate;

    public UserRegistration() {
        // Jackson deserialization
    }

    public UserRegistration(String username,
                            String password,
                            String firstName,
                            String lastName,
                            String email,
                            Date birthDate) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Date getBirthDate() {
        return birthDate;
    }
}
