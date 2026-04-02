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

## Employee
<img width="1328" height="592" alt="Screenshot 2026-04-02 111814" src="https://github.com/user-attachments/assets/95d477ed-f97d-444f-9842-e728ff176964" />
<img width="1308" height="592" alt="Screenshot 2026-04-02 111904" src="https://github.com/user-attachments/assets/df2e2940-68ac-44fe-9731-f66c84f698ec" />
<img width="1321" height="581" alt="Screenshot 2026-04-02 111948" src="https://github.com/user-attachments/assets/b55e3da9-e851-4484-9eeb-070f9cdbe6e5" />
<img width="1314" height="591" alt="Screenshot 2026-04-02 111958" src="https://github.com/user-attachments/assets/13011cbe-b114-44af-b147-2edab66ea8cd" />
<img width="1296" height="596" alt="Screenshot 2026-04-02 112020" src="https://github.com/user-attachments/assets/18d1001d-a0b2-44c5-a2ea-7ffa43550453" />
<img width="1334" height="595" alt="Screenshot 2026-04-02 112032" src="https://github.com/user-attachments/assets/1b60111d-2bef-4db5-9a22-ca9dbb87153a" />
<img width="1291" height="589" alt="Screenshot 2026-04-02 112058" src="https://github.com/user-attachments/assets/f316b8fd-c435-455a-a779-3c61d4348232" />

## Approver
<img width="1326" height="577" alt="Screenshot 2026-04-02 112429" src="https://github.com/user-attachments/assets/a7b146c5-79fc-4c7c-bf5b-e397464e9bc0" />
<img width="1322" height="595" alt="Screenshot 2026-04-02 112439" src="https://github.com/user-attachments/assets/7d7ed3bd-db41-4081-9161-fe68fb2a327f" />
<img width="1309" height="588" alt="Screenshot 2026-04-02 112531" src="https://github.com/user-attachments/assets/b03ee090-dd04-4e2f-a491-ab7eefa0a0ac" />
<img width="1320" height="560" alt="Screenshot 2026-04-02 112754" src="https://github.com/user-attachments/assets/120b40a7-9e51-4640-a55f-673ffb34f5ba" />
<img width="1300" height="587" alt="Screenshot 2026-04-02 112803" src="https://github.com/user-attachments/assets/2e8a822b-deb1-4fae-b49b-5453ba97f870" />

## Finance Person
<img width="1330" height="594" alt="Screenshot 2026-04-02 112838" src="https://github.com/user-attachments/assets/effd8712-3807-437b-be58-78c963cb7109" />
<img width="1305" height="594" alt="Screenshot 2026-04-02 112847" src="https://github.com/user-attachments/assets/2c65c48b-3aae-4e9f-a569-a7cfb658fe18" />
<img width="1314" height="593" alt="Screenshot 2026-04-02 112906" src="https://github.com/user-attachments/assets/ac5cc6f3-d4a9-455f-8b0e-106e9b7c475b" />
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



