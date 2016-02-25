package fr.redfroggy.dynamicforms.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Form field dropdown
 * Created by Michael DESIGAUD on 25/02/2016.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormFieldDropDown {

    private Integer id;
    private String value;

    @JsonIgnore
    private FormFieldLabel fieldLabel;

    @JsonProperty(value = "label")
    public String getOptionTitle() {
        return fieldLabel != null ? fieldLabel.getLabel() : null;
    }

    @JsonProperty(value = "label")
    public void setOptionTitle(String optionTitle) {
        if (fieldLabel == null) {
            fieldLabel = new FormFieldLabel();
        }
        fieldLabel.setLabel(optionTitle);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public FormFieldLabel getFieldLabel() {
        return fieldLabel;
    }

    public void setFieldLabel(FormFieldLabel fieldLabel) {
        this.fieldLabel = fieldLabel;
    }
}
