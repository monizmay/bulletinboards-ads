package com.sap.bulletinboard.ads.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdvertiserRepository extends JpaRepository<Advertiser, Long> {
    Advertiser findByEmail(String Email);

}
