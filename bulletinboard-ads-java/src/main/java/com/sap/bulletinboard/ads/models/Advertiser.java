package com.sap.bulletinboard.ads.models;

import com.sap.bulletinboard.ads.services.AverageRating;
import jakarta.persistence.*;

@Entity
@Table(name = "advertiser")
@SequenceGenerator(name = "advertiser_id_generator", sequenceName = "advertiser_sequence", initialValue = 1,
        allocationSize = 1)
public class Advertiser {
    @Id
    @Column(name = "id", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "advertiser_id_generator")
    private long id;

    private String email;

    private Double averageRating;

    public Advertiser(){

    }

    public Advertiser(String email, Double averageRating) {
        this.email = email;
        this.averageRating = averageRating;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating;
    }
}
