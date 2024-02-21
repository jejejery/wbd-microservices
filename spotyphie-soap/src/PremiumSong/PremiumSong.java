package PremiumSong;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table (name="PremiumSong")
public class PremiumSong {
    // Model class for premium songs
    @Id
    @GenericGenerator(name="gen",strategy="increment")
    @GeneratedValue(generator="gen")
    @Column(name="song_id")
    private int song_id;
    @Column(name="title")
    private String title;
    @Column(name="artist")
    private String artist;

    @Column(name="genre")
    private String genre;

    @Column(name="audio")
    private String audio;

    @Column(name="picture")
    private String picture;

    @Column(name="price")
    private int price;

    public PremiumSong() {}

    public PremiumSong(int song_id, String title, String artist, String genre, String audio, String picture, int price) {
        this.song_id = song_id;
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.audio = audio;
        this.picture = picture;
        this.price = price;
    }

    public PremiumSong(String title, String artist, String genre, String audio, String picture, int price) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.audio = audio;
        this.picture = picture;
        this.price = price;
    }

    public int getSong_id() {
        return song_id;
    }

    public void setSong_id(int song_id) {
        this.song_id = song_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getAudio() {
        return audio;
    }

    public void setAudio(String audio) {
        this.audio = audio;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}