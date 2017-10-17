package com.helpinghands.resources;

import com.helpinghands.core.user.User;
import com.helpinghands.dao.UserDAO;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    UserDAO userDAO;

    public UserResource(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GET
    public List<User> getAll() {
        return userDAO.getAllUsers();
    }

    @POST
    public User registerNewUser() {
        return null;
    }

}
