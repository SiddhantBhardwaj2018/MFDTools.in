package com.siddhantbhardwaj.mfd_tools_backend.repository;

import com.siddhantbhardwaj.mfd_tools_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(
            value = "select * from users where email = :email",
            nativeQuery = true
    )
    public Optional<User> findByEmail(@Param("email") String email);

    @Query(
            value = "select * from users where user_id = :userId",
            nativeQuery = true
    )
    public Optional<User> findByUserId(@Param("userId") Long userId);

}
