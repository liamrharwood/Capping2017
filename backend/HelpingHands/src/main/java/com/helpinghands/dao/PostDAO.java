package com.helpinghands.dao;

import com.helpinghands.core.mapper.post.PostMapper;
import com.helpinghands.core.post.Post;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.List;

@RegisterMapper(PostMapper.class)
public interface PostDAO {
    String SELECT_FIELDS = "p.post_id, p.user_id, p.upvotes, p.downvotes, p.body_text, p.post_title, " +
            "p.post_image_path, p.create_date, p.is_complete";

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Posts AS p")
    List<Post> getAllPosts();

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Posts AS p " +
            "JOIN Follows AS f ON f.followee_id = p.user_id " +
            "JOIN Users   AS u ON u.user_id     = f.follower_id " +
            "WHERE u.username = :username")
    List<Post> getFollowedPosts(@Bind("username") String username);
}
