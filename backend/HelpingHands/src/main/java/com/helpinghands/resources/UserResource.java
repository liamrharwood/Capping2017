package com.helpinghands.resources;

import com.helpinghands.auth.PasswordEncryption;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.user.User;
import com.helpinghands.core.user.UserProfile;
import com.helpinghands.core.user.UserRegistration;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.Auth;
import org.slf4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.security.Principal;
import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    private UserDAO userDAO;

    public UserResource(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @GET
    public List<User> getAll() {
        List<User> users = userDAO.getAllUsers();
        return users;
    }

    @GET
    @Path("profile")
    public UserProfile getProfile(@Auth UserPrincipal userPrincipal) {
        User user = userDAO.getUserByUsername(userPrincipal.getName());
        return new UserProfile(user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                userDAO.getFollowersCountForUser(user.getId()),
                userDAO.getFollowedCommunitiesCountForUser(user.getId()),
                userDAO.getFollowedCountForUser(user.getId()),
                user.getBio(),
                user.getProfileImagePath(),
                userDAO.getPostCountForUser(user.getId()));
    }

    @POST
    @Path("register")
    public String registerNewUser(UserRegistration userRegistration) {
        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String passwordHash = passwordEncryption.hash(userRegistration.getPassword().toCharArray());

        try {
            userDAO.insertNewUser(
                    userRegistration.getUsername(),
                    passwordHash,
                    userRegistration.getFirstName(),
                    userRegistration.getLastName(),
                    userRegistration.getEmail(),
                    userRegistration.getBirthDate());
            return "";
        } catch (Exception ex) {
            return ex.toString();
        }
    }

}
