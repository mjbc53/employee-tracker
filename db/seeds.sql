INSERT INTO departments (name) 
VALUES 
('Software development'),
('Sales'),
('Production'),
('Marketing'),
('HR'),
('Accounting'),
('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Software develper lead', 80000.00, 1),
('Software develper', 80000.00, 1),
('Sales lead', 90000.00, 2),
('Sales person', 90000.00, 2),
('Human resources', 25000.00, 5),
('Marking lead', 200000.00, 4),
('Marking helper', 200000.00, 4),
('Accounting lead', 150000.00, 6),
('Accounting helper', 150000.00, 6),
('Production lead', 80000.00, 3),
('Production helper', 80000.00, 3),
('Engineering lead', 80000.00, 7),
('Engineering helper', 80000.00, 7);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Mark', 'John', 1, NULL),
('Johnson', 'John', 2, 1),
('Jackson', 'John', 2, 1),
('julie', 'Johnson', 4, 3),
('james', 'jack', 3, NULL),
('jack', 'james', 5, NULL),
('jlow', 'yoyo', 6, 5),
('Mark', 'John', 7, NULL),
('Mark', 'John', 8, NULL),
('Mark', 'John', 9, 8),
('Mark', 'John', 10, NULL),
('Mark', 'John', 11, 10);


