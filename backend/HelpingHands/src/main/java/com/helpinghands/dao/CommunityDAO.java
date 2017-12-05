package com.helpinghands.dao;

import com.helpinghands.core.community.Community;
import com.helpinghands.core.community.CommunityProfile;
import com.helpinghands.core.mapper.community.CommunityMapper;
import com.helpinghands.core.mapper.community.CommunityProfileMapper;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;

import java.util.List;

public interface CommunityDAO {
    @SqlQuery("SELECT c.community_id, c.name, c.description, c.is_verified, c.create_date, c.ban_status " +
            "FROM Communities AS c " +
            "JOIN Members AS m ON c.community_id = m.community_id " +
            "WHERE m.user_id = :userId")
    @Mapper(CommunityMapper.class)
    List<Community> getFollowedCommunities(@Bind("userId") int userId);

    @SqlQuery("SELECT community_id, name, description, " +
            "(SELECT COUNT(*) FROM Members WHERE community_id = :communityId) AS follower_count, " +
            "(SELECT COUNT(*) FROM PostsToCommunities WHERE community_id = :communityId) AS post_count," +
            "FALSE AS is_following " +
            "FROM Communities " +
            "WHERE community_id = :communityId")
    @Mapper(CommunityProfileMapper.class)
    CommunityProfile getCommunityProfile(@Bind("communityId") int communityId);

    @SqlQuery("SELECT community_id, name, description, " +
            "(SELECT COUNT(*) FROM Members WHERE community_id = :communityId) AS follower_count, " +
            "(SELECT COUNT(*) FROM PostsToCommunities WHERE community_id = :communityId) AS post_count," +
            "EXISTS(SELECT 1 FROM Members WHERE user_id = :authId AND community_id = :communityId) AS is_following " +
            "FROM Communities " +
            "WHERE community_id = :communityId")
    @Mapper(CommunityProfileMapper.class)
    CommunityProfile getCommunityProfileWithAuth(@Bind("authId") int authId, @Bind("communityId") int communityId);

    @SqlUpdate("INSERT INTO Members (user_id, community_id) " +
            "VALUES (:userId, :communityId) " +
            "ON CONFLICT DO NOTHING")
    void followCommunity(@Bind("userId") int userId, @Bind("communityId") int communityId);

    @SqlUpdate("DELETE FROM Members WHERE user_id = :userId AND community_id = :communityId")
    void unfollowCommunity(@Bind("userId") int userId, @Bind("communityId") int communityId);

    @SqlQuery("SELECT c.community_id, c.name, c.description, c.is_verified, c.create_date, c.ban_status " +
            "FROM Communities AS c " +
            "WHERE lower(c.name) LIKE :query OR lower(c.description) LIKE :query")
    @Mapper(CommunityMapper.class)
    List<Community> searchCommunities(@Bind("query") String query);
}
