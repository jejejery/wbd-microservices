import PremiumSong.PremiumSongServiceImpl;
import PremiumUser.PremiumUserServiceImpl;
import DBSession.DBSession;

import javax.xml.ws.Endpoint;

public class PremiumServicePublisher {
    public static void main(String[] args) {
        DBSession.setSession();
        Endpoint.publish(
                    "http://0.0.0.0:8081/premiumuser",
                    new PremiumUserServiceImpl());
        Endpoint.publish(
                "http://0.0.0.0:8081/premiumsong",
                new PremiumSongServiceImpl());
            System.out.println("SOAP server started");
    }
}