package fr.redfroggy.dynamicforms.utils;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.apache.commons.lang3.ArrayUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.constraints.NotNull;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.util.*;

/**
 * Form reflection utils
 * Created by Michael DESIGAUD on 25/02/2016.
 */
public class FormUtils {

    private static final Logger log = LoggerFactory.getLogger(FormUtils.class);

    public static List<Form> forms = new ArrayList<>();

    public static final String TEXT_TYPE = "text";
    public static final String DATE_TYPE = "date";
    public static final String OBJECT_TYPE = "object";
    public static final String RELATION_TYPE = "relation";
    public static final String CHECKBOX_TYPE = "checkbox";
    public static final String DROPDOWN_TYPE = "dropdown";

    private static final Map<Class<?>[],String> HTML_TYPES = new HashMap(){{
        put(new Class[]{String.class,Integer.class},TEXT_TYPE);
        put(new Class[]{Date.class,DateTime.class},DATE_TYPE);
        put(new Class[]{Boolean.class},CHECKBOX_TYPE);
        put(new Class[]{Enum.class},DROPDOWN_TYPE);
    }};


    public static String getFieldType(Field field){
        String type = null;
        for(Map.Entry<Class<?>[],String> entry : HTML_TYPES.entrySet()){
            Class<?>[] javaTypes = entry.getKey();
            if(ArrayUtils.contains(javaTypes,field.getType())){
                type = entry.getValue();
                break;
            }
        }
        if(field.getType().isEnum()){
            type = DROPDOWN_TYPE;
        }

        if(type == null){
            type = OBJECT_TYPE;
        }
        return type;
    }
    /**
     * Check if the given field is required
     * @param formField form field
     * @return true if the given field is required; false otherwise
     */
    public static Boolean isMandatory(FormField formField){
        if(formField != null){
            return formField.getRequired();
        }
        return false;
    }

    /**
     * Check if the given field is required
     * @param type type
     * @param name field name
     * @return true if the given field is required; false otherwise
     */
    /*public static Boolean isMandatory(Class<?> type, String name){
        return isMandatory(getField(type,name));
    }*/

    /**
     * Check if the field is mandatory (i.e: annotated with @NotNull or @NotEmpty or @FormRequired)
     * @see @javax.validation.constraints.NotNull
     * @see @javax.validation.constraints.NotEmpty
     * @param field field to check
     * @return true if the field is mandatory, false otherwise
     */
   protected static Boolean isReflectFieldMandatory(Field field){
        if(field != null){
            for(Annotation annotation : field.getDeclaredAnnotations()){
                if(annotation instanceof NotNull ||
                        annotation instanceof org.hibernate.validator.constraints.NotEmpty){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Get all reflection fields (including parent classes fields)
     * @see java.lang.reflect.Field
     * @param type entity type
     * @return List of Field
     */
    public static List<Field> getReflectionFields(Class type){
        List<Field> fields = new ArrayList<>();

        //Get all fields from current class and parent ones
        Class currentClass = type;
        while(!currentClass.equals(Object.class)){
            CollectionUtils.addAll(fields, currentClass.getDeclaredFields());
            currentClass = currentClass.getSuperclass();
        }
        return fields;
    }

    /**
     * Get field by name
     * Lookup on parent class also
     * @param entityType current class to look into
     * @param name name of the field to find
     * @return Field if found or null otherwise
     */
    public static Field getField(Class<?> entityType,String name){
        List<Field> fields = getReflectionFields(entityType);
        if(fields != null){
            for(Field field : fields){
                if(field.getName().equals(name)){
                    return field;
                }
            }
        }
        return null;
    }

    /**
     * Get fields
     * @param type dto type
     * @param fields fields to retrieve
     * @param withExtraFields include extra fields or no
     * @return List of FormField
     */
    public static List<FormField> getFields(Class<?> type,String fields, Boolean withExtraFields){

        //List fieldList = fields != null ? Arrays.asList(fields.split(ApiUrlResolver.FIELDS_SEPARATOR_REGEX)) : null;

        Boolean useExtraFields = withExtraFields;
        if(type == null){
            return new ArrayList<>();
        }
        if(useExtraFields == null){
            useExtraFields = false;
        }
        Set<FormField> formFields = new HashSet<>();

        for(Field field : getReflectionFields(type)){
            log.info("Reflect field: {}",field);
            //Ignore static field and make sure the user has the authority to read field
            //  && (fieldList == null || fieldList.contains(field.getName()))
            if(!Modifier.isStatic(field.getModifiers())){
                final FormField formField = new FormField();
                formField.setExtrafield(false);
                formField.setEntityName(type.getSimpleName());
                formField.setRequired(isReflectFieldMandatory(field));
                formField.setName(field.getName());
                formField.setType(getFieldType(field));
                formField.setLabel(null);
                if(DROPDOWN_TYPE.equals(formField.getType())){
                    formField.setEnumValues(new ArrayList<String>());
                    for(Object enumValue : field.getType().getEnumConstants()){
                        formField.getEnumValues().add(((Enum)enumValue).name());
                    }
                }
                formField.setReadable(true);
                formField.setWritable(true);

                Boolean existingField = CollectionUtils.exists(formFields,new Predicate() {
                    @Override
                    public boolean evaluate(Object object) {
                        return ((FormField)object).getName().equals(formField.getName());
                    }
                });
                if(!existingField) {
                    formFields.add(formField);
                }
            }
        }
        if(useExtraFields){
            Form form = getFormByType(type);
            if(form != null){
                formFields.addAll(form.getFields());
            }
        }
        return new ArrayList<>(formFields);
    }

    public static Form getFormByType(final Class<?> entityType){
        if(!forms.isEmpty()){
            return (Form) CollectionUtils.find(forms, new Predicate() {
                @Override
                public boolean evaluate(Object o) {
                    Form form = (Form) o;
                    return form != null && form.getEntityName().toLowerCase().equals(entityType.getSimpleName().toLowerCase());
                }
            });
        }
        return null;
    }

    /**
     * Describe entity
     * @param type dto type
     * @param fields fields to retrieve
     * @param withExtraFields include extra fields or no
     * @return ExtraFieldEntity
     */
    public static Form describe(Class<?> type,String fields,Boolean withExtraFields){
        if(type != null) {
            Form form = new Form();
            form.setEntityName(type.getSimpleName());
            form.setFields(getFields(type,fields,withExtraFields));
            return form;
        }
        return null;
    }

    /**
     * Describe entity
     * @param type dto type
     * @param withExtraFields include extra fields or no
     * @return ExtraFieldEntity
     */
    public static Form describe(Class<?> type,Boolean withExtraFields){
        return describe(type,null,withExtraFields);
    }
    /**
     * Get list generic type
     * @param field current field
     * @return List generic type
     */
    public static Class<?> getJavaType(Field field){
        if(field.getGenericType() instanceof ParameterizedType){
            ParameterizedType pt = (ParameterizedType) field.getGenericType();
            return (Class<?>) pt.getActualTypeArguments()[0];
        }
        return field.getType();
    }

    /**
     * Check if the field is a collection type
     * @param field field to check
     * @return true if the field is assignable from Collection
     */
    public static Boolean isCollection(Field field){
        return Collection.class.isAssignableFrom(field.getType());
    }
}