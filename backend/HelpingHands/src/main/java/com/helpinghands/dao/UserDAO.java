package com.helpinghands.dao;

import com.helpinghands.core.User;
import com.helpinghands.core.mapper.UserMapper;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.customizers.RegisterMapper;

import java.util.List;

@RegisterMapper(UserMapper.class)
public interface UserDAO {
    @SqlQuery("SELECT user_id, first_name FROM Users")
    List<User> getAllUsers();

}
