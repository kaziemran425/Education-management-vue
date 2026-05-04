# Quasar App (e-ducation-vue)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).


```
E-ducation-vue
├─ .editorconfig
├─ .npmrc
├─ README.md
├─ babel.config.js
├─ index.html
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  └─ icons
│     ├─ favicon-128x128.png
│     ├─ favicon-16x16.png
│     ├─ favicon-32x32.png
│     └─ favicon-96x96.png
├─ quasar.config.js
└─ src
   ├─ App.vue
   ├─ assets
   │  └─ quasar-logo-vertical.svg
   ├─ boot
   │  └─ axios.js
   ├─ components
   │  └─ EssentialLink.vue
   ├─ css
   │  ├─ app.scss
   │  └─ quasar.variables.scss
   ├─ layouts
   │  ├─ AdminLayout.vue
   │  ├─ AuthLayout.vue
   │  └─ MainLayout.vue
   ├─ pages
   │  ├─ ErrorNotFound.vue
   │  ├─ IndexPage.vue
   │  ├─ SubscriptionPlans.vue
   │  ├─ academic
   │  │  ├─ AcademicYear.vue
   │  │  ├─ AssignTeacher.vue
   │  │  ├─ ClassEs.vue
   │  │  ├─ ClassRoutine.vue
   │  │  ├─ SectionsPage.vue
   │  │  └─ SubjectsPage.vue
   │  ├─ attendance
   │  │  ├─ AttendanceReport.vue
   │  │  ├─ TeacherAttendance.vue
   │  │  ├─ staffAttendance.vue
   │  │  └─ studentAttendance.vue
   │  ├─ auth
   │  │  ├─ forgotePass.vue
   │  │  ├─ loginPage.vue
   │  │  └─ regiPage.vue
   │  ├─ certificates
   │  │  ├─ AdmitCardGenerator.vue
   │  │  ├─ GenerateCertificate.vue
   │  │  ├─ certificateList.vue
   │  │  └─ idcartGenerator.vue
   │  ├─ dashBoard
   │  │  └─ DashBoard.vue
   │  ├─ dashbBoard.vue
   │  ├─ exam
   │  │  ├─ GradeSetup.vue
   │  │  ├─ ResultPublish.vue
   │  │  ├─ examCreat.vue
   │  │  ├─ examList.vue
   │  │  ├─ examRoutine.vue
   │  │  └─ markEntry.vue
   │  ├─ fees
   │  │  ├─ FeeCollection.vue
   │  │  ├─ FeeInvoice.vue
   │  │  └─ FeeType.vue
   │  ├─ hostel
   │  │  ├─ HostelList.vue
   │  │  └─ RoomManagement.vue
   │  ├─ inventory
   │  │  ├─ StockReport.vue
   │  │  ├─ SupplierList.vue
   │  │  ├─ productList.vue
   │  │  └─ purcHase.vue
   │  ├─ library
   │  │  ├─ bookIssue.vue
   │  │  ├─ bookList.vue
   │  │  └─ bookReturn.vue
   │  ├─ notice
   │  │  └─ noticeList.vue
   │  ├─ paymentHistory.vue
   │  ├─ payroll
   │  │  ├─ payrollSetup.vue
   │  │  └─ salaryPayment.vue
   │  ├─ reports
   │  │  ├─ ExamReports.vue
   │  │  ├─ FeesReports.vue
   │  │  ├─ attendanceReport.vue
   │  │  └─ payrollReports.vue
   │  ├─ schoolList.vue
   │  ├─ settings
   │  │  ├─ SchoolProfile.vue
   │  │  └─ UserManagement.vue
   │  ├─ students
   │  │  ├─ StudentAdd.vue
   │  │  ├─ StudentCreate.vue
   │  │  ├─ StudentDetails.vue
   │  │  ├─ StudentList.vue
   │  │  └─ StudentPromote.vue
   │  └─ teacher
   │     ├─ TeacherAdd.vue
   │     └─ teacherList.vue
   ├─ router
   │  ├─ index.js
   │  └─ routes.js
   └─ stores
      ├─ example-store.js
      ├─ index.js
      └─ store-flag.d.ts

```