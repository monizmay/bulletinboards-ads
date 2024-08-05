package com.sap.bulletinboard.reviews;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BulletinboardReviewApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(BulletinboardReviewApplication.class);
        app.run(args);
    }
}
