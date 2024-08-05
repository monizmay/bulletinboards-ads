--liquibase formatted sql

--changeset cloud-native:create-reviews-table

CREATE TABLE public.reviews (
    reviewee_email VARCHAR(255) NOT NULL,
    reviewer_email VARCHAR(255) NOT NULL,
    comment VARCHAR(255),
    rating INTEGER,
    CONSTRAINT reviews_pkey PRIMARY KEY (reviewee_email, reviewer_email)
);
