INSERT INTO grading.counselor(counselor_first_name, counselor_last_name, counselor_emailaddress, counselor_username, counselor_password)
VALUES
('Christine', 'Walker', 'christinew@gmail.com', 'christinewalker3', 'moon260'),
('Chad', 'Smith', 'chad.smith@gmail.com', 'chadsmith8', 'campus360');

UPDATE grading.counselor
SET student_studentID = (SELECT GROUP_CONCAT(studentID) 
                  FROM student 
                  WHERE counselor_first_name = 'Christine')
WHERE counselor_first_name = 'Christine';

UPDATE grading.counselor
SET student_studentID = (SELECT GROUP_CONCAT(studentID) 
                  FROM student 
                  WHERE counselor_first_name = 'Chad')
WHERE counselor_first_name = 'Chad';