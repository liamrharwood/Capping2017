package com.helpinghands.dao;

import com.helpinghands.core.comment.Comment;
import com.helpinghands.core.mapper.comment.CommentMapper;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;

import java.util.List;

public interface CommentDAO {
    @SqlQuery("SELECT c.comment_id, c.user_id, u.username, c.post_id, c.body_text, c.create_date " +
            "FROM Comments AS c " +
            "JOIN Users AS u ON c.user_id = u.user_id " +
            "WHERE c.post_id = :postId")
    @Mapper(CommentMapper.class)
    List<Comment> getCommentsForPost(@Bind("postId") int postId);
}
