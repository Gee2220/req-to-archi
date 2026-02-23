import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents.architect import generate_architecture
from agents.database import generate_database
from agents.planner import generate_api_plan

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectRequest(BaseModel):
    requirement: str

@app.post("/generate/architecture")
async def get_arch(req: ProjectRequest):
    print(f"Received request for: {req.requirement}") # Log to console
    try:
        result = generate_architecture(req.requirement)
        return {"output": result}
    except Exception as e:
        print(f"Error: {e}")
        return {"output": "Ollama error. Is the model pulled?"}


@app.post("/generate/database")
async def get_db(req: ProjectRequest):
    print(f"Received DB request for: {req.requirement}")
    try:
        result = generate_database(req.requirement)
        return {"output": result}
    except Exception as e:
        print(f"DB Error: {e}")
        return {"output": "Ollama error. Is the model pulled?"}


@app.post("/generate/api")
async def get_api(req: ProjectRequest):
    print(f"Received API request for: {req.requirement}")
    try:
        result = generate_api_plan(req.requirement)
        return {"output": result}
    except Exception as e:
        print(f"API Error: {e}")
        return {"output": "Ollama error. Is the model pulled?"}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)