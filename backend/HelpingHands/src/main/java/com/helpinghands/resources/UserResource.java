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
import io.dropwizard.util.Size;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.imageio.ImageIO;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


/**
 * API endpoints dealing with users. All paths begin with /users.
 *
 * @author Helping Hands
 * @author hh.reev.us
 */
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

    /*
        Handles getting your own profile and also other people's profiles, depending on if you are auth'd and if
        a user id is supplied or not.
     */
    @GET
    @Path("profile")
    public UserProfile getProfile(@Auth Optional<UserPrincipal> userPrincipal,
                                  @QueryParam("user_id") Optional<Integer> userId) {
        if (userId.isPresent()) {
            if (userPrincipal.isPresent()) {
                int id = userPrincipal.get().getId();
                return userDAO.getUserProfileWithAuth(id, userId.get());
            }
            return userDAO.getUserProfile(userId.get());
        }
        if (userPrincipal.isPresent()) {
            int id = userPrincipal.get().getId();
            return userDAO.getUserProfileWithEmail(id);
        } else {
            throw new BadRequestException();
        }
    }

    @PUT
    @Path("follow")
    public void followUser(@Auth UserPrincipal userPrincipal,
                           @QueryParam("user_id") int followeeId) {
        int followerId = userPrincipal.getId();
        if (followeeId == followerId) {
            throw new WebApplicationException("You cannot follow yourself", 400);
        }
        userDAO.followUser(followerId, followeeId);
    }

    @PUT
    @Path("unfollow")
    public void unfollowUser(@Auth UserPrincipal userPrincipal,
                             @QueryParam("user_id") int followeeId) {
        int followerId = userPrincipal.getId();
        if (followeeId == followerId) {
            throw new WebApplicationException("You cannot unfollow yourself", 400);
        }
        userDAO.unfollowUser(followerId, followeeId);
    }

    /*
        Endpoint for uploading profile pictures. Images are checked to see if they are valid profile pictures before
        saving to the server. The save location is always /images.
     */
    @POST
    @Path("images")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void uploadImage(@Auth UserPrincipal userPrincipal,
                            @FormDataParam("file") InputStream fileInputStream,
                            @FormDataParam("fileName") String fileName,
                            @HeaderParam("Content-Length") int contentLength) throws IOException {
        // Get the image, make sure it is square and less than 5MB
        BufferedImage bufferedImage = ImageIO.read(fileInputStream);
        if (bufferedImage.getWidth() != bufferedImage.getHeight() || contentLength > Size.megabytes(5).toBytes()) {
            throw new WebApplicationException("Image does not meet specified requirements.", 400);
        }

        // Generate a random filename
        UUID uuid = UUID.randomUUID();
        String newFileName = uuid.toString() + "-" + System.currentTimeMillis() + "-" + fileName;

        try {
            // Attempt to save image
            File outputfile = new File("/var/www/html/images/" + newFileName);
            ImageIO.write(bufferedImage, "png", outputfile);
        } catch (IOException ex) {
            throw new WebApplicationException("Unable to save file", 500);
        }

        userDAO.updateImagePathForUser(userPrincipal.getId(), newFileName);
    }

    @POST
    @Path("register")
    public void registerNewUser(UserRegistration userRegistration) {
        // Hash password for storage
        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String passwordHash = passwordEncryption.hash(userRegistration.getPassword().toCharArray());

        // Check if username is taken
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
            // Check if username is taken
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
    public void updateUserPassword(@Auth UserPrincipal userPrincipal,
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

        // Create a random token and hash it for storage and for use in the client
        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String unencryptedToken = uuid.toString() + "|" + timestamp.toString();
        String accessToken = passwordEncryption.hash(unencryptedToken.toCharArray());

        userDAO.updateAccessTokenForUser(userPrincipal.getId(), accessToken, timestamp);

        // Give the client back the token with user info
        return new LoginObject(userPrincipal.getName(), accessToken, userPrincipal.getId());
    }

    @POST
    @Path("logout")
    public void logout(@Auth UserPrincipal userPrincipal) {
        // Clear the access token so there is no longer a valid one
        userDAO.updateAccessTokenForUser(userPrincipal.getId(), null, null);
    }

}
