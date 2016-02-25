package fr.redfroggy.dynamicforms.utils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.List;

/**
 * Form field description
 * Created by Michael DESIGAUD on 25/02/2016.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FormField implements Serializable {

    @JsonIgnore
    public static final String EXTRA_FIELD_PREFIX = "extra-";

    private Integer id;

    private String entityName;

    private String type;

    private String name;

    private String label;

    @JsonIgnore
    private FormFieldValue value;

    @JsonProperty(value = "required")
    private Boolean required = false;

    @JsonIgnore
    private FormFieldLabel formFieldLabel;

    /**
     * list of element if is dropdown field
     */
    @JsonProperty(value = "options")
    private List<FormFieldDropDown> dropdownOptions;

    private Boolean extrafield = true;

    private Boolean readable;

    private Boolean writable;

    private String pattern;

    private List<String> enumValues;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FormFieldValue getValue() {
        return value;
    }

    public void setValue(FormFieldValue value) {
        this.value = value;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public List<FormFieldDropDown> getDropdownOptions() {
        return dropdownOptions;
    }

    public void setDropdownOptions(List<FormFieldDropDown> dropdownOptions) {
        this.dropdownOptions = dropdownOptions;
    }

    public Boolean getExtrafield() {
        return extrafield;
    }

    public void setExtrafield(Boolean extrafield) {
        this.extrafield = extrafield;
    }

    public Boolean getReadable() {
        return readable;
    }

    public void setReadable(Boolean readable) {
        this.readable = readable;
    }

    public Boolean getWritable() {
        return writable;
    }

    public void setWritable(Boolean writable) {
        this.writable = writable;
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public List<String> getEnumValues() {
        return enumValues;
    }

    public void setEnumValues(List<String> enumValues) {
        this.enumValues = enumValues;
    }

    /**
     * Get field name
     * @return field name
     */
    public String getName(){
        /*if(this.getExtrafield()){
            return ExtraFieldsUtils.formatExtraFieldLabel(this.name);
        }*/
        return this.name;
    }

    /**
     * Get field value
     * @return field value
     */
    @JsonProperty(value = "value")
    public String getFieldValue() {
        return value == null ? null : value.getValue();
    }

    /**
     * Set value
     * @param newValue new value
     */
    @JsonProperty(value = "value")
    public void setValue(String newValue) {
        if (value == null) {
            value = new FormFieldValue();
        }
        value.setValue(newValue);
    }

    /**
     * Set field value
     * @param fieldValue field value
     */
    public void setFieldValue(FormFieldValue fieldValue) {
        this.value = fieldValue;
    }

    /**
     * Set field Label
     * @param fieldLabel field formFieldLabel
     */
    public void setFieldLabel(FormFieldLabel fieldLabel) {
        this.formFieldLabel = fieldLabel;
    }

    /**
     * Set from field formFieldLabel
     * @param fieldTitle field title
     */
    /*public void setLabel(String fieldTitle) {
        String newFieldTitle = getEntityName()+"."+getName();
        if(this.getExtrafield()){
            newFieldTitle = formatExtraFieldLabel(newFieldTitle);
        }
        if (formFieldLabel == null) {
            formFieldLabel = new FormFieldLabel();
        }
        formFieldLabel.setLabel(newFieldTitle);
    }*/

    /**
     * Format extra field formFieldLabel (adding "extra-" prefix)
     * @param label formFieldLabel to format
     * @return formatted formFieldLabel (with prefix "extra-")
     */
    @JsonIgnore
    protected String formatExtraFieldLabel(String label){
        if(label!= null && !label.contains(EXTRA_FIELD_PREFIX)){
            return EXTRA_FIELD_PREFIX+label;
        }
        return label;
    }

    /**
     * Get title extra field
     * @return field title
     */
    /*public String getLabel() {
        return formFieldLabel != null ? formFieldLabel.getLabel() : null;
    }*/

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
