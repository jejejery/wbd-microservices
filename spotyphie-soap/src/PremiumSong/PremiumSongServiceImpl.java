package PremiumSong;

import javax.jws.HandlerChain;
import javax.jws.WebMethod;
import javax.jws.WebService;
import java.util.List;

@WebService(targetNamespace = "PremiumSongService")
@HandlerChain(file = "handler-chain.xml")
public class PremiumSongServiceImpl implements PremiumSongService {
    private PremiumSongDatabase premiumSongDatabaseImpl;
    public PremiumSongServiceImpl() {
        this.premiumSongDatabaseImpl = new PremiumSongDatabase();
    }
    @WebMethod
    public String getPremiumSong(int song_id) {
        PremiumSong ps = this.premiumSongDatabaseImpl.getPremiumSong(song_id);
        if (ps != null) {
            int songID = ps.getSong_id();
            String title = ps.getTitle();
            String artist = ps.getArtist();
            String genre = ps.getGenre();
            String audio = ps.getAudio();
            String picture = ps.getPicture();
            int price = ps.getPrice();

            return "{\"song_id\":" + songID
                    + ",\"title\":\"" + title
                    + "\",\"artist\":\"" + artist
                    + "\",\"genre\":\"" + genre
                    + "\",\"audio\":\"" + audio
                    + "\",\"picture\":\"" + picture
                    + "\",\"price\":" + price
                    + "}";
        } else {
            return "";
        }
    }

    @WebMethod
    public String searchPremiumSong(String title){
        List<PremiumSong> psList = this.premiumSongDatabaseImpl.searchPremiumSong(title);

        StringBuilder sb = new StringBuilder("[");

        for (PremiumSong ps : psList) {
            int songID = ps.getSong_id();
            String title1 = ps.getTitle();
            String artist = ps.getArtist();
            String genre = ps.getGenre();
            String audio = ps.getAudio();
            String picture = ps.getPicture();
            int price = ps.getPrice();

            sb.append("{\"song_id\":").append(songID)
                    .append(",\"title\":\"").append(title1)
                    .append("\",\"artist\":\"").append(artist)
                    .append("\",\"genre\":\"").append(genre)
                    .append("\",\"audio\":\"").append(audio)
                    .append("\",\"picture\":\"").append(picture)
                    .append("\",\"price\":").append(price)
                    .append("},");
        }

        if (sb.length() > 1) {
            sb.deleteCharAt(sb.length() - 1);
        }

        sb.append("]");
        return sb.toString();
    }

    @WebMethod
    public String getSomePremiumSong(int n){
        List<PremiumSong> psList = this.premiumSongDatabaseImpl.getSomePremiumSongs(n);

        StringBuilder sb = new StringBuilder("[");
        for (PremiumSong ps : psList) {
            int songID = ps.getSong_id();
            String title = ps.getTitle();
            String artist = ps.getArtist();
            String genre = ps.getGenre();
            String audio = ps.getAudio();
            String picture = ps.getPicture();
            int price = ps.getPrice();

            sb.append("{\"song_id\":").append(songID)
                    .append(",\"title\":\"").append(title)
                    .append("\",\"artist\":\"").append(artist)
                    .append("\",\"genre\":\"").append(genre)
                    .append("\",\"audio\":\"").append(audio)
                    .append("\",\"picture\":\"").append(picture)
                    .append("\",\"price\":").append(price)
                    .append("},");
        }

        if (sb.length() > 1) {
            sb.deleteCharAt(sb.length() - 1);
        }

        sb.append("]");
        return sb.toString();
    }

    @WebMethod
    public String getPremiumSongPage(int page, int page_size){
        List<PremiumSong> psList = this.premiumSongDatabaseImpl.getPremiumSongPage(page, page_size);

        StringBuilder sb = new StringBuilder("[");
        for (PremiumSong ps : psList) {
            int songID = ps.getSong_id();
            String title = ps.getTitle();
            String artist = ps.getArtist();
            String genre = ps.getGenre();
            String audio = ps.getAudio();
            String picture = ps.getPicture();
            int price = ps.getPrice();

            sb.append("{\"song_id\":").append(songID)
                    .append(",\"title\":\"").append(title)
                    .append("\",\"artist\":\"").append(artist)
                    .append("\",\"genre\":\"").append(genre)
                    .append("\",\"audio\":\"").append(audio)
                    .append("\",\"picture\":\"").append(picture)
                    .append("\",\"price\":").append(price)
                    .append("},");
        }

        if (sb.length() > 1) {
            sb.deleteCharAt(sb.length() - 1);
        }

        sb.append("]");
        return sb.toString();
    }

    public String getPremiumSongPageByID(int id, int pageSize) {
        List<PremiumSong> psList = this.premiumSongDatabaseImpl.getPremiumSongPageByID(id, pageSize);

        StringBuilder sb = new StringBuilder("[");
        for (PremiumSong ps : psList) {
            int songID = ps.getSong_id();
            String title = ps.getTitle();
            String artist = ps.getArtist();
            String genre = ps.getGenre();
            String audio = ps.getAudio();
            String picture = ps.getPicture();
            int price = ps.getPrice();

            sb.append("{\"song_id\":").append(songID)
                    .append(",\"title\":\"").append(title)
                    .append("\",\"artist\":\"").append(artist)
                    .append("\",\"genre\":\"").append(genre)
                    .append("\",\"audio\":\"").append(audio)
                    .append("\",\"picture\":\"").append(picture)
                    .append("\",\"price\":").append(price)
                    .append("},");
        }

        if (sb.length() > 1) {
            sb.deleteCharAt(sb.length() - 1);
        }

        sb.append("]");
        return sb.toString();
    }

    @WebMethod
    public String getAllPremiumSongs() {
        return ""; }
    @WebMethod
    public String updatePremiumSong(int song_id, String title, String artist, String genre, String audio, String picture, int price) {
        return "";
    }

    @WebMethod
    public String deletePremiumSong(int song_id) {
        return "";
    }

    @WebMethod
    public String addPremiumSong(String title, String artist, String genre, String audio, String picture, int price) {
        return "";
    }
}
