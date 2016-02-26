package fr.redfroggy.dynamicforms.rest;

import fr.redfroggy.dynamicforms.model.Customer;
import fr.redfroggy.dynamicforms.repository.CustomerRepository;
import fr.redfroggy.dynamicforms.utils.Form;
import fr.redfroggy.dynamicforms.utils.FormUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Customer api resource
 * Created by Michael DESIGAUD on 25/02/2016.
 */
@RestController
@RequestMapping(path = "/api/customers")
public class CustomerResource {

    @Autowired
    private CustomerRepository customerRepository;

    @RequestMapping(path = "",method = RequestMethod.GET)
    public List<Customer> query(){
        return this.customerRepository.findAll();
    }

    @RequestMapping(path = "/{id}",method = RequestMethod.GET)
    public Customer get(@PathVariable Long id){
        return this.customerRepository.findOne(id);
    }

    @RequestMapping(path = "/form",method = RequestMethod.GET)
    public Form getForm(@RequestParam(name = "onlyExtraFields",required = false) Boolean onlyExtraFields){
        if(onlyExtraFields == null){
            onlyExtraFields = false;
        }
        return FormUtils.describe(Customer.class,onlyExtraFields);
    }
}
