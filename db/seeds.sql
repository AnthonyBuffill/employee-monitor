INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO role (title, salary, department_ID)
VALUES ("JavaScript Developer",60000.01, 1),
       ("Data Scietist", 85000.03, 2),
       ("Data analyst", 83000, 3),
       ("Scrum master", 100002, 4),
       ("Machine Learning technician", 5.00, 4);

 
INSERT INTO employee (first_name, last_name, role_ID, manager_ID)
VALUES ("Sandy", "Duncan", 1, NULL),
       ("Jacob", "Carver", 5, 1), 
       ("Daryl", "Revis", 4, 1), 
       ("Yurgen", "Macadoo", 3, 1),
       ("Walter", "White", 1, 2),
       ("Patrick", "Mahomes" ,2 , NULL),
       ("Travis", "MAauto", 2, 2);
       
       

             


       
