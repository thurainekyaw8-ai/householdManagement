## Requirements

Before running this project, make sure the following are installed:

* **Git** — used to clone the project from GitHub.
* **Node.js** — required for the React/Vite frontend.
* **Docker Desktop** — runs the PHP API and MySQL database.

### Setup

Clone the project:

```bash
git clone https://github.com/thurainekyaw8-ai/householdManagement.git
```

Go into the project folder:

```bash
cd householdManagement
```

Install the React/Vite dependencies:

```bash
npm install
```

Start Docker Desktop, then start the application:

```bash
docker compose -f .devcontainer/compose.yaml up -d --build
```

Open the application in your browser:

```text
http://localhost:5173
```

The PHP API runs at:

```text
http://localhost:8000
```

To stop the Docker containers:

```bash
docker compose -f .devcontainer/compose.yaml down
```
