from flask import Blueprint, request, jsonify

from database import SessionLocal
from models.task import Task
from models.project import Project
from models.user import User
from core.enums import TaskStatus
from dependencies.auth import get_current_user

task_router = Blueprint("task", __name__, url_prefix="/task")


# CREATE TASK
@task_router.route("/", methods=["POST"])
def create_task():

    db = SessionLocal()

    current_user = get_current_user()
    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    project = db.query(Project).filter(Project.id == data.get("project_id")).first()

    if not project:
        return jsonify({"error": "Project not found"}), 404

    if project.owner_id != current_user.id:
        return jsonify({"error": "Not allowed to create tasks for this project"}), 403

    task = Task(
        title=data.get("title"),
        description=data.get("description"),
        project_id=data.get("project_id"),
        created_by=current_user.id
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "project_id": task.project_id,
        "created_by": task.created_by,
        "assigned_to": task.assigned_to
    })


# LIST TASKS FOR PROJECT
@task_router.route("/project/<int:project_id>", methods=["GET"])
def list_tasks_for_project(project_id):

    db = SessionLocal()

    current_user = get_current_user()
    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    limit = request.args.get("limit", 10, type=int)
    offset = request.args.get("offset", 0, type=int)
    status = request.args.get("status")
    assigned_to = request.args.get("assigned_to")

    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        return jsonify({"error": "Project not found"}), 404

    if project.owner_id != current_user.id:
        return jsonify({"error": "Not allowed to read tasks from this project"}), 403

    query = db.query(Task).filter(Task.project_id == project_id)

    if status:
        query = query.filter(Task.status == status)

    if assigned_to:
        query = query.filter(Task.assigned_to == assigned_to)

    tasks = query.offset(offset).limit(limit).all()

    result = []

    for task in tasks:
        result.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "project_id": task.project_id,
            "created_by": task.created_by,
            "assigned_to": task.assigned_to
        })

    return jsonify(result)


# UPDATE TASK
@task_router.route("/<int:task_id>", methods=["PATCH"])
def task_update(task_id):

    db = SessionLocal()

    current_user = get_current_user()
    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return jsonify({"error": "Task not found"}), 404

    project = db.query(Project).filter(Project.id == task.project_id).first()

    if project.owner_id != current_user.id:
        return jsonify({"error": "Not allowed to update this task"}), 403

    if "status" in data:
        task.status = data["status"]

    if "assigned_to" in data:
        task.assigned_to = data["assigned_to"]

    db.add(task)
    db.commit()
    db.refresh(task)

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "project_id": task.project_id,
        "created_by": task.created_by,
        "assigned_to": task.assigned_to
    })