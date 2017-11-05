package com.helpinghands.dao;

import com.helpinghands.core.community.CommunityProfile;
import com.helpinghands.core.mapper.community.CommunityProfileMapper;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;

public interface CommunityDAO {
    @SqlQuery("SELECT community_id, name, description, " +
            "(SELECT COUNT(*) FROM Members WHERE community_id = :communityId) AS follower_count, " +
            "(SELECT COUNT(*) FROM PostsToCommunities WHERE community_id = :communityId) AS post_count " +
            "FROM Communities " +
            "WHERE community_id = :communityId")
    @Mapper(CommunityProfileMapper.class)
    CommunityProfile getCommunityProfile(@Bind("communityId") int communityId);
}
