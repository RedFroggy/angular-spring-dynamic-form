package fr.redfroggy.dynamicforms.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.PropertyBindingException;
import fr.redfroggy.dynamicforms.utils.Form;
import fr.redfroggy.dynamicforms.utils.FormUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Extra field json files configuration
 * Created by Michael DESIGAUD on 25/02/2016.
 */
@Configuration
public class ExtraFieldConfiguration {

    private static final Logger log = LoggerFactory.getLogger(ExtraFieldConfiguration.class);

    @Autowired
    private ApplicationContext context;

    @PostConstruct
    public void init() throws IOException {

        ObjectMapper objectMapper  = new ObjectMapper();

        Resource[] resources = context.getResources("classpath:*.json");
        log.info("{} json files found",resources.length);

        for (Resource resource : resources) {

            String fileName = resource.getFilename();
            try {
                log.info("Reading file: {}",fileName);
                Form form = objectMapper.readValue(resource.getInputStream(), Form.class);

                FormUtils.forms.add(form);

                log.info("File name: {}", form);
            } catch(PropertyBindingException ex){
                log.error("Error while reading file '{}': wrong json format",fileName,ex);
            }
        }
    }
}
