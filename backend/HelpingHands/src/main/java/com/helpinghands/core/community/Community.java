package com.helpinghands.core.community;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.helpinghands.core.BanStatus;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Represents a community or religion.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
public class Community {
    @NotNull
    @JsonProperty
    private Integer communityId;

    @NotNull
    @JsonProperty
    private String name;

    @NotNull
    @JsonProperty
    private String description;

    @NotNull
    @JsonProperty
    private boolean verified;

    @NotNull
    @JsonProperty
    private Timestamp createDate;

    @NotNull
    @JsonProperty
    private BanStatus banStatus;

    public Community() {
        // Jackson deserialization
    }

    public Community(Integer communityId, String name, String description, boolean verified, Timestamp createDate, BanStatus banStatus) {
        this.communityId = communityId;
        this.name = name;
        this.description = description;
        this.verified = verified;
        this.createDate = createDate;
        this.banStatus = banStatus;
    }

    public Integer getCommunityId() {
        return communityId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isVerified() {
        return verified;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public BanStatus getBanStatus() {
        return banStatus;
    }
}
