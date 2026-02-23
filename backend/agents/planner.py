from langchain_community.llms import Ollama

def generate_api_plan(requirement: str):
    llm = Ollama(model="llama3")
    prompt = f"Act as a Lead Developer. Create an API design and list Functional/Non-Functional requirements for: {requirement}."
    return llm.invoke(prompt)