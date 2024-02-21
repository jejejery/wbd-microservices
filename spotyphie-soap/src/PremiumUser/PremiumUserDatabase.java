package PremiumUser;

import org.hibernate.Session;
import DBSession.DBSession;

import java.sql.Date;
import java.util.List;

public class PremiumUserDatabase {
    private final Session session;
    public PremiumUserDatabase() {
        this.session = DBSession.getSession();
    }
    public PremiumUser getPremiumUser(int id) {
        try {
            session.beginTransaction();
            PremiumUser pu = session.get(PremiumUser.class, id);
            session.getTransaction().commit();
            return pu;
        } catch(Exception e) {
            System.out.println(e.getMessage() + "\n" + e.getCause());
            return null;
        }
    }

    public List<PremiumUser> getAllPremiumUsers() {
        return session.createQuery("SELECT a FROM PremiumUser a", PremiumUser.class).getResultList();
    }

    public PremiumUser updatePremiumUser(int id, String startDate, String endDate) {
        PremiumUser prevPremUser = getPremiumUser(id);
        session.beginTransaction();
        prevPremUser.setStartDate(Date.valueOf(startDate));
        prevPremUser.setEndSubscribeSubscribe(Date.valueOf(endDate));
        session.getTransaction().commit();
        return prevPremUser;
    }

    public boolean deletePremiumUser(int id) {
        session.beginTransaction();
        PremiumUser pu = session.find(PremiumUser.class, id);
        if (pu != null) {
            session.remove(pu);
            session.getTransaction().commit();
            return true;
        } else {
            return false;
        }
    }

    public PremiumUser addPremiumUser(int id, String startDate, String endDate) {
        try {
            session.beginTransaction();
            PremiumUser newUser = new PremiumUser(id, Date.valueOf(startDate), Date.valueOf(endDate));
            session.persist(newUser);
            session.getTransaction().commit();
            return newUser;
        } catch(Exception e) {
            System.out.println(e.getMessage() + " " + e.getCause());
            return null;
        }
    }
}
