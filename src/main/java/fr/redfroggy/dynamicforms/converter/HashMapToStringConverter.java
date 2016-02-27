package fr.redfroggy.dynamicforms.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.HashMap;

/**
 * Hash map converter
 * Created by Michael DESIGAUD on 26/02/2016.
 */
@Converter
public class HashMapToStringConverter implements AttributeConverter<HashMap,String>{

    private static final Logger log = LoggerFactory.getLogger(HashMapToStringConverter.class);

    private ObjectMapper objectMapper;

    public HashMapToStringConverter(){
        this.objectMapper = new ObjectMapper();
    }

    /** Singleton Holder */
    private static class HashMapToStringConverterHolder
    {
        /** unique Instance  */
        private final static HashMapToStringConverter instance = new HashMapToStringConverter();
    }

    /** entry point for Singleton*/
    public static HashMapToStringConverter getInstance()
    {
        return HashMapToStringConverterHolder.instance;
    }


    /**
     * Converts the value stored in the entity attribute into the
     * data representation to be stored in the database.
     *
     * @param attribute the entity attribute value to be converted
     * @return the converted data to be stored in the database column
     */
    @Override
    public String convertToDatabaseColumn(HashMap attribute) {
        try {
            return this.objectMapper.writeValueAsString(attribute);
        } catch (IOException ex) {
            log.error("Cannot convert map into json string",ex);
        }
        return null;
    }

    /**
     * Converts the data stored in the database column into the
     * value to be stored in the entity attribute.
     * Note that it is the responsibility of the converter writer to
     * specify the correct dbData type for the corresponding column
     * for use by the JDBC driver: i.e., persistence providers are
     * not expected to do such type conversion.
     *
     * @param dbData the data from the database column to be converted
     * @return the converted value to be stored in the entity attribute
     */
    @Override
    public HashMap convertToEntityAttribute(String dbData) {
        try {
            if(dbData == null){
                return null;
            }
            return objectMapper.readValue(dbData,new TypeReference<HashMap>(){});
        } catch (IOException ex) {
            log.error("Cannot convert string into map",ex);
        }
        return null;
    }
}
