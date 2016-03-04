package fr.redfroggy.dynamicforms.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.redfroggy.dynamicforms.ApplicationTest;
import fr.redfroggy.dynamicforms.TestUtil;
import fr.redfroggy.dynamicforms.model.Customer;
import fr.redfroggy.dynamicforms.utils.Form;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Customer resource test
 * Created by Michael DESIGAUD on 04/03/2016.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ApplicationTest.class)
@WebAppConfiguration
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@ActiveProfiles("test")
@SuppressWarnings("unchecked")
public class CustomerResourceTest {

    @Autowired
    private WebApplicationContext context;

    //Mock to consume spring mvc rest controllers
    private MockMvc mockMVC;

    private ObjectMapper objectMapper;

    @Before
    public void setup() {
        this.objectMapper = new ObjectMapper();
        this.mockMVC = MockMvcBuilders
                .webAppContextSetup(this.context)
                .build();
    }

    @Test
    public void queryCustomers() throws Exception {
        MvcResult mvcResult = mockMVC.perform(get("/api/customers", false)
                //Content
                .contentType(MediaType.APPLICATION_JSON))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();

        Assert.assertNotNull(mvcResult);

        List<Customer> customers = ( List<Customer>) TestUtil.fromJSON(mvcResult.getResponse().getContentAsString(),Customer.class,true);
        Assert.assertNotNull(customers);
        Assert.assertTrue(!customers.isEmpty());
    }

    @Test
    public void getCustomer() throws Exception {
        String customerId = "1";
        MvcResult mvcResult = mockMVC.perform(get("/api/customers/"+customerId, false)
                //Content
                .contentType(MediaType.APPLICATION_JSON))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();

        Assert.assertNotNull(mvcResult);

        Customer customer = (Customer) TestUtil.fromJSON(mvcResult.getResponse().getContentAsString(),Customer.class,false);
        Assert.assertNotNull(customer);
        Assert.assertEquals(customer.getId(),Long.valueOf(customerId));
        Assert.assertNotNull(customer.getFirstName());
        Assert.assertNotNull(customer.getLastName());
        Assert.assertNull(customer.getExtraFields());
    }

    @Test
    public void saveCustomer() throws Exception {

        Customer customer = new Customer("Test","test");

        MvcResult mvcResult = mockMVC.perform(post("/api/customers", false)
                //Content
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.toJSON(customer)))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();

        Assert.assertNotNull(mvcResult);

        Customer savedCustomer = (Customer) TestUtil.fromJSON(mvcResult.getResponse().getContentAsString(),Customer.class,false);
        Assert.assertNotNull(savedCustomer);
        Assert.assertNotNull(savedCustomer.getId());
        Assert.assertEquals(savedCustomer.getFirstName(),customer.getFirstName());
        Assert.assertEquals(savedCustomer.getLastName(),customer.getLastName());
        Assert.assertNull(savedCustomer.getExtraFields());
    }

    @Test
    public void saveCustomerWithExtraFields() throws Exception {

        Map<String,String> extraFields = new HashMap<>();
        extraFields.put("email","michael.desigaud@redfroggy.fr");
        extraFields.put("age","29");

        Customer customer = new Customer("Test","test");
        customer.setExtraFields(extraFields);

        MvcResult mvcResult = mockMVC.perform(post("/api/customers", false)
                //Content
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.toJSON(customer)))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();

        Assert.assertNotNull(mvcResult);

        Customer savedCustomer = (Customer) TestUtil.fromJSON(mvcResult.getResponse().getContentAsString(),Customer.class,false);
        Assert.assertNotNull(savedCustomer);
        Assert.assertNotNull(savedCustomer.getId());
        Assert.assertEquals(savedCustomer.getFirstName(),customer.getFirstName());
        Assert.assertEquals(savedCustomer.getLastName(),customer.getLastName());
        Assert.assertNotNull(savedCustomer.getExtraFields());
        Assert.assertEquals(savedCustomer.getExtraFields(),extraFields);
    }

    @Test
    public void updateCustomer() throws Exception {

        Customer customer = new Customer("Test","test");
        customer.setId(1L);

        MvcResult mvcResult = mockMVC.perform(put("/api/customers", false)
                //Content
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.toJSON(customer)))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();

        Assert.assertNotNull(mvcResult);

        Customer savedCustomer = (Customer) TestUtil.fromJSON(mvcResult.getResponse().getContentAsString(),Customer.class,false);
        Assert.assertNotNull(savedCustomer);
        Assert.assertNotNull(savedCustomer.getId());
        Assert.assertEquals(savedCustomer.getFirstName(),customer.getFirstName());
        Assert.assertEquals(savedCustomer.getLastName(),customer.getLastName());
        Assert.assertNull(savedCustomer.getExtraFields());
    }

    @Test
    public void getCustomerForm() throws Exception {
        MvcResult mvcResult = mockMVC.perform(get("/api/customers/form", false)
                //Content
                .contentType(MediaType.APPLICATION_JSON))//
                //Fin content
                //Assertions
                .andExpect(status().isOk()).andReturn();

        Assert.assertNotNull(mvcResult);

        Form customerForm = (Form) TestUtil.fromJSON(mvcResult.getResponse().getContentAsString(),Form.class,false);
        Assert.assertNotNull(customerForm);
        Assert.assertNotNull(customerForm.getFields());
        Assert.assertTrue(!customerForm.getFields().isEmpty());
    }
}
