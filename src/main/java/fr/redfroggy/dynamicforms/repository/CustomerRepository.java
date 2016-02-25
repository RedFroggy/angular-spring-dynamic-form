package fr.redfroggy.dynamicforms.repository;

import fr.redfroggy.dynamicforms.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Customer repository
 * Created by Michael DESIGAUD on 25/02/2016.
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByLastName(String lastName);
}