package com.sap.bulletinboard.ads.controllers.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AdvertisementDto {

    public Long id;
    @NotBlank
    public String title;
    @NotNull
    public BigDecimal price;

    @NotBlank
    @Email(message = "Not a valid email address")
    public String contact;

    public double averageContactRating;
    @NotBlank
    public String currency;
    public MetaData metadata = new MetaData();
    public String reviewsUrl;

    public static class MetaData {
        public String createdAt;
        public String modifiedAt;
        public Long version = 0L;
    }
}
