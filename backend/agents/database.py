from langchain_community.llms import Ollama

def generate_database(requirement: str):
    llm = Ollama(model="llama3")
    prompt = f"Act as a Database Expert. Design a schema for: {requirement}. Provide table names, columns, and 3 optimization tips."
    return llm.invoke(prompt)