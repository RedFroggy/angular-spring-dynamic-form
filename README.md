Dynamic form creation with Angular 2 and Spring [![Build Status](https://travis-ci.org/RedFroggy/angular-spring-dynamic-form.svg?branch=master)](https://travis-ci.org/RedFroggy/angular-spring-dynamic-form)
===============================================

Dynamic form creation and validation using Angular 2 and Spring for a list of customers

#Stack
- Spring Boot
- Spring MVC
- H2 in-memory database
- Angular 2.1.1

#Features
- Extra fields description with a JSON file (server-side)
- Customer list
- Customer creation / edition
- Dynamic rendering of input: Tested for text,email,url,file,date inputs
- Dynamic rendering of textara, select.
- Each dynamic field is fully validated

# Example of fields description with JSON file
````
{
  "entityName":"Customer",
  "version":1,
  "fields":[
    {
      "id":1,
      "type":"email",
      "name":"email",
      "value":"defaultemail@redfroggy.fr",
      "label":"Email",
      "required":true,
      "showAsColumn":true
    },
    {
      "id":2,
      "type":"number",
      "name":"age",
      "value":"28",
      "label":"Age",
      "required":true,
      "min":5,
      "max":100
    },
    {
      "id":3,
      "type":"text",
      "name":"company",
      "label":"Company",
      "required":false,
      "minLength":3,
      "maxLength":10,
      "showAsColumn":true
    },
    {
      "id":4,
      "type":"textarea",
      "name":"description",
      "label":"Description",
      "required":true
    },
    {
      "id":5,
      "type":"file",
      "name":"attachment",
      "label":"Attachment",
      "fileAccept":"application/pdf"
    },
    {
      "id":6,
      "type":"password",
      "name":"password",
      "label":"Password",
      "placeholder":"Ex: myp4ssw0rd",
      "pattern":"^[a-z0-9_-]{6,18}$"
    },
    {
      "id":7,
      "type":"select",
      "name":"roles",
      "label":"Roles",
      "required":true,
      "options":[
        {
          "id":1,
          "value":"Admin"
        },
        {
          "id":2,
          "value":"Manager"
        },
        {
          "id":1,
          "value":"User"
        }
      ]
    },
    {
      "id":8,
      "type":"text",
      "name":"readable",
      "label":"Readable field",
      "value":"Readable value",
      "writable":false
    },
    {
      "id":9,
      "type":"date",
      "name":"birthDate",
      "label":"Birth date",
      "required":true
    }
  ]
}
````

#To run Java unit tests
````bash
$ mvn test
````

#To run the application
````bash
$ mvn spring-boot:run
````
- Npm modules should be automatically installed and typescript files compiled (see pom.xml file)
- Then go to http://localhost:8080
