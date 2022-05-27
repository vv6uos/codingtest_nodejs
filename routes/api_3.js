const express = require("express");
const router = express.Router();
const employeesDB = require("../config/database");

router.get("/", (req, res) => {
  employeesDB.query(
    "SELECT E.*, S.salary FROM (SELECT E.*, T.title FROM (SELECT E.*,D.dept_name FROM employees AS E LEFT JOIN (SELECT DE.*,D.dept_name FROM (SELECT emp_no,dept_no FROM dept_emp WHERE (emp_no,to_date) IN(SELECT emp_no,Max(to_date) From dept_emp GROUP BY emp_no)) AS DE LEFT JOIN departments AS D ON DE.dept_no=D.dept_no) AS D ON D.emp_no=E.emp_no WHERE YEAR(E.hire_date)>=2000) AS E LEFT JOIN (SELECT emp_no,title FROM titles WHERE (emp_no,to_date) IN(SELECT emp_no,Max(to_date) From titles GROUP BY emp_no)) AS T ON E.emp_no=T.emp_no) AS E LEFT JOIN (SELECT emp_no,salary FROM salaries WHERE (emp_no,salary) IN(SELECT emp_no,Max(salary) From salaries GROUP BY emp_no)) AS S ON E.emp_no=S.emp_no",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(`err : ${err}`);
        res.send(err);
      }
    }
  );
});

module.exports = router;
