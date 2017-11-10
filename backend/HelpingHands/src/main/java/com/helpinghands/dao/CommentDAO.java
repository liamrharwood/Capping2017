package com.helpinghands.dao;

import com.helpinghands.core.comment.Comment;
import com.helpinghands.core.mapper.comment.CommentMapper;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;
import org.skife.jdbi.v2.sqlobject.customizers.Mapper;

import java.util.List;

public interface CommentDAO {
    @SqlQuery("SELECT c.comment_id, c.user_id, u.username, c.post_id, c.body_text, c.create_date " +
            "FROM Comments AS c " +
            "JOIN Users AS u ON c.user_id = u.user_id " +
            "WHERE c.post_id = :postId " +
            "ORDER BY create_date DESC")
    @Mapper(CommentMapper.class)
    List<Comment> getCommentsForPost(@Bind("postId") int postId);

    @SqlUpdate("INSERT INTO Comments (user_id, post_id, body_text) " +
            "VALUES (:userId, :postId, :bodyText)")
    void insertComment(@Bind("userId") int userId, @Bind("postId") int postId, @Bind("bodyText") String bodyText);
}
