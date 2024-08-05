package com.sap.bulletinboard.ads.models;

import com.sap.bulletinboard.ads.util.TimeServiceProvider;

import java.time.Instant;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

@Embeddable
public class EntityMetaData {

    @Column(name = "createdat", updatable = false)
    private Instant createdAt;

    @Column(name = "modifiedat")
    private Instant updatedAt;

    private Instant now() {
        return TimeServiceProvider.now();
    }

    @PrePersist
    public void onCreate() {
        createdAt = now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = now();
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
