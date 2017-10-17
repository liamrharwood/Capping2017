package com.helpinghands.dao;

import com.helpinghands.core.user.User;
import com.helpinghands.core.mapper.UserMapper;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.List;

@RegisterMapper(UserMapper.class)
public interface UserDAO {
    String SELECT_FIELDS = "user_id, username, first_name, last_name, email, birth_date, " +
            "location, profile_image_path, bio, reputation_points, is_administrator, ban_status, create_date, update_date";

    @SqlQuery("SELECT " + SELECT_FIELDS + " FROM Users")
    List<User> getAllUsers();

}
