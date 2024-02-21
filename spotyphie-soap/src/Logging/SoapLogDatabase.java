package Logging;

import DBSession.DBSession;
import org.hibernate.Session;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

public class SoapLogDatabase {
    private final Session session;
    public SoapLogDatabase() {
        this.session = DBSession.getSession();
    }
    public SoapLog getLog(String log_id) {
        try {
            session.beginTransaction();
            SoapLog log = session.get(SoapLog.class, log_id);
            session.getTransaction().commit();
            return log;
        } catch(Exception e) {
            System.out.println(e.getMessage() + "\n" + e.getCause());
            session.getTransaction().rollback();
            return null;
        }
    }

    public List<SoapLog> getAllLogs() {
        return session.createQuery("SELECT a FROM logging a", SoapLog.class).getResultList();
    }

    public SoapLog updateLog(String log_id, String request_desc, String IP, String endpoint, Timestamp timestamp) {
        try {
            SoapLog prevLog = getLog(log_id);
            session.beginTransaction();
            prevLog.setRequest_desc(request_desc);
            prevLog.setIP(IP);
            prevLog.setEndpoint(endpoint);
            prevLog.setTimestamp(timestamp);
            return prevLog;
        }
        catch(Exception e) {
            System.out.println(e.getMessage() + " " + e.getCause());
            return null;
        }
    }

    public boolean deleteLog(String log_id) {
        session.beginTransaction();
        SoapLog log = session.find(SoapLog.class, log_id);
        if (log != null) {
            session.remove(log);
            session.getTransaction().commit();
            return true;
        } else {
            session.getTransaction().rollback();
            return false;
        }
    }

    public SoapLog addLog(String log_id, String request_desc, String IP, String endpoint, Timestamp timestamp) {
        try {
            session.beginTransaction();
            SoapLog newLog = new SoapLog(log_id, request_desc, IP, endpoint, timestamp);
            if (this.getLog(log_id) == null) {
                session.persist(newLog);
                session.getTransaction().commit();
                return newLog;
            }
            return null;
        } catch(Exception e) {
            System.out.println(e.getMessage() + " " + e.getCause());
            session.getTransaction().rollback();
            return null;
        }
    }
}
