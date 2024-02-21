package PremiumUser;

import javax.jws.WebService;
import javax.jws.WebMethod;

@WebService
public interface PremiumUserService {
    @WebMethod
    String getPremiumUser(int id);

    @WebMethod
    String getAllPremiumUsers();

    @WebMethod
    String updatePremiumUser(int id, String startDate, String endDate);

    @WebMethod
    boolean deletePremiumUser(int id);

    @WebMethod
    String addPremiumUser(int id, String startDate, String endDate);
}
