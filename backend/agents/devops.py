from langchain_community.llms import Ollama

def generate_terraform(architecture_context: str):
    llm = Ollama(model="llama3") # Phi3 is excellent for code generation
    prompt = f"""
    You are a DevOps and IaC Specialist. 
    Review this Architecture Plan: {architecture_context}
    
    Tasks:
    1. Write a Terraform script (main.tf) to deploy this infrastructure on AWS.
    2. Include the Provider block and necessary Resources (EC2, RDS, S3, etc.).
    3. Add helpful comments explaining why each resource was chosen.
    
    Format: Output ONLY the Terraform code block.
    """
    return llm.invoke(prompt)