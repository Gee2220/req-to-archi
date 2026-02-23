from langchain_community.llms import Ollama

def generate_architecture(requirement: str):
    llm = Ollama(model="llama3") # Or your fine-tuned model name
    prompt = f"Act as a System Architect. Design a high-level architecture for: {requirement}. Focus on modularity and components."
    return llm.invoke(prompt)