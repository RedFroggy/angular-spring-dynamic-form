package fr.redfroggy.dynamicforms.configuration;

import fr.redfroggy.dynamicforms.TestUtil;
import fr.redfroggy.dynamicforms.model.Customer;
import fr.redfroggy.dynamicforms.utils.Form;
import fr.redfroggy.dynamicforms.utils.FormField;
import fr.redfroggy.dynamicforms.utils.FormUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * ExtraFieldConfiguration tests
 * Created by Michael DESIGAUD on 04/03/2016.
 */
@RunWith(MockitoJUnitRunner.class)
public class ExtraFieldConfigurationTest {

    @InjectMocks
    private ExtraFieldConfiguration reader = new ExtraFieldConfiguration();

    @Mock
    private ApplicationContext applicationContext;

    @Mock
    private File file;

    @Mock
    private Resource resource;

    private static final String extraFields = "{\"entityName\":\"Customer\",\"version\":1,\"fields\":[{\"id\":1,\"type\":\"email\",\"name\":\"email\",\"value\":\"defaultemail@redfroggy.fr\",\"label\":\"Email\",\"required\":true,\"showAsColumn\":true},{\"id\":2,\"type\":\"number\",\"name\":\"age\",\"value\":\"28\",\"label\":\"Age\",\"required\":true,\"min\":5,\"max\":100},{\"id\":3,\"type\":\"text\",\"name\":\"company\",\"label\":\"Company\",\"required\":false,\"minLength\":3,\"maxLength\":10,\"showAsColumn\":true},{\"id\":4,\"type\":\"textarea\",\"name\":\"description\",\"label\":\"Description\",\"required\":true},{\"id\":5,\"type\":\"file\",\"name\":\"attachment\",\"label\":\"Attachment\",\"fileAccept\":\"application/pdf\"},{\"id\":6,\"type\":\"password\",\"name\":\"password\",\"label\":\"Password\",\"placeholder\":\"Ex: myp4ssw0rd\",\"pattern\":\"^[a-z0-9_-]{6,18}$\"},{\"id\":7,\"type\":\"select\",\"name\":\"roles\",\"label\":\"Roles\",\"required\":true,\"options\":[{\"id\":1,\"value\":\"Admin\"},{\"id\":2,\"value\":\"Manager\"},{\"id\":1,\"value\":\"User\"}]},{\"id\":8,\"type\":\"text\",\"name\":\"readable\",\"label\":\"Readable field\",\"value\":\"Readable value\",\"writable\":false},{\"id\":9,\"type\":\"date\",\"name\":\"birthDate\",\"label\":\"Birth date\",\"required\":true}]}";

    private void mockResource() throws IOException {
        Mockito.when(resource.getFile()).thenReturn(file);
        Mockito.when(file.exists()).thenReturn(true);
        Mockito.when(resource.getFilename()).thenReturn("test.xml");
        InputStream is = new ByteArrayInputStream(extraFields.getBytes());
        Mockito.when(resource.getInputStream()).thenReturn(is);
    }

    @Before
    public void setUp() throws Exception {
        FormUtils.forms = new ArrayList<>();
        mockResource();
        Resource[] resources = new Resource[]{resource};
        Mockito.when(applicationContext.getResources("classpath:*.json")).thenReturn(resources);
        reader.init();
    }

    @Test
    public void jsonParsing() throws IOException {
        Form entity = (Form)TestUtil.fromJSON(extraFields, Form.class,false);
        Assert.assertNotNull(entity);
    }

    @Test
    public void getForm() throws IOException {
        Form userForm = FormUtils.describe(Customer.class,true);
        Assert.assertNotNull(userForm);
    }

    @Test
    public void getFormFields() throws IOException {
        List<FormField> fields = FormUtils.getFields(Customer.class,true);
        Assert.assertNotNull(fields);
        Assert.assertTrue(!fields.isEmpty());
    }

    @Test
    public void getFormField() throws IOException {
        String fieldName = "firstName";
        Field formField = FormUtils.getField(Customer.class,fieldName);
        Assert.assertNotNull(formField);
        Assert.assertTrue(fieldName.equals(formField.getName()));
    }
}
