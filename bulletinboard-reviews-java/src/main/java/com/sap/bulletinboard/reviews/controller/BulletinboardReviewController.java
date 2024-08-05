package com.sap.bulletinboard.reviews.controller;

import java.net.URI;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import com.sap.bulletinboard.reviews.controller.dto.AverageRatingDto;
import com.sap.bulletinboard.reviews.controller.dto.ReviewDto;
import com.sap.bulletinboard.reviews.models.Review;
import com.sap.bulletinboard.reviews.repository.ReviewRepository;

import org.apache.kafka.common.errors.BrokerNotAvailableException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.KafkaException;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class BulletinboardReviewController {
    @Autowired
    ReviewRepository repository;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    @GetMapping("/reviews")
    public List<ReviewDto> getAllReviews() {
        return repository.findAll().stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @GetMapping("/reviews/{reviewee}")
    public List<ReviewDto> getReviewsForReviewee(@PathVariable String reviewee) {
        return repository.findByIdRevieweeEmail(reviewee).stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @PostMapping("/reviews")
    public ResponseEntity<Object> appendReview(@RequestBody ReviewDto reviewDto) {
        Review review = dtoToEntity(reviewDto);
        URI location = URI.create("reviews:" + review.getId());
        if (!repository.existsById(review.getId())) {
            repository.save(review);
            String toSend = reviewDto.getRevieweeEmail() +" "+ String.valueOf(repository.getAvgRatingByIdRevieweeEmail(reviewDto.getRevieweeEmail()));
            sendMessage("bulletinboard", toSend);
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).location(location).build();
        }
    }

    @DeleteMapping("/reviews")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeReviews() {
        repository.deleteAll();
    }

    @GetMapping("/averageRatings/{reviewee}")
    public AverageRatingDto getAllReviews(@PathVariable String reviewee) {
        Number averageRating = repository.getAvgRatingByIdRevieweeEmail(reviewee);
        if (averageRating == null) {
            logger.info("No ratings found for {}", reviewee);
        }
        return new AverageRatingDto(averageRating);
    }

    public void sendMessage(String topicName, String message) {
        try {
            CompletableFuture.runAsync(()->{
                kafkaTemplate.send(topicName, message);
            });

        }
        catch (Exception e){
            System.out.println("Error in sending KafkaTemplate "+e.getMessage());
        }

    }

    private ReviewDto entityToDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        BeanUtils.copyProperties(review, reviewDto);
        BeanUtils.copyProperties(review.getId(), reviewDto);
        return reviewDto;
    }

    private Review dtoToEntity(ReviewDto reviewDto) {
        Review review = new Review();
        BeanUtils.copyProperties(reviewDto, review);
        review.setId(new Review.ReviewIdentity());
        BeanUtils.copyProperties(reviewDto, review.getId());
        return review;
    }
}
