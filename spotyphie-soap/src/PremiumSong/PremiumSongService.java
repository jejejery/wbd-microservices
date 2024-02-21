package PremiumSong;

import javax.jws.WebMethod;
import javax.jws.WebService;
import java.util.List;

@WebService
public interface PremiumSongService {
    @WebMethod
    String getPremiumSong(int song_id);

    @WebMethod
    String getSomePremiumSong(int n);

    @WebMethod
    String getPremiumSongPage(int page, int page_size);

    public String getPremiumSongPageByID(int id, int pageSize);

    @WebMethod
    String searchPremiumSong(String title);

    @WebMethod
    String getAllPremiumSongs();

    @WebMethod
    String updatePremiumSong(int song_id, String title, String artist, String genre, String audio, String picture, int price);

    @WebMethod
    String deletePremiumSong(int song_id);

    @WebMethod
    String addPremiumSong(String title, String artist, String genre, String audio, String picture, int price);
}
