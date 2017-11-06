package com.helpinghands.dao;

import com.helpinghands.core.community.Community;
import com.helpinghands.core.community.CommunityProfile;
import com.helpinghands.core.mapper.community.CommunityMapper;
import com.helpinghands.core.mapper.community.CommunityProfileMapper;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
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
            "(SELECT COUNT(*) FROM PostsToCommunities WHERE community_id = :communityId) AS post_count " +
            "FROM Communities " +
            "WHERE community_id = :communityId")
    @Mapper(CommunityProfileMapper.class)
    CommunityProfile getCommunityProfile(@Bind("communityId") int communityId);
}
