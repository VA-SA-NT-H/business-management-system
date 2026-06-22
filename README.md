# Enterprise Business Management System (EBMS)

A robust, enterprise-grade resource planning and management platform. EBMS is built on a modern full-stack architecture, combining a secure **Spring Boot** backend API with an interactive, responsive **React** frontend dashboard.

---

##  Key Features

*   **Dynamic Dashboard & Analytics**: Real-time business intelligence metrics, sales charts, and inventory status indicators powered by *Recharts*.
*   **Secure Authentication**: Robust security framework leveraging *Spring Security* and *JSON Web Tokens (JWT)* for session management and authorization.
*   **HR & Employee Directory**: Manage organization hierarchy, employee profiles, department allocations, and contact directories.
*   **Customer Relationship Management (CRM)**: Manage customer records, track interaction history, and analyze customer lifetime value.
*   **Inventory & Stock Control**: Track product stock levels, categories, price structures, and trigger automatic low-stock alerts.
*   **Procurement & Supplier Management**: Create purchase orders, manage vendor details, and track supply chains.
*   **Sales & Order Processing**: Process customer sales orders, log transaction histories, and manage invoicing.
*   **Document Generation & Reporting**: Export system data and compile analytics into clean PDF reports using *jsPDF*.
*   **System Audit Logs**: Comprehensive security and transactional logs to monitor all sensitive modifications and user operations.

---

##  Technology Stack

### Backend API
*   **Framework**: Spring Boot 3.5.x (Java 21)
*   **Security**: Spring Security, JWT (Jsonwebtoken API 0.11.5)
*   **Persistence**: Spring Data JPA, Hibernate
*   **Database**: MySQL
*   **Build Tool**: Maven
*   **API Docs**: Springdoc OpenAPI / Swagger UI 2.8.x

### Frontend Application
*   **Framework**: React 19 + TypeScript + Vite
*   **Styling**: Tailwind CSS v4 + Framer Motion (for smooth micro-animations)
*   **State & Fetching**: TanStack React Query (v5) & Axios
*   **Visualizations**: Recharts
*   **Icons**: Lucide React
*   **PDF Exports**: jsPDF & jsPDF-AutoTable

---

##  Running the Project

### Option 1: Using Docker (Recommended)
This starts all components (Database, Backend, and Frontend) in containerized environments.

1.  Make sure Docker is running on your machine.
2.  Start the services:
    ```bash
    docker compose up --build -d
    ```
3.  Access the applications:
    *   **Frontend Web Panel:** [http://localhost:3000](http://localhost:3000)
    *   **Backend API Base:** [http://localhost:8080](http://localhost:8080)
    *   **Swagger UI Documentation:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
4.  Stop the services:
    ```bash
    docker compose down
    ```

### Option 2: Running Locally (Without Docker)

#### **1. Database Setup**
*   Ensure MySQL is running locally on port **3306**.
*   Create a database named `ebms`.
*   Ensure user is `root` and password is `root`.
*   Configure the database URL to point to `localhost` in [application.yml](src/main/resources/application.yml):
    ```yaml
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/ebms?autoReconnect=true&allowPublicKeyRetrieval=true&useSSL=false
    ```

#### **2. Start the Backend API**
Navigate to the root directory and start the Spring Boot app:
```bash
./mvnw spring-boot:run
```

#### **3. Start the Frontend React SPA**
1.  Navigate into the `ebms-frontend` directory:
    ```bash
    cd ebms-frontend
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Run the Vite development server:
    ```bash
    npm run dev
    ```
4.  Access the frontend UI at [http://localhost:5173](http://localhost:5173).

---

##  Testing the Project

To execute the backend test suites locally (using the Docker database exposed on port `3307` to avoid host conflicts):

1.  Start the database:
    ```bash
    docker compose up -d mysql
    ```
2.  Run Maven tests:
    ```bash
    # For PowerShell
    $env:SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3307/ebms?autoReconnect=true&allowPublicKeyRetrieval=true&useSSL=false"
    ./mvnw test

    # For Linux/Bash
    SPRING_DATASOURCE_URL="jdbc:mysql://localhost:3307/ebms?autoReconnect=true&allowPublicKeyRetrieval=true&useSSL=false" ./mvnw test
    ```

[![Enterprise Business Management System CI](https://github.com/VA-SA-NT-H/business-management-system/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/VA-SA-NT-H/business-management-system/actions/workflows/ci.yml)