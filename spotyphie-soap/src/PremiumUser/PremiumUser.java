package PremiumUser;

import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import javax.persistence.*;

@Entity
@Table (name="PremiumUser")
public class PremiumUser {
    // Model class for premium accounts
    @Id
    @Column(name="user_id")
    private int user_id;
    @Column(name="start_date")
    private Date startDate;
    @Column(name="end_date")
    private Date endDate;

    public PremiumUser() {}

    public PremiumUser(int user_id, Date startDate, Date endDate) {
        this.user_id = user_id;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getter
    public int getUserID() {
        return this.user_id;
    }

    public Date getStartDate() {
        return this.startDate;
    }
    public Date getEndDate() {
        return this.endDate;
    }

    // Setter
    public void setUserID(int id) {
        this.user_id = id;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }
    public void setEndSubscribeSubscribe(Date endSubscribe) {
        this.endDate = endSubscribe;
    }
}