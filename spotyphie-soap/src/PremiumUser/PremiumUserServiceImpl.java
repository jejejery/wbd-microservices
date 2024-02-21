package PremiumUser;

import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.HandlerChain;
import java.util.List;

@WebService(targetNamespace = "PremiumUserService")
@HandlerChain(file = "handler-chain.xml")
public class PremiumUserServiceImpl implements PremiumUserService {

    private PremiumUserDatabase premiumUserDatabaseImpl;
    public PremiumUserServiceImpl() {
        this.premiumUserDatabaseImpl = new PremiumUserDatabase();
    }
    @WebMethod
    public String getPremiumUser(int id) {
        PremiumUser pu = premiumUserDatabaseImpl.getPremiumUser(id);
        Integer userID = pu.getUserID();
        String startDate = pu.getStartDate().toString();
        String endDate = pu.getEndDate().toString();
        return "{\"user_id\":" + userID + ",\"start_date\":\"" + startDate +
                "\",\"end_date\":\"" + endDate + "\"}";
    }

    public String getAllPremiumUsers() {
        List<PremiumUser> puList = premiumUserDatabaseImpl.getAllPremiumUsers();
        StringBuilder sb = new StringBuilder("[");

        for (PremiumUser pu : puList) {
            Integer userID = pu.getUserID();
            String startDate = pu.getStartDate().toString();
            String endDate = pu.getEndDate().toString();

            sb.append("{\"user_id\":").append(userID)
                    .append(",\"start_date\":\"").append(startDate)
                    .append("\",\"end_date\":\"").append(endDate)
                    .append("\"},");
        }

        if (sb.length() > 1) {
            sb.deleteCharAt(sb.length() - 1);
        }

        sb.append("]");
        return sb.toString();
    }

    @WebMethod
    public String updatePremiumUser(int id, String startDate, String endDate) {
        PremiumUser pu = premiumUserDatabaseImpl.updatePremiumUser(id, startDate, endDate);
        Integer userID = pu.getUserID();
        String start = pu.getStartDate().toString();
        String end = pu.getEndDate().toString();
        return "{\"user_id\":" + userID + ",\"start_date\":\"" + start +
                "\",\"end_date\":\"" + end + "\"}";
    }

    @WebMethod
    public boolean deletePremiumUser(int id) {
        return premiumUserDatabaseImpl.deletePremiumUser(id);
    }

    @WebMethod
    public String addPremiumUser(int id, String startDate, String endDate) {
        PremiumUser pu = premiumUserDatabaseImpl.addPremiumUser(id, startDate, endDate);
        Integer userID = pu.getUserID();
        String start = pu.getStartDate().toString();
        String end = pu.getEndDate().toString();
        return "{\"user_id\":" + userID + ",\"start_date\":\"" + start +
                "\",\"end_date\":\"" + end + "\"}";
    }
}
