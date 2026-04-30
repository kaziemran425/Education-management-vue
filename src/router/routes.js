const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "dashboard", component: () => import("src/pages/IndexPage.vue") },
      {
        path: "payment-history",
        component: () => import("src/pages/paymentHistory.vue"),
      },
      {
        path: "school-list",
        component: () => import("src/pages/schoolList.vue"),
      },
      {
        path: "subscription-plans",
        component: () => import("src/pages/SubscriptionPlans.vue"),
      },
    ],
  },

  // auth layout

  {
    path: "/auth",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/registration",
        component: () => import("src/pages/auth/regiPage.vue"),
      },

      {
        path: "/login",
        component: () => import("src/pages/auth/loginPage.vue"),
      },

      {
        path: "/forgot-password",
        component: () => import("src/pages/auth/forgotePass.vue"),
      },
    ],
  },

  // adminLAYOUTS

  {
    path: "/admin",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("src/pages/dashBoard/DashBoard.vue"),
      },
      // academii
      {
        path: "academic-year",
        component: () => import("src/pages/academic/AcademicYear.vue"),
      },
      {
        path: "asin-teacher",
        component: () => import("src/pages/academic/AssignTeacher.vue"),
      },
      {
        path: "section",
        component: () => import("src/pages/academic/SectionsPage.vue"),
      },
      {
        path: "subject",
        component: () => import("src/pages/academic/SubjectsPage.vue"),
      },
      {
        path: "class-routine",
        component: () => import("src/pages/academic/ClassRoutine.vue"),
      },
      {
        path: "class",
        component: () => import("src/pages/academic/ClassEs.vue"),
      },
      // attendance

      {
        path: "attendance-report",
        component: () => import("src/pages/attendance/AttendanceReport.vue"),
      },
      {
        path: "student-attendance",
        component: () => import("src/pages/attendance/studentAttendance.vue"),
      },

      {
        path: "teacher-attendance",
        component: () => import("src/pages/attendance/TeacherAttendance.vue"),
      },
      {
        path: "staff-attendance",
        component: () => import("src/pages/attendance/staffAttendance.vue"),
      },

      // fees

      {
        path: "fee-collection",
        component: () => import("src/pages/fees/FeeCollection.vue"),
      },
      {
        path: "fee-invoice",
        component: () => import("src/pages/fees/FeeInvoice.vue"),
      },
      {
        path: "fee-types",
        component: () => import("src/pages/fees/FeeType.vue"),
      },

      // inventory

      {
        path: "product-list",
        component: () => import("src/pages/inventory/productList.vue"),
      },
      {
        path: "purchase",
        component: () => import("src/pages/inventory/purcHase.vue"),
      },
      {
        path: "stock-report",
        component: () => import("src/pages/inventory/StockReport.vue"),
      },
      {
        path: "supplier-list",
        component: () => import("src/pages/inventory/SupplierList.vue"),
      },
      // notice

      {
        path: "notice-list",
        component: () => import("src/pages/notice/noticeList.vue"),
      },
      // certificates

      {
        path: "generate-certificate",
        component: () =>
          import("src/pages/certificates/GenerateCertificate.vue"),
      },
      {
        path: "admit-card-generator",
        component: () =>
          import("src/pages/certificates/AdmitCardGenerator.vue"),
      },
      {
        path: "id-card",
        component: () => import("src/pages/certificates/idcartGenerator.vue"),
      },
      {
        path: "list-certificate",
        component: () => import("src/pages/certificates/certificateList.vue"),
      },
      // exam
      {
        path: "exam-list",
        component: () => import("src/pages/exam/examList.vue"),
      },
      {
        path: "exam-create",
        component: () => import("src/pages/exam/examCreat.vue"),
      },
      {
        path: "grade-setup",
        component: () => import("src/pages/exam/GradeSetup.vue"),
      },
      {
        path: "mark-entry",
        component: () => import("src/pages/exam/markEntry.vue"),
      },
      {
        path: "exam-routine",
        component: () => import("src/pages/exam/examRoutine.vue"),
      },
      {
        path: "Result-publish",
        component: () => import("src/pages/exam/ResultPublish.vue"),
      },

      // library
      {
        path: "book-list",
        component: () => import("src/pages/library/bookList.vue"),
      },
      {
        path: "book-issue",
        component: () => import("src/pages/library/bookIssue.vue"),
      },
      {
        path: "book-return",
        component: () => import("src/pages/library/bookReturn.vue"),
      },

      // payrolle

      {
        path: "payroll-setup",
        component: () => import("src/pages/payroll/payrollSetup.vue"),
      },
      {
        path: "salary-payment",
        component: () => import("src/pages/payroll/salaryPayment.vue"),
      },

      // reports
      {
        path: "attendance-report",
        component: () => import("src/pages/reports/attendanceReport.vue"),
      },
      {
        path: "exam-reports",
        component: () => import("src/pages/reports/ExamReports.vue"),
      },
      {
        path: "fees-reports",
        component: () => import("src/pages/reports/FeesReports.vue"),
      },
      {
        path: "payroll-reports",
        component: () => import("src/pages/reports/payrollReports.vue"),
      },

      // student
      {
        path: "student-add",
        component: () => import("src/pages/students/StudentAdd.vue"),
      },
      {
        path: "student-create",
        component: () => import("src/pages/students/StudentCreate.vue"),
      },
      {
        path: "student-details",
        component: () => import("src/pages/students/StudentDetails.vue"),
      },
      {
        path: "student-list",
        component: () => import("src/pages/students/StudentList.vue"),
      },
      {
        path: "student-promote",
        component: () => import("src/pages/students/StudentPromote.vue"),
      },
      // teacher

      {
        path: "teacher-list",
        component: () => import("src/pages/teacher/teacherList.vue"),
      },
      {
        path: "teacher-add",
        component: () => import("src/pages/teacher/TeacherAdd.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
