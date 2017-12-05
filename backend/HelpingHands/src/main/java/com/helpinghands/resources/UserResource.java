package com.helpinghands.resources;

import com.helpinghands.auth.LoginObject;
import com.helpinghands.auth.PasswordEncryption;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.user.User;
import com.helpinghands.core.user.UserProfile;
import com.helpinghands.core.user.UserRegistration;
import com.helpinghands.core.user.UserSettings;
import com.helpinghands.dao.UserDAO;
import io.dropwizard.auth.Auth;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    public UserProfile getProfile(@Auth Optional<UserPrincipal> userPrincipal,
                                  @QueryParam("user_id") Optional<Integer> userId) {
        if (userId.isPresent()) {
            if (userPrincipal.isPresent()) {
                int id = userDAO.getUserByUsername(userPrincipal.get().getName()).getId();
                return userDAO.getUserProfileWithAuth(id, userId.get());
            }
            return userDAO.getUserProfile(userId.get());
        }
        if (userPrincipal.isPresent()) {
            int id = userDAO.getUserByUsername(userPrincipal.get().getName()).getId();
            return userDAO.getUserProfile(id);
        } else {
            throw new BadRequestException();
        }
    }

    @PUT
    @Path("follow")
    public void followUser(@Auth UserPrincipal userPrincipal,
                           @QueryParam("user_id") int followeeId) {
        int followerId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        if (followeeId == followerId) {
            throw new WebApplicationException("You cannot follow yourself", 400);
        }
        userDAO.followUser(followerId, followeeId);
    }

    @PUT
    @Path("unfollow")
    public void unfollowUser(@Auth UserPrincipal userPrincipal,
                             @QueryParam("user_id") int followeeId) {
        int followerId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        if (followeeId == followerId) {
            throw new WebApplicationException("You cannot unfollow yourself", 400);
        }
        userDAO.unfollowUser(followerId, followeeId);
    }

    @POST
    @Path("images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void uploadImage(@Auth UserPrincipal userPrincipal,
                                @FormDataParam("file") InputStream fileInputStream,
                                @FormDataParam("fileName") String fileName) {
        UUID uuid = UUID.randomUUID();
        String newFileName = uuid.toString() + "-" + System.currentTimeMillis() + "-" + fileName;

        java.nio.file.Path outputPath = FileSystems.getDefault().getPath("/var/www/html/images", newFileName);
        try {
            Files.copy(fileInputStream, outputPath);
        } catch (IOException ex) {
            throw new WebApplicationException(ex.getMessage(), 500);
        }

        userDAO.updateImagePathForUser(userPrincipal.getId(), newFileName);
    }

    @POST
    @Path("register")
    public void registerNewUser(UserRegistration userRegistration) {
        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String passwordHash = passwordEncryption.hash(userRegistration.getPassword().toCharArray());

        Optional<User> user = Optional.ofNullable(userDAO.getUserByUsername(userRegistration.getUsername()));
        if (user.isPresent()) {
            throw new WebApplicationException("Username taken.", 400);
        }

        userDAO.insertNewUser(
                userRegistration.getUsername(),
                passwordHash,
                userRegistration.getFirstName(),
                userRegistration.getLastName(),
                userRegistration.getEmail(),
                userRegistration.getBirthDate());
    }

    @PUT
    @Path("settings")
    public void updateUserSettings(@Auth UserPrincipal userPrincipal,
                                   UserSettings userSettings) {
        if (!userPrincipal.getName().equals(userSettings.getUsername())) {
            Optional<User> user = Optional.ofNullable(userDAO.getUserByUsername(userSettings.getUsername()));
            if (user.isPresent()) {
                throw new WebApplicationException("Username taken.", 400);
            }
        }

        userDAO.updateUserSettings(userPrincipal.getId(),
                userSettings.getUsername(),
                userSettings.getFirstName(),
                userSettings.getLastName(),
                userSettings.getEmail(),
                userSettings.getBio());
    }

    @PUT
    @Path("settings/password")
    @Consumes(MediaType.TEXT_PLAIN)
    public void updateUserSettings(@Auth UserPrincipal userPrincipal,
                                   String newPassword) {
        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String passwordHash = passwordEncryption.hash(newPassword.toCharArray());

        userDAO.changePassword(userPrincipal.getId(), passwordHash);
    }

    @POST
    @Path("login")
    public LoginObject login(@Auth UserPrincipal userPrincipal) {
        UUID uuid = UUID.randomUUID();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String unencryptedToken = uuid.toString() + "|" + timestamp.toString();
        String accessToken = passwordEncryption.hash(unencryptedToken.toCharArray());

        userDAO.updateAccessTokenForUser(userPrincipal.getId(), accessToken, timestamp);

        return new LoginObject(userPrincipal.getName(), accessToken, userPrincipal.getId());
    }

    @POST
    @Path("logout")
    public void logout(@Auth UserPrincipal userPrincipal) {
        userDAO.updateAccessTokenForUser(userPrincipal.getId(), null, null);
    }

}
