package com.helpinghands.core.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.helpinghands.core.BanStatus;

import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Timestamp;

/**
 * Represents a user.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
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

    @NotNull
    @JsonProperty
    private String email;

    @NotNull
    @JsonProperty
    private Date birth_date;

    @JsonProperty
    private String location;

    @JsonProperty
    private String profileImagePath;

    @JsonProperty
    private String bio;

    @NotNull
    @JsonProperty
    private Integer reputationPoints;

    @NotNull
    @JsonProperty
    private boolean administrator;

    @NotNull
    @JsonProperty
    private BanStatus banStatus;

    @NotNull
    @JsonProperty
    private Timestamp createDate;

    @NotNull
    @JsonProperty
    private Timestamp updateDate;

    public User() {
        // Jackson deserialization
    }

    public User(int id,
                String username,
                String firstName,
                String lastName,
                String email,
                Date birth_date,
                String location,
                String profileImagePath,
                String bio,
                Integer reputationPoints,
                boolean administrator,
                BanStatus banStatus,
                Timestamp createDate,
                Timestamp updateDate) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birth_date = birth_date;
        this.location = location;
        this.profileImagePath = profileImagePath;
        this.bio = bio;
        this.reputationPoints = reputationPoints;
        this.administrator = administrator;
        this.banStatus = banStatus;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Integer getId() {
        return id;
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

    public String getEmail() {
        return email;
    }

    public Date getBirth_date() {
        return birth_date;
    }

    public String getLocation() {
        return location;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public String getBio() {
        return bio;
    }

    public Integer getReputationPoints() {
        return reputationPoints;
    }

    public boolean isAdministrator() {
        return administrator;
    }

    public BanStatus getBanStatus() {
        return banStatus;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public Timestamp getUpdateDate() {
        return updateDate;
    }

}
