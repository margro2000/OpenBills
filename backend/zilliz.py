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

def upsert_statute(file_path):
    # Read the statute data
    section_text, statute_metadata = read_statute_json(file_path)
    
    # Generate embedding for the section text
    embedding = generate_embedding(section_text)
    
    # Connect to Milvus
    connections.connect("default", host="localhost", port="19530")
    
    # Define the collection schema
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=1536),  # Dimension for text-embedding-ada-002
        FieldSchema(name="section_text", dtype=DataType.VARCHAR, max_length=65535),
        FieldSchema(name="metadata", dtype=DataType.JSON)
    ]
    schema = CollectionSchema(fields, "Statute collection")
    
    # Create or get the collection
    collection_name = "statutes"
    if Collection.has_collection(collection_name):
        collection = Collection(collection_name)
    else:
        collection = Collection(collection_name, schema)
        collection.create_index(field_name="embedding", index_params={"index_type": "IVF_FLAT", "metric_type": "L2", "params": {"nlist": 1024}})
    
    # Insert the data
    data = [
        [embedding],
        [section_text],
        [json.dumps(statute_metadata)]
    ]
    
    collection.insert(data)
    
    # Flush the data to ensure it's persisted
    collection.flush()
    
    print(f"Upserted statute from {file_path}")
    
    # Disconnect from Milvus
    connections.disconnect("default")

# Example usage
# upsert_statute("path/to/statute.json")
	
