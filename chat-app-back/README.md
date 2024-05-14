# ChatAppBack

## Getting Started

To get started with the chatapp Backend, follow these steps:

### Prerequisites

Make sure you have the following software installed:

- [Java Development Kit (JDK)](https://adoptopenjdk.net/)
- [Apache Maven](https://maven.apache.org/)
- [MySQL](https://openclassrooms.com/fr/courses/6971126-implementez-vos-bases-de-donnees-relationnelles-avec-sql/7152681-installez-le-sgbd-mysql)

### mySQL

- Launch mySQL

- Log in to mySQL using the root user or a user with appropriate privileges.

```
   mysql -u root -p

```

- Create a new database for your Spring Boot application. Replace yourdatabase with the desired name for your database.

```
   CREATE DATABASE yourdatabase;
```

- Create a mySQL user and grant privileges to the database. Replace youruser and yourpassword with your preferred username and password.

```
   CREATE USER 'youruser'@'localhost' IDENTIFIED BY 'yourpassword';
   GRANT ALL PRIVILEGES ON yourdatabase.* TO 'youruser'@'localhost';
   FLUSH PRIVILEGES;
```

- Configure the application properties ([Java](#java))

### Java

- Clone this repository to your local machine:

```
   git clone https://github.com/Adem-S/Dev-Full-Stack_P13_042024.git
```

- Build the project using Maven:

```
   mvn clean install
```

- Create and configure the application properties in `src/main/resources/application.properties` with your settings and mySQL config

  _src/main/resources/application.properties.example_

```
  Line to modify :

   spring.datasource.url = jdbc:mysql://localhost:3306/my_database
   spring.datasource.username=db_user
   spring.datasource.password=db_password
```

- Run the application


© 2024 AdemS
