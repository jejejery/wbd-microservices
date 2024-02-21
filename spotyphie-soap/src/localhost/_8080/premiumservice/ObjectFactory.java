
package localhost._8080.premiumservice;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the localhost._8080.premiumservice package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _AddPremiumUser_QNAME = new QName("http://localhost:8080/premiumservice", "addPremiumUser");
    private final static QName _UpdatePremiumUserResponse_QNAME = new QName("http://localhost:8080/premiumservice", "updatePremiumUserResponse");
    private final static QName _DeletePremiumUser_QNAME = new QName("http://localhost:8080/premiumservice", "deletePremiumUser");
    private final static QName _DeletePremiumUserResponse_QNAME = new QName("http://localhost:8080/premiumservice", "deletePremiumUserResponse");
    private final static QName _GetPremiumUserResponse_QNAME = new QName("http://localhost:8080/premiumservice", "getPremiumUserResponse");
    private final static QName _AddPremiumUserResponse_QNAME = new QName("http://localhost:8080/premiumservice", "addPremiumUserResponse");
    private final static QName _UpdatePremiumUser_QNAME = new QName("http://localhost:8080/premiumservice", "updatePremiumUser");
    private final static QName _GetPremiumUser_QNAME = new QName("http://localhost:8080/premiumservice", "getPremiumUser");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: localhost._8080.premiumservice
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link DeletePremiumUser }
     * 
     */
    public DeletePremiumUser createDeletePremiumUser() {
        return new DeletePremiumUser();
    }

    /**
     * Create an instance of {@link DeletePremiumUserResponse }
     * 
     */
    public DeletePremiumUserResponse createDeletePremiumUserResponse() {
        return new DeletePremiumUserResponse();
    }

    /**
     * Create an instance of {@link AddPremiumUser }
     * 
     */
    public AddPremiumUser createAddPremiumUser() {
        return new AddPremiumUser();
    }

    /**
     * Create an instance of {@link UpdatePremiumUserResponse }
     * 
     */
    public UpdatePremiumUserResponse createUpdatePremiumUserResponse() {
        return new UpdatePremiumUserResponse();
    }

    /**
     * Create an instance of {@link AddPremiumUserResponse }
     * 
     */
    public AddPremiumUserResponse createAddPremiumUserResponse() {
        return new AddPremiumUserResponse();
    }

    /**
     * Create an instance of {@link UpdatePremiumUser }
     * 
     */
    public UpdatePremiumUser createUpdatePremiumUser() {
        return new UpdatePremiumUser();
    }

    /**
     * Create an instance of {@link GetPremiumUser }
     * 
     */
    public GetPremiumUser createGetPremiumUser() {
        return new GetPremiumUser();
    }

    /**
     * Create an instance of {@link GetPremiumUserResponse }
     * 
     */
    public GetPremiumUserResponse createGetPremiumUserResponse() {
        return new GetPremiumUserResponse();
    }

    /**
     * Create an instance of {@link Date }
     * 
     */
    public Date createDate() {
        return new Date();
    }

    /**
     * Create an instance of {@link PremiumUser }
     * 
     */
    public PremiumUser createPremiumUser() {
        return new PremiumUser();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AddPremiumUser }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "addPremiumUser")
    public JAXBElement<AddPremiumUser> createAddPremiumUser(AddPremiumUser value) {
        return new JAXBElement<AddPremiumUser>(_AddPremiumUser_QNAME, AddPremiumUser.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UpdatePremiumUserResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "updatePremiumUserResponse")
    public JAXBElement<UpdatePremiumUserResponse> createUpdatePremiumUserResponse(UpdatePremiumUserResponse value) {
        return new JAXBElement<UpdatePremiumUserResponse>(_UpdatePremiumUserResponse_QNAME, UpdatePremiumUserResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeletePremiumUser }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "deletePremiumUser")
    public JAXBElement<DeletePremiumUser> createDeletePremiumUser(DeletePremiumUser value) {
        return new JAXBElement<DeletePremiumUser>(_DeletePremiumUser_QNAME, DeletePremiumUser.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link DeletePremiumUserResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "deletePremiumUserResponse")
    public JAXBElement<DeletePremiumUserResponse> createDeletePremiumUserResponse(DeletePremiumUserResponse value) {
        return new JAXBElement<DeletePremiumUserResponse>(_DeletePremiumUserResponse_QNAME, DeletePremiumUserResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPremiumUserResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "getPremiumUserResponse")
    public JAXBElement<GetPremiumUserResponse> createGetPremiumUserResponse(GetPremiumUserResponse value) {
        return new JAXBElement<GetPremiumUserResponse>(_GetPremiumUserResponse_QNAME, GetPremiumUserResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AddPremiumUserResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "addPremiumUserResponse")
    public JAXBElement<AddPremiumUserResponse> createAddPremiumUserResponse(AddPremiumUserResponse value) {
        return new JAXBElement<AddPremiumUserResponse>(_AddPremiumUserResponse_QNAME, AddPremiumUserResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link UpdatePremiumUser }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "updatePremiumUser")
    public JAXBElement<UpdatePremiumUser> createUpdatePremiumUser(UpdatePremiumUser value) {
        return new JAXBElement<UpdatePremiumUser>(_UpdatePremiumUser_QNAME, UpdatePremiumUser.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPremiumUser }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://localhost:8080/premiumservice", name = "getPremiumUser")
    public JAXBElement<GetPremiumUser> createGetPremiumUser(GetPremiumUser value) {
        return new JAXBElement<GetPremiumUser>(_GetPremiumUser_QNAME, GetPremiumUser.class, null, value);
    }

}
