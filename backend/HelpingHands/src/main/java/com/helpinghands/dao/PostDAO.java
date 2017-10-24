package com.helpinghands.dao;

import com.helpinghands.core.mapper.post.PostMapper;
import com.helpinghands.core.post.Post;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.List;

@RegisterMapper(PostMapper.class)
public interface PostDAO {
    String SELECT_FIELDS = "post_id, user_id, upvotes, downvotes, body_text, post_title, " +
            "post_image_path, create_date, is_complete";

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Posts")
    List<Post> getAllPosts();
}
