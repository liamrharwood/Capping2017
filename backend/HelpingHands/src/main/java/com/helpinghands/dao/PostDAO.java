package com.helpinghands.dao;

import com.helpinghands.core.mapper.post.PostCardMapper;
import com.helpinghands.core.post.Post;
import com.helpinghands.core.post.PostCard;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.List;

@RegisterMapper(PostCardMapper.class)
public interface PostDAO {
    String CARD_SELECT_FIELDS = "p.post_id, p.user_id, u.username, p.upvotes, p.downvotes, " +
            "p.body_text, p.post_title, p.create_date, p.is_complete";

    @SqlQuery("SELECT " + CARD_SELECT_FIELDS + " FROM Posts AS p " +
            "JOIN Users AS u ON p.user_id = u.user_id")
    List<PostCard> getAllPosts();
}
