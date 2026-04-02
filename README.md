# 💼 Employee Expense Manager

A **SAP Fiori (UI5)** application for managing employee travel expense requests with role-based workflows for **Employees, Managers, and Finance teams**.

---

## 🚀 Features

### 👨‍💼 Employee

* Create travel requests
* Edit requests (only in **Draft** status)
* Submit requests
* View request history

### 🧑‍💼 Manager (Approver)

* View pending requests
* Approve / Reject requests with remarks
* (Optional) Bulk approval

### 💰 Finance Team

* View all **approved requests**
* Filter by:

  * Date range
  * Employee ID
  * Amount

---

## 🔄 Status Flow

```text
Draft → Pending → Approved / Rejected
```

---

## 🏗️ Architecture

This application follows the **SAPUI5 MVC architecture**:

* **Model** → Data handling (JSONModel / MockServer)
* **View** → XML Views
* **Controller** → Business logic

### 📐 Design Patterns Used

* MVC (Model-View-Controller)
* Formatter Pattern (for UI formatting)
* Routing-based navigation
* Fragment-based reusable dialogs

---

## 📂 Project Structure

```bash
webapp/
│
├── controller/        # Controllers (business logic)
│   ├── App.controller.js
│   ├── Create.controller.js
│   ├── Draft.controller.js
│   ├── Finance.controller.js
│   ├── List.controller.js
|   ├── NotAuthorize.controller.js
│   ├── Pending.controller.js
│   ├── Object.controller.js
│
├── view/              # XML Views
│   ├── App.view.xml
│   ├── Create.view.xml
│   ├── Draft.view.xml
│   ├── Finance.view.xml
│   ├── List.view.xml
|   ├── NotAuthorize.view.xml
│   ├── Pending.view.xml
│   ├── Object.view.xml
│
├── model/             # Models & formatter
│   ├── formatter.js
│   ├── models.js
│
├── utils/fragments/   # Reusable dialogs
│   ├── EditDialog.fragment.xml
│   ├── ReasonDialog.fragment.xml
│   ├── ProfilePopup.fragment.xml
│
├── localService/      # Mock server & data
│   ├── mockdata/
│   ├── metadata.xml
│   ├── mockserver.js
│
├── css/
│   ├── style.css
│
├── test/              # Unit & integration tests
│
├── Component.js
├── manifest.json
├── index.html
```

---

## 🧩 Key Components

### 🔹 Formatter

* Status → `Approved → Success`, `Rejected → Error`
* Date → `YYYY-MM-DD → 26 August 2026`

### 🔹 Controllers

| Controller | Description                                   |
| ---------- | --------------------------------------------- |
| Create     | Create expense request                        |
| Draft      | Edit/Delete draft requests                    |
| List       | View request status (approved/rejected)       |
| Pending    | Approve/Reject requests                       |
| Finance    | View approved requests                        |
| Object     | Detailed request view                         |

---

## ▶️ How to Run the App

### 🔧 Prerequisites

* Node.js (v18+)
* UI5 CLI

### 📥 Clone Repository

```bash
git clone https://github.com/aniketsingh738/Expense_management.git
cd Expense_management
```

### 📦 Install Dependencies

```bash
npm install
```

### 🚀 Run Application

```bash
npm start
```

👉 Opens in Fiori Launchpad Sandbox:

```
test/flp.html#app-preview
```

---

## 🧪 Testing

Run unit tests:

```bash
npm run unit-test
```

### ✔ Covered Tests

* **Formatter**

  * Status → Success / Error / None

* **View1 Controller**

  * Total Count
  * Pending Count
  * Approved Count
  * Rejected Count

---

## 🖼️ Screenshots

### 📊 Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

---

### 👨‍💼 Employee Flow

![Employee Flow](./screenshots/employee-flow.png)

---

### 🧑‍💼 Manager Approval

![Manager Approval](./screenshots/manager-approval.png)

---

## ⚙️ Scripts

```bash
npm start              # Run app
npm run start-local    # Run locally
npm run build          # Build project
npm run deploy         # Deploy to SAP BTP
npm run unit-test      # Run unit tests
```

---

## 🌐 Tech Stack

* SAPUI5 / OpenUI5
* JavaScript (ES6)
* XML Views
* MockServer (for local testing)
* QUnit (Testing)

---

## 🚀 Future Enhancements

* Bulk approval feature
* File attachments
* Email notifications
* Real backend (OData integration)

---

## 👨‍💻 Author

**Aniket Singh**

---

## 📄 License

This project is for learning/demo purposes.

