package Logging;

import io.github.cdimascio.dotenv.Dotenv;
import org.w3c.dom.NodeList;

import javax.xml.namespace.QName;
import javax.xml.soap.*;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.ws.handler.MessageContext;
import javax.xml.ws.handler.soap.SOAPHandler;
import javax.xml.ws.handler.soap.SOAPMessageContext;
import javax.xml.ws.soap.SOAPFaultException;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

public class LogSOAPHandler implements SOAPHandler<SOAPMessageContext> {
    @Override
    public Set<QName> getHeaders() {
        return null;
    }

    @Override
    public boolean handleMessage(SOAPMessageContext ctx) {
        Boolean isOutbound = (Boolean) ctx.get(MessageContext.MESSAGE_OUTBOUND_PROPERTY);

        if (!isOutbound) {
            try {
                Dotenv dotEnv = Dotenv.load();
                String restAPIKey = dotEnv.get("API_KEY_REST");
                SOAPMessage soapMessage = ctx.getMessage();
                SOAPEnvelope soapEnvelope = soapMessage.getSOAPPart().getEnvelope();
                SOAPHeader soapHeader = soapEnvelope.getHeader();

                // Periksa apakah request memiliki API key
                NodeList key = soapHeader.getElementsByTagNameNS("*","api_key");
                int length = key.getLength();
                String apiKey = "";
                if (length > 0) {
                    apiKey = key.item(0).getChildNodes().item(0).getNodeValue();
                }
                else {
                    generateSOAPErrMessage(soapMessage, "No API key found");
                    return false;
                }

                // Periksa apakah API key valid
                if (!apiKey.equals(restAPIKey)) {
                    generateSOAPErrMessage(soapMessage, "API key not valid");
                    return false;
                }

                // Buat log baru
                SoapLogDatabase logDB = new SoapLogDatabase();
                // Ambil data service peminta
                String service = apiKey.split("-")[0];
                // Tanggal dan waktu sekarang
                Date currDateTime = new Date();
                // Request
                StringBuilder request_desc = new StringBuilder();
                SOAPBody soapBody = soapEnvelope.getBody();
                request_desc.append(this.soapBodyXMLString(soapBody));

                // Ambil IP address dari header SOAP request
                NodeList ipNode = soapHeader.getElementsByTagNameNS("*","ip_address");
                String IP = ipNode.item(0).getChildNodes().item(0).getNodeValue();
                // Endpoint
                NodeList endpointNode = soapHeader.getElementsByTagNameNS("*", "endpoint");
                String endpoint = endpointNode.item(0).getChildNodes().item(0).getNodeValue();
                // Buat log id baru
                // log id memiliki format "<service peminta>-<unique id>
                UUID uid = UUID.randomUUID();
                String log_id = service + "-" + uid;
                // Tambahkan log ke database
                logDB.addLog(log_id, request_desc.toString(), IP, endpoint, new Timestamp(currDateTime.getTime()));
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }

        return true;
    }

    @Override
    public boolean handleFault(SOAPMessageContext ctx) {
        return true;
    }

    @Override
    public void close(MessageContext ctx) {
    }

    private void generateSOAPErrMessage(SOAPMessage msg, String reason) throws SOAPFaultException {
        try {
            SOAPBody soapBody = msg.getSOAPPart().getEnvelope().getBody();
            SOAPFault soapFault = soapBody.addFault();
            soapFault.setFaultString(reason);
            throw new SOAPFaultException(soapFault);
        }
        catch(SOAPException e) {
            System.out.println(e.getMessage());
        }
    }

    private String soapBodyXMLString(SOAPBody soapBody) throws TransformerException {
        // Mengubah soap body menjadi xml string
        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();

        DOMSource source;
        try {
            source = new DOMSource(soapBody);
        } catch (Exception e) {
            throw new TransformerException("Convert SOAP body failed");
        }

        StringWriter writer = new StringWriter();
        StreamResult result = new StreamResult(writer);
        transformer.transform(source, result);

        System.out.println(writer.toString());
        return writer.toString();
    }
}
