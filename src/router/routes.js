const routes = [
  // MAIN LAYOUT (ইউজার বা জেনারেল সাইড)
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true, role: "user" },
    children: [
      { path: "", redirect: "/dashboard" },
      {
        path: "dashboard",
        component: () => import("pages/dashbBoard.vue"), // আপনার ফাইলের নামের বানান নিশ্চিত করুন
      },
      {
        path: "payment-history",
        component: () => import("pages/paymentHistory.vue"),
      },
      {
        path: "subscription-plans",
        component: () => import("pages/SubscriptionPlans.vue"),
      },
      {
        path: "school-list",
        component: () => import("pages/schoolList.vue"),
      },
    ],
  },

  // AUTH LAYOUT (লগইন এবং রেজিস্ট্রেশন)
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"), // ইমপোর্ট পাথ চেক করুন
    children: [
      {
        path: "login",
        component: () => import("pages/auth/loginPage.vue"),
      },
      {
        path: "registration",
        component: () => import("pages/auth/regiPage.vue"),
      },
      {
        path: "forgot-password",
        component: () => import("pages/auth/forgotePass.vue"),
      },
    ],
  },

  // ADMIN LAYOUT (মূল স্কুল ম্যানেজমেন্ট সিস্টেম)
  {
    path: "/admin",
    component: () => import("src/layouts/AdminLayout.vue"),
    children: [
      // ড্যাশবোর্ড
      {
        path: "dashboard",
        component: () => import("src/pages/dashBoard/DashBoard.vue"),
      },

      // একাডেমিক মডিউল
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
        path: "class",
        component: () => import("src/pages/academic/ClassEs.vue"),
      },
      {
        path: "class-routine",
        component: () => import("src/pages/academic/ClassRoutine.vue"),
      },

      // স্টুডেন্ট মডিউল
      {
        path: "student-list",
        component: () => import("src/pages/students/StudentList.vue"),
      },
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
        path: "student-promote",
        component: () => import("src/pages/students/StudentPromote.vue"),
      },

      // শিক্ষক মডিউল
      {
        path: "teacher-list",
        component: () => import("src/pages/teacher/teacherList.vue"),
      },
      {
        path: "teacher-add",
        component: () => import("src/pages/teacher/TeacherAdd.vue"),
      },

      // উপস্থিতি মডিউল (Attendance)
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
      {
        path: "attendance-report",
        component: () => import("src/pages/attendance/AttendanceReport.vue"),
      },

      // পরীক্ষা মডিউল (Exam)
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
        path: "result-publish",
        component: () => import("src/pages/exam/ResultPublish.vue"),
      },

      // ফিন্যান্স এবং ফি (Fees)
      {
        path: "fee-collection",
        component: () => import("src/pages/fees/FeeCollection.vue"),
      },
      {
        path: "fee-types",
        component: () => import("src/pages/fees/FeeType.vue"),
      },
      {
        path: "fee-invoice",
        component: () => import("src/pages/fees/FeeInvoice.vue"),
      },

      // পেরোল মডিউল (Payroll)
      {
        path: "payroll-setup",
        component: () => import("src/pages/payroll/payrollSetup.vue"),
      },
      {
        path: "salary-payment",
        component: () => import("src/pages/payroll/salaryPayment.vue"),
      },

      // ইনভেন্টরি মডিউল
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

      // লাইব্রেরি মডিউল
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

      // রিপোর্ট মডিউল
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

      // সার্টিফিকেট এবং নোটিশ
      {
        path: "notice-list",
        component: () => import("src/pages/notice/noticeList.vue"),
      },
      {
        path: "generate-certificate",
        component: () =>
          import("src/pages/certificates/GenerateCertificate.vue"),
      },
      {
        path: "id-card",
        component: () => import("src/pages/certificates/idcartGenerator.vue"),
      },

      // সেটিংস
      {
        path: "school-profile",
        component: () => import("src/pages/settings/SchoolProfile.vue"),
      },
      {
        path: "user-management",
        component: () => import("src/pages/settings/UserManagement.vue"),
      },
    ],
  },

  // ৪0৪ এরর পেজ (এটি সবার শেষে থাকতে হবে)
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
