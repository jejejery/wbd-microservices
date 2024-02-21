package Logging;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table (name="logging")
public class SoapLog {
    // Model class for premium accounts
    @Id
    @Column(name="log_id")
    private String log_id;
    @Column(name="request_desc")
    private String request_desc;
    @Column(name="IP")
    private String IP;
    @Column(name="endpoint")
    private String endpoint;
    @Column(name="timestamp")
    private Timestamp timestamp;

    public SoapLog() {}

    public SoapLog(String logId, String requestDesc, String ip, String endpoint, Timestamp timestamp) {
        this.log_id = logId;
        this.request_desc = requestDesc;
        this.IP = ip;
        this.endpoint = endpoint;
        this.timestamp = timestamp;
    }


    public String getLog_id() {
        return log_id;
    }

    public void setLog_id(String log_id) {
        this.log_id = log_id;
    }

    public String getRequest_desc() {
        return request_desc;
    }

    public void setRequest_desc(String request_desc) {
        this.request_desc = request_desc;
    }

    public String getIP() {
        return IP;
    }

    public void setIP(String IP) {
        this.IP = IP;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}