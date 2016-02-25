package fr.redfroggy.dynamicforms.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Form field label
 * Created by Michael DESIGAUD on 25/02/2016.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormFieldLabel {

    @JsonProperty(value = "label")
    private String label;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
