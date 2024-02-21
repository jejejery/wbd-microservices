package PremiumSong;

import org.hibernate.Session;
import DBSession.DBSession;
import org.hibernate.query.Query;

import java.util.ArrayList;
import java.util.List;

public class PremiumSongDatabase {
    private final Session session;
    public PremiumSongDatabase() {
        this.session = DBSession.getSession();
    }
    public PremiumSong getPremiumSong(int song_id) {
        try {
            session.beginTransaction();
            PremiumSong ps = session.get(PremiumSong.class, song_id);
            session.getTransaction().commit();
            return ps;
        } catch(Exception e) {
            System.out.println(e.getMessage() + "\n" + e.getCause());
            return null;
        }
    }

    public List<PremiumSong> searchPremiumSong(String title) {
        try {
            session.beginTransaction();
            List<PremiumSong> ps = session.createQuery("SELECT a FROM PremiumSong a WHERE LOWER(a.title) LIKE LOWER(:title)", PremiumSong.class)
                    .setParameter("title", "%" + title + "%")
                    .getResultList();
            session.getTransaction().commit();
            return ps;
        } catch (Exception e) {
            System.out.println(e.getMessage() + "\n" + e.getCause());
            return null;
        }
    }

    public List<PremiumSong> getAllPremiumSongs() {
        return session.createQuery("SELECT a FROM PremiumSong a", PremiumSong.class).getResultList();
    }
    public List<PremiumSong> getSomePremiumSongs(int n) {
        return session.createQuery("SELECT a FROM PremiumSong a ORDER BY RAND()", PremiumSong.class)
                .setMaxResults(n)
                .getResultList();
    }

    private int getLastPageNum(int pageSize) {
        // Ambil angka page terakhir dari database lagu
        System.out.println("Counting page");
        String countQ = "SELECT COUNT (ps.song_id) FROM PremiumSong ps";
        Query<Long> countQuery = session.createQuery(countQ, Long.class);
        Long countResults = countQuery.uniqueResult();
        return (int) (Math.ceil((double) countResults / pageSize));
    }

    public List<PremiumSong> getPremiumSongPage(int page, int pageSize) {
        int lastPageNumber = getLastPageNum(pageSize);
        System.out.println("Page count succeed");
        List<PremiumSong> premSongList = new ArrayList<>();
        if (page <= lastPageNumber) {
            // Jika angka page <= page terakhir, ambil daftar lagu
            Query<PremiumSong> query = session.createQuery("FROM PremiumSong", PremiumSong.class);
            query.setFirstResult((page-1)*pageSize);
            query.setMaxResults(pageSize);
            premSongList = query.list();
        }
        return premSongList;
    }

    public List<PremiumSong> getPremiumSongPageByID(int id, int pageSize) {
        // Cari page yang berisi song dengan id yang diminta
        int lastPageNumber = getLastPageNum(pageSize);
        for (int i=1; i<=lastPageNumber; i++) {
            List<PremiumSong> psList = this.getPremiumSongPage(i, pageSize);
            for (PremiumSong ps: psList) {
                if (ps.getSong_id() == id) { // Jika song ditemukan, kirim list ini
                    return psList;
                }
            }
        }
        return new ArrayList<>();
    }

    public PremiumSong updatePremiumSong(int song_id, String title, String artist, String genre, String audio, String picture, int price) {
        PremiumSong prevPremSong = getPremiumSong(song_id);
        session.beginTransaction();
        prevPremSong.setTitle(title);
        prevPremSong.setArtist(artist);
        prevPremSong.setGenre(genre);
        prevPremSong.setAudio(audio);
        prevPremSong.setPicture(picture);
        prevPremSong.setPrice(price);
        session.getTransaction().commit();
        return prevPremSong;
    }

    public boolean deletePremiumSong(int song_id) {
        session.beginTransaction();
        PremiumSong ps = session.find(PremiumSong.class, song_id);
        if (ps != null) {
            session.remove(ps);
            session.getTransaction().commit();
            return true;
        } else {
            return false;
        }
    }

    public PremiumSong addPremiumSong(String title, String artist, String genre, String audio, String picture, int price) {
        try {
            session.beginTransaction();
            PremiumSong newPremSong = new PremiumSong(title,artist,genre,audio,picture,price);
            session.persist(newPremSong);
            session.getTransaction().commit();
            return newPremSong;
        } catch(Exception e) {
            System.out.println(e.getMessage() + " " + e.getCause());
            return null;
        }
    }
}
