package fr.redfroggy.dynamicforms.utils;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;
import java.util.List;

/**
 * Form description
 * Created by Michael DESIGAUD on 25/02/2016.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Form implements Serializable {

    private String entityName;

    private Integer version;

    private List<FormField> fields;

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public List<FormField> getFields() {
        return fields;
    }

    public void setFields(List<FormField> fields) {
        this.fields = fields;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
}
