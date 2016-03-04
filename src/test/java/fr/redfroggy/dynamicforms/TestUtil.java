package fr.redfroggy.dynamicforms;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

/**
 * Test utility class
 * Created by Michael DESIGAUD on 04/03/2016.
 */
public class TestUtil {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static String toJSON(Object obj) throws JsonProcessingException {
        return objectMapper.writeValueAsString(obj);
    }

    public static Object fromJSON(String json,Class<?> type,Boolean constructCollectionType) throws IOException {
        if(constructCollectionType == null){
            constructCollectionType = false;
        }
        if(constructCollectionType) {
            return objectMapper.readValue(json,objectMapper.getTypeFactory().constructCollectionType(List.class,type));
        }
        return objectMapper.readValue(json,type);
    }
}
