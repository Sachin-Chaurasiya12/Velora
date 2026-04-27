package com.CodeSparrow.AuthService.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.CodeSparrow.AuthService.model.Users;
import com.CodeSparrow.AuthService.model.UsersPrinciple;
import com.CodeSparrow.AuthService.repository.UserRepository;



@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            Users User = repository.findByUsername(username);
            if(User == null){
                throw new RuntimeException("user not found");
            }

        return new UsersPrinciple(User);
    }
    
}
