package com.helpinghands.resources;

import com.helpinghands.auth.PasswordEncryption;
import com.helpinghands.auth.UserPrincipal;
import com.helpinghands.core.user.User;
import com.helpinghands.core.user.UserProfile;
import com.helpinghands.core.user.UserRegistration;
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
            throw new BadRequestException();
        }
        userDAO.followUser(followerId, followeeId);
    }

    @PUT
    @Path("unfollow")
    public void unfollowUser(@Auth UserPrincipal userPrincipal,
                             @QueryParam("user_id") int followeeId) {
        int followerId = userDAO.getUserByUsername(userPrincipal.getName()).getId();
        if (followeeId == followerId) {
            throw new BadRequestException();
        }
        userDAO.unfollowUser(followerId, followeeId);
    }

    @POST
    @Path("images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadImage(@Auth UserPrincipal userPrincipal,
                                @FormDataParam("file") InputStream fileInputStream,
                                @FormDataParam("fileName") String fileName) throws IOException {
        UUID uuid = UUID.randomUUID();
        String newFileName = uuid.toString() + "-" + System.currentTimeMillis() + "-" + fileName;

        java.nio.file.Path outputPath = FileSystems.getDefault().getPath("/var/www/html/images", newFileName);
        Files.copy(fileInputStream, outputPath);

        userDAO.updateImagePathForUser(userPrincipal.getId(), newFileName);

        return Response.ok().build();
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
            return "SUCCESS";
        } catch (Exception ex) {
            return ex.toString();
        }
    }

    @POST
    @Path("login")
    public String login(@Auth UserPrincipal userPrincipal) {
        UUID uuid = UUID.randomUUID();
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String unencryptedToken = uuid.toString() + "|" + timestamp.toString();
        String accessToken = passwordEncryption.hash(unencryptedToken.toCharArray());

        userDAO.updateAccessTokenForUser(userPrincipal.getId(), accessToken, timestamp);

        return accessToken;
    }

    @POST
    @Path("logout")
    public void logout(@Auth UserPrincipal userPrincipal) {
        userDAO.updateAccessTokenForUser(userPrincipal.getId(), null, null);
    }

}
