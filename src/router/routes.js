const routes = [
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/auth/loginPage.vue") },
      { path: "register", component: () => import("pages/auth/regiPage.vue") },
      {
        path: "forgot-password",
        component: () => import("pages/auth/forgotePass.vue"),
      },
    ],
  },

  {
    path: "/panel",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true,
      roles: ["user", "teacher", "student", "accountant"],
    },
    children: [
      { path: "", component: () => import("pages/dashbBoard.vue") },
      { path: "index", component: () => import("pages/IndexPage.vue") },
      {
        path: "subscription",
        component: () => import("pages/SubscriptionPlans.vue"),
      },
      {
        path: "payment-history",
        component: () => import("pages/paymentHistory.vue"),
      },
      { path: "school-list", component: () => import("pages/schoolList.vue") },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      roles: ["super_admin", "admin"],
    },
    children: [
      { path: "", component: () => import("pages/dashBoard/DashBoard.vue") },

      {
        path: "academic-year",
        component: () => import("pages/academic/AcademicYear.vue"),
      },
      { path: "class", component: () => import("pages/academic/ClassEs.vue") },
      {
        path: "sections",
        component: () => import("pages/academic/SectionsPage.vue"),
      },
      {
        path: "subjects",
        component: () => import("pages/academic/SubjectsPage.vue"),
      },
      {
        path: "assign-teacher",
        component: () => import("pages/academic/AssignTeacher.vue"),
      },
      {
        path: "class-routine",
        component: () => import("pages/academic/ClassRoutine.vue"),
      },

      {
        path: "attendance/student",
        component: () => import("pages/attendance/studentAttendance.vue"),
      },
      {
        path: "attendance/teacher",
        component: () => import("pages/attendance/TeacherAttendance.vue"),
      },
      {
        path: "attendance/staff",
        component: () => import("pages/attendance/staffAttendance.vue"),
      },
      {
        path: "attendance/report",
        component: () => import("pages/attendance/AttendanceReport.vue"),
      },

      {
        path: "certificates/list",
        component: () => import("pages/certificates/certificateList.vue"),
      },
      {
        path: "certificates/generate",
        component: () => import("pages/certificates/GenerateCertificate.vue"),
      },
      {
        path: "certificates/admit",
        component: () => import("pages/certificates/AdmitCardGenerator.vue"),
      },
      {
        path: "certificates/idcard",
        component: () => import("pages/certificates/idcartGenerator.vue"),
      },

      {
        path: "exam/create",
        component: () => import("pages/exam/examCreat.vue"),
      },
      { path: "exam/list", component: () => import("pages/exam/examList.vue") },
      {
        path: "exam/routine",
        component: () => import("pages/exam/examRoutine.vue"),
      },
      {
        path: "exam/marks",
        component: () => import("pages/exam/markEntry.vue"),
      },
      {
        path: "exam/result",
        component: () => import("pages/exam/ResultPublish.vue"),
      },
      {
        path: "exam/grade",
        component: () => import("pages/exam/GradeSetup.vue"),
      },

      { path: "fees/type", component: () => import("pages/fees/FeeType.vue") },
      {
        path: "fees/collection",
        component: () => import("pages/fees/FeeCollection.vue"),
      },
      {
        path: "fees/invoice",
        component: () => import("pages/fees/FeeInvoice.vue"),
      },

      {
        path: "hostel/list",
        component: () => import("pages/hostel/HostelList.vue"),
      },
      {
        path: "hostel/rooms",
        component: () => import("pages/hostel/RoomManagement.vue"),
      },

      {
        path: "inventory/products",
        component: () => import("pages/inventory/productList.vue"),
      },
      {
        path: "inventory/suppliers",
        component: () => import("pages/inventory/SupplierList.vue"),
      },
      {
        path: "inventory/purchase",
        component: () => import("pages/inventory/purcHase.vue"),
      },
      {
        path: "inventory/report",
        component: () => import("pages/inventory/StockReport.vue"),
      },

      {
        path: "library/books",
        component: () => import("pages/library/bookList.vue"),
      },
      {
        path: "library/issue",
        component: () => import("pages/library/bookIssue.vue"),
      },
      {
        path: "library/return",
        component: () => import("pages/library/bookReturn.vue"),
      },

      {
        path: "notice",
        component: () => import("pages/notice/noticeList.vue"),
      },

      {
        path: "payroll/setup",
        component: () => import("pages/payroll/payrollSetup.vue"),
      },
      {
        path: "payroll/salary",
        component: () => import("pages/payroll/salaryPayment.vue"),
      },

      {
        path: "reports/exam",
        component: () => import("pages/reports/ExamReports.vue"),
      },
      {
        path: "reports/fees",
        component: () => import("pages/reports/FeesReports.vue"),
      },
      {
        path: "reports/attendance",
        component: () => import("pages/reports/attendanceReport.vue"),
      },
      {
        path: "reports/payroll",
        component: () => import("pages/reports/payrollReports.vue"),
      },

      {
        path: "students",
        component: () => import("pages/students/StudentList.vue"),
      },
      {
        path: "students/add",
        component: () => import("pages/students/StudentAdd.vue"),
      },
      {
        path: "students/create",
        component: () => import("pages/students/StudentCreate.vue"),
      },
      {
        path: "students/details",
        component: () => import("pages/students/StudentDetails.vue"),
      },
      {
        path: "students/promote",
        component: () => import("pages/students/StudentPromote.vue"),
      },

      {
        path: "teachers",
        component: () => import("pages/teacher/teacherList.vue"),
      },
      {
        path: "teachers/add",
        component: () => import("pages/teacher/TeacherAdd.vue"),
      },

      {
        path: "settings/school",
        component: () => import("pages/settings/SchoolProfile.vue"),
      },
      {
        path: "settings/users",
        component: () => import("pages/settings/UserManagement.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
