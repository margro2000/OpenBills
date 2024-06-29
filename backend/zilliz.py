import json
import openai
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
import numpy as np

# Set up OpenAI API key
openai.api_key = ''

def read_statute_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    section_text = data.get('section_text')
    statute_metadata = data.get('statute_metadata')
    
    return section_text, statute_metadata

def generate_embedding(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']

def upsert_statute(file_path)
	