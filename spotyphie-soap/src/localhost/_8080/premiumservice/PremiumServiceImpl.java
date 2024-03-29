
package localhost._8080.premiumservice;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.Action;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebService(name = "PremiumServiceImpl", targetNamespace = "http://localhost:8080/premiumservice")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface PremiumServiceImpl {


    /**
     * 
     * @param arg3
     * @param arg2
     * @param arg5
     * @param arg4
     * @param arg1
     * @param arg0
     * @return
     *     returns localhost._8080.premiumservice.PremiumUser.PremiumUser
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "updatePremiumUser", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.UpdatePremiumUser")
    @ResponseWrapper(localName = "updatePremiumUserResponse", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.UpdatePremiumUserResponse")
    @Action(input = "http://localhost:8080/premiumservice/PremiumServiceImpl/updatePremiumUserRequest", output = "http://localhost:8080/premiumservice/PremiumServiceImpl/updatePremiumUserResponse")
    public PremiumUser updatePremiumUser(
        @WebParam(name = "arg0", targetNamespace = "")
        int arg0,
        @WebParam(name = "arg1", targetNamespace = "")
        String arg1,
        @WebParam(name = "arg2", targetNamespace = "")
        String arg2,
        @WebParam(name = "arg3", targetNamespace = "")
        String arg3,
        @WebParam(name = "arg4", targetNamespace = "")
        Date arg4,
        @WebParam(name = "arg5", targetNamespace = "")
        Date arg5);

    /**
     * 
     * @param arg0
     * @return
     *     returns boolean
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "deletePremiumUser", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.DeletePremiumUser")
    @ResponseWrapper(localName = "deletePremiumUserResponse", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.DeletePremiumUserResponse")
    @Action(input = "http://localhost:8080/premiumservice/PremiumServiceImpl/deletePremiumUserRequest", output = "http://localhost:8080/premiumservice/PremiumServiceImpl/deletePremiumUserResponse")
    public boolean deletePremiumUser(
        @WebParam(name = "arg0", targetNamespace = "")
        int arg0);

    /**
     * 
     * @param arg0
     * @return
     *     returns localhost._8080.premiumservice.PremiumUser.PremiumUser
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "getPremiumUser", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.GetPremiumUser")
    @ResponseWrapper(localName = "getPremiumUserResponse", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.GetPremiumUserResponse")
    @Action(input = "http://localhost:8080/premiumservice/PremiumServiceImpl/getPremiumUserRequest", output = "http://localhost:8080/premiumservice/PremiumServiceImpl/getPremiumUserResponse")
    public PremiumUser getPremiumUser(
        @WebParam(name = "arg0", targetNamespace = "")
        int arg0);

    /**
     * 
     * @param arg3
     * @param arg2
     * @param arg5
     * @param arg4
     * @param arg1
     * @param arg0
     * @return
     *     returns localhost._8080.premiumservice.PremiumUser.PremiumUser
     */
    @WebMethod
    @WebResult(targetNamespace = "")
    @RequestWrapper(localName = "addPremiumUser", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.AddPremiumUser")
    @ResponseWrapper(localName = "addPremiumUserResponse", targetNamespace = "http://localhost:8080/premiumservice", className = "localhost._8080.premiumservice.AddPremiumUserResponse")
    @Action(input = "http://localhost:8080/premiumservice/PremiumServiceImpl/addPremiumUserRequest", output = "http://localhost:8080/premiumservice/PremiumServiceImpl/addPremiumUserResponse")
    public PremiumUser addPremiumUser(
        @WebParam(name = "arg0", targetNamespace = "")
        int arg0,
        @WebParam(name = "arg1", targetNamespace = "")
        String arg1,
        @WebParam(name = "arg2", targetNamespace = "")
        String arg2,
        @WebParam(name = "arg3", targetNamespace = "")
        String arg3,
        @WebParam(name = "arg4", targetNamespace = "")
        Date arg4,
        @WebParam(name = "arg5", targetNamespace = "")
        Date arg5);

}
