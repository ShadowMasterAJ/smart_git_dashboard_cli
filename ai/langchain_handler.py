import logging
import os
import sys
from dotenv import load_dotenv
from supabase import Client, create_client
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import SupabaseVectorStore

load_dotenv()


class GitHubChatbot:
    def __init__(self):
        self.supabase_url: str = os.getenv('SUPABASE_URL')
        self.supabase_key: str = os.getenv('SUPABASE_KEY')
        self.openai_key: str = os.getenv('OPENAI_API_KEY')
        self.table_name: str = os.getenv('TABLE_NAME')
        self.supabase_client: Client = create_client(self.supabase_url, self.supabase_key)
        print("Initializing supabase_client...")
        
        try:
            response = self.supabase_client.table(self.table_name).select("*").limit(1).execute()
            print("Connection successful, response received:", response.data)
        except Exception as e:
            print("Failed to connect or query the table:", e)
        
        if not self.openai_key:
            print('OPENAI_API_KEY is not set.')
            sys.exit(1)

        print("Initializing GitHubChatbot...")

        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
        print("Initializing embeddings...")

        self.vector_store = SupabaseVectorStore(
            self.supabase_client, self.embeddings, self.table_name, query_name="repo_chat_search"
        )
        print("Initializing vector_store...")

        self.chat_model = ChatOpenAI(api_key=self.openai_key)
        print("Initializing chat_model...")

    def process_query(self, query):
        print(f"Processing query: {query}")

        try:
            matched_docs = self.vector_store.similarity_search(query)
            code_str = "\n\n".join(doc['content'] for doc in matched_docs)
            print("Generating response...")

            prompt_text = f"""
            You are a superintelligent AI that answers questions about codebases.     You are:
            - helpful & friendly
            - good at answering complex questions in simple language
            - an expert in all programming languages
            - able to infer the intent of the user's question \n
            
            Question:
            {query}
            
            Relevant code snippets:
            {code_str}
            
            Answer the question using the code snippets above."""

            response = self.chat_model.generate(prompt_text, max_tokens=150)
            if not response:
                return "Sorry, I couldn't generate a response."
            print("Response generated successfully.")
            return response.choices[0].text.strip()

        except:
            return 'Could not find matched_docs'


if __name__ == "__main__":
    chatbot = GitHubChatbot()
    print("Ask a question about your repo (type 'exit' to quit):")

    while True:
        user_query = input()
        if user_query.lower().strip() == "exit":
            print('Exiting...')
            break
        response = chatbot.process_query(user_query)
        print(f"AI: {response}")
