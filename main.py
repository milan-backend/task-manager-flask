from dotenv import load_dotenv
load_dotenv()

from flask import Flask

from sqlmodel import SQLModel
from database import engine,Base
from models.user import User
from models.project import Project
from models.task import Task
from flask_cors import CORS

from routes.auth import auth_router
from routes.project import project_router
from routes.task import task_router

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_router)
app.register_blueprint(project_router)
app.register_blueprint(task_router)

@app.route("/")
def home():
    return{"message": "Task Manager API running"}


if __name__ == "__main__":
    app.run(debug=True)