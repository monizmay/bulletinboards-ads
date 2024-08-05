package com.sap.bulletinboard.ads;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BulletinboardAdsApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BulletinboardAdsApplication.class);
        app.run(args);
    }
}
