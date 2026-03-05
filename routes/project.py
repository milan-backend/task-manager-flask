from flask import Blueprint, request, jsonify
from database import SessionLocal
from models.project import Project
from dependencies.auth import get_current_user

project_router = Blueprint("projects", __name__)


@project_router.route("/projects", methods=["POST"])
def create_project():

    db = SessionLocal()

    current_user = get_current_user()

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json

    project = Project(
        name=data.get("name"),
        description=data.get("description"),
        owner_id=current_user.id
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return jsonify({
        "id": project.id,
        "name": project.name,
        "description": project.description,
        "owner_id": project.owner_id
    })


@project_router.route("/projects", methods=["GET"])
def list_projects():

    db = SessionLocal()

    current_user = get_current_user()

    if not current_user:
        return jsonify({"error": "Unauthorized"}), 401

    projects = db.query(Project).filter(
        Project.owner_id == current_user.id
    ).all()

    result = []

    for project in projects:
        result.append({
            "id": project.id,
            "name": project.name,
            "description": project.description
        })

    return jsonify(result)